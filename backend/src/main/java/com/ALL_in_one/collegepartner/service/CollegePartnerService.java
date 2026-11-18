package com.ALL_in_one.collegepartner.service;

import com.ALL_in_one.collegepartner.dto.*;
import com.ALL_in_one.collegepartner.entity.*;
import com.ALL_in_one.collegepartner.repository.*;
import com.ALL_in_one.studyabroad.entity.Institution;
import com.ALL_in_one.studyabroad.repository.InstitutionRepository;
import com.ALL_in_one.repository.UserRepository;
import com.ALL_in_one.collegepartner.dto.AdminLeadRequest;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import com.ALL_in_one.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.time.temporal.ChronoUnit;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Service @RequiredArgsConstructor
public class CollegePartnerService {
    private final CollegePartnerAccountRepository accounts;
    private final CollegeAnalyticsEventRepository events;
    private final CollegeStudentEnquiryRepository enquiries;
    private final StudentDataAccessLogRepository accessLogs;
    private final CollegeInterestNotificationRepository notifications;
    private final InstitutionRepository institutions;
    private final UserRepository users;
    private final CollegeLeadAuditRepository leadAudits;
    private final CollegeWalletService walletService;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final SecureRandom random = new SecureRandom();
    private static final String PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    private static final Set<String> STATUSES = Set.of("NEW", "CONTACTED", "FOLLOW_UP", "INTERESTED", "CONVERTED", "CLOSED");

    @Transactional
    public Map<String,Object> create(CollegePartnerCreateRequest request) {
        Institution institution = institutions.findById(request.institutionId()).orElseThrow(() -> new IllegalArgumentException("College record not found."));
        if (accounts.existsByInstitution_Id(institution.getId())) throw new IllegalArgumentException("This college already has a partner account.");
        String username = request.username() == null || request.username().isBlank() ? generatedUsername(institution.getName()) : request.username().trim().toLowerCase(Locale.ROOT);
        if (!username.matches("[a-z0-9._-]{4,40}")) throw new IllegalArgumentException("Username must be 4–40 letters, numbers, dots, dashes or underscores.");
        if (accounts.existsByUsernameIgnoreCase(username)) throw new IllegalArgumentException("That username is already in use.");
        String temporaryPassword = newPassword();
        CollegePartnerAccount account = new CollegePartnerAccount();
        account.setInstitution(institution); account.setUsername(username); account.setPasswordHash(encoder.encode(temporaryPassword));
        account.setOfficialEmail(request.officialEmail().trim().toLowerCase(Locale.ROOT)); account.setContactPerson(clean(request.contactPerson()));
        account.setContactEmail(clean(request.contactEmail())); account.setContactNumber(clean(request.contactNumber())); account.setActive(true); account.setMustChangePassword(true);
        account = accounts.save(account);
        return Map.of("id", account.getId(), "institutionId", institution.getId(), "collegeName", institution.getName(), "username", username, "temporaryPassword", temporaryPassword, "active", true, "mustChangePassword", true);
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminList() {
        return accounts.findAll().stream().map(a -> {
            Map<String,Object> row = new LinkedHashMap<>(); row.put("id", a.getId()); row.put("institutionId", a.getInstitution().getId()); row.put("collegeName", a.getInstitution().getName());
            row.put("username", a.getUsername()); row.put("officialEmail", a.getOfficialEmail()); row.put("contactPerson", a.getContactPerson()); row.put("contactEmail", a.getContactEmail()); row.put("contactNumber", a.getContactNumber()); row.put("active", a.isActive());
            return row;
        }).toList();
    }

    @Transactional
    public void setActive(Long id, boolean active) { CollegePartnerAccount a = account(id); a.setActive(active); accounts.save(a); }

    @Transactional
    public void update(Long id, CollegePartnerCreateRequest request) {
        CollegePartnerAccount a = account(id);
        if (request.institutionId() != null && !Objects.equals(a.getInstitution().getId(), request.institutionId())) throw new IllegalArgumentException("A partner account cannot be reassigned to a different college record.");
        String username = request.username() == null || request.username().isBlank() ? a.getUsername() : request.username().trim().toLowerCase(Locale.ROOT);
        if (!username.matches("[a-z0-9._-]{4,40}")) throw new IllegalArgumentException("Username must be 4–40 letters, numbers, dots, dashes or underscores.");
        if (!username.equalsIgnoreCase(a.getUsername()) && accounts.existsByUsernameIgnoreCaseAndIdNot(username, id)) throw new IllegalArgumentException("That username is already in use.");
        a.setUsername(username); a.setOfficialEmail(request.officialEmail().trim().toLowerCase(Locale.ROOT)); a.setContactPerson(clean(request.contactPerson())); a.setContactEmail(clean(request.contactEmail())); a.setContactNumber(clean(request.contactNumber())); accounts.save(a);
    }

    @Transactional
    public Map<String,Object> resetPassword(Long id) {
        CollegePartnerAccount a = account(id); String password = newPassword(); a.setPasswordHash(encoder.encode(password)); a.setMustChangePassword(true); accounts.save(a);
        return Map.of("username", a.getUsername(), "temporaryPassword", password, "mustChangePassword", true);
    }

    @Transactional(readOnly = true)
    public Map<String,Object> login(CollegeLoginRequest request) {
        CollegePartnerAccount account = accounts.findByUsernameIgnoreCase(request.username().trim()).orElseThrow(() -> new BadCredentialsException("Invalid username or password."));
        if (!account.isActive() || !encoder.matches(request.password(), account.getPasswordHash())) throw new BadCredentialsException("Invalid username or password.");
        return Map.of("token", jwtService.generateToken(account.getUsername()), "userId", account.getId(), "username", account.getUsername(), "fullName", account.getInstitution().getName(), "role", "COLLEGE", "mustChangePassword", account.isMustChangePassword());
    }

    @Transactional
    public void changePassword(String username, CollegePasswordChangeRequest request) {
        CollegePartnerAccount account = accountByUsername(username);
        if (!encoder.matches(request.currentPassword(), account.getPasswordHash())) throw new IllegalArgumentException("Current password is incorrect.");
        if (request.newPassword().equals(request.currentPassword())) throw new IllegalArgumentException("Choose a password different from the current password.");
        account.setPasswordHash(encoder.encode(request.newPassword())); account.setMustChangePassword(false); accounts.save(account);
    }

    @Transactional(readOnly = true)
    public Map<String,Object> dashboard(String username) {
        CollegePartnerAccount a = accountByUsername(username); Long iid = a.getInstitution().getId(); LocalDateTime since = LocalDateTime.now().minusDays(30);
        Map<String,Object> result = new LinkedHashMap<>(); result.put("collegeName", a.getInstitution().getName()); result.put("institutionId", iid);
        // Analytics come from persisted institution events and enquiry records for all partner accounts.
        result.put("pageVisits30d", events.countByInstitution_IdAndEventTypeAndCreatedAtAfter(iid, "PAGE_VIEW", since));
        result.put("profileViews30d", events.countByInstitution_IdAndEventTypeAndCreatedAtAfter(iid, "PROFILE_VIEW", since));
        result.put("enquiries30d", enquiries.countByInstitution_IdAndCreatedAtAfter(iid, since));
        long pageViews = events.countByInstitution_IdAndEventTypeAndCreatedAtAfter(iid, "PAGE_VIEW", since);
        List<Map<String,Object>> daily = dailyVisits(iid, since);
        long weeklyVisits = daily.stream().filter(day -> LocalDate.parse((String)day.get("date")).isAfter(LocalDate.now().minusDays(7))).mapToLong(day -> ((Number)day.get("visits")).longValue()).sum();
        result.put("uniqueVisitors30d", events.countUniqueVisitors(iid, since)); result.put("authenticatedStudents30d", events.countAuthenticatedStudents(iid, since));
        result.put("enquiryClicks30d", events.countByInstitution_IdAndEventTypeAndCreatedAtAfter(iid, "ENQUIRY_CLICK", since));
        result.put("interestedStudents", enquiries.countByInstitution_Id(iid)); result.put("dailyVisits30d", daily); result.put("weeklyVisits", weeklyVisits); result.put("monthlyVisits", pageViews); result.put("opportunityAlerts", notifications.findByTargetInstitution_IdAndArchivedAtIsNullOrderByCreatedAtDesc(iid).size()); result.put("analyticsAvailable", true);
        return result;
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> leads(String username) {
        return walletService.partnerEnquiries(username);
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> assignedLeads(String username) {
        accountByUsername(username);
        return walletService.partnerEnquiries(username).stream().filter(row -> Boolean.TRUE.equals(row.get("assigned"))).toList();
    }

    @Transactional
    public Map<String,Object> leadDetails(String username, Long enquiryId) {
        CollegePartnerAccount a = accountByUsername(username); CollegeStudentEnquiry e = enquiries.findById(enquiryId).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        if (!Objects.equals(e.getInstitution().getId(), a.getInstitution().getId())) throw new IllegalArgumentException("Enquiry not found.");
        return walletService.partnerEnquiryDetails(username, enquiryId);
    }

    @Transactional
    public void updateLeadStatus(String username, Long enquiryId, String status) {
        String normalized = status == null ? "" : status.trim().toUpperCase(Locale.ROOT);
        if (!STATUSES.contains(normalized)) throw new IllegalArgumentException("Invalid enquiry status.");
        CollegePartnerAccount a = accountByUsername(username); CollegeStudentEnquiry e = enquiries.findById(enquiryId).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        if (!Objects.equals(e.getInstitution().getId(), a.getInstitution().getId())) throw new IllegalArgumentException("Enquiry not found.");
        e.setStatus(normalized); enquiries.save(e);
        auditLead(e, "PARTNER_STATUS_CHANGED", username, e.getInstitution().getId(), normalized);
    }

    @Transactional
    public CollegeStudentEnquiry submitEnquiry(CollegeEnquiryRequest request, String visitorId, String authenticatedEmail) {
        Institution institution = institutions.findByIdAndActiveTrueAndStudyAbroadEnabledTrue(request.institutionId()).orElseThrow(() -> new IllegalArgumentException("College record not found."));
        CollegeStudentEnquiry e = new CollegeStudentEnquiry(); e.setInstitution(institution); e.setStudentName(request.name().trim()); e.setStudentEmail(request.email().trim().toLowerCase(Locale.ROOT)); e.setStudentPhone(clean(request.phone())); e.setCourse(clean(request.course())); e.setMessage(clean(request.message())); e.setConsentGiven(true); e.setConsentAt(LocalDateTime.now()); e.setConsentScope(request.contactSharingConsent() ? "INSTITUTION_CONTACT" : "ENQUIRY_ONLY"); e.setLeadSource("WEBSITE_ENQUIRY"); walletService.snapshotLeadPricing(e,"EXCLUSIVE_LEAD");
        users.findByEmail(authenticatedEmail == null ? "" : authenticatedEmail).filter(user -> "STUDENT".equals(user.getRole())).ifPresent(e::setStudent);
        CollegeStudentEnquiry saved = enquiries.save(e); recordEvent(institution.getId(), visitorId, "ENQUIRY_SUBMITTED", request.course(), e.getStudent() == null ? null : e.getStudent().getId(), null, UUID.randomUUID().toString(), saved.getId()); return saved;
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminLeadPartners() {
        return accounts.findAll().stream().filter(CollegePartnerAccount::isActive)
                .map(a -> { Map<String,Object> row = new LinkedHashMap<>();
                    row.put("accountId",a.getId()); row.put("institutionId",a.getInstitution().getId()); row.put("collegeName",a.getInstitution().getName());
                    row.put("username",a.getUsername()); row.put("accountStatus","ACTIVE"); row.put("eligible",true); return row; })
                .toList();
    }

    @Transactional(readOnly = true)
    public Map<String,Object> adminLeadSummary() {
        List<CollegeStudentEnquiry> all = enquiries.findAll();
        long manual = all.stream().filter(e -> "ADMIN_ADDED".equals(e.getLeadSource())).count();
        long imported = all.stream().filter(e -> "EXCEL_IMPORT".equals(e.getLeadSource())).count();
        long web = all.stream().filter(e -> "WEBSITE_ENQUIRY".equals(e.getLeadSource())).count();
        long assigned = all.stream().filter(e -> e.getAssignedBy()!=null).count();
        return Map.of("total",all.size(),"manual",manual,"imported",imported,"website",web,"assigned",assigned,"pending",Math.max(0,all.size()-assigned),"activePartners",accounts.findAll().stream().filter(CollegePartnerAccount::isActive).count());
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminLeadList() {
        return enquiries.findAll().stream().sorted(Comparator.comparing(CollegeStudentEnquiry::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(e -> { Map<String,Object> row=new LinkedHashMap<>(); row.put("id",e.getId()); row.put("student",e.getStudentName()); row.put("email",e.getStudentEmail()); row.put("phone",e.getStudentPhone()); row.put("course",e.getCourse()); row.put("source",e.getLeadSource()); row.put("institution",e.getInstitution().getName()); row.put("institutionId",e.getInstitution().getId()); row.put("status",e.getStatus()); row.put("priority",e.getPriority()); row.put("leadProductType",e.getLeadProductType()); row.put("leadUnitPrice",e.getLeadUnitPrice()); row.put("date",e.getCreatedAt()); return row; }).toList();
    }

    @Transactional
    public Map<String,Object> createAdminLead(AdminLeadRequest request, String admin) {
        CollegePartnerAccount partner=eligiblePartnerForUpdate(request.institutionId());
        String duplicate=duplicateLeadField(partner.getInstitution().getId(), request.studentEmail(), request.studentPhone());
        if(duplicate!=null) throw new IllegalArgumentException("A lead with this "+duplicate+" already exists for the selected college. Check the existing enquiry or correct the value before assigning.");
        CollegeStudentEnquiry lead=makeAdminLead(request,partner,admin,"ADMIN_ADDED");
        lead=enquiries.save(lead); auditLead(lead,"ADMIN_LEAD_ASSIGNED",admin,partner.getInstitution().getId(),"Assigned from admin form; consent ref: "+request.consentReference());
        return Map.of("id",lead.getId(),"institution",partner.getInstitution().getName(),"message","Lead assigned successfully.");
    }

    @Transactional(readOnly = true)
    public Map<String,Object> previewLeadImport(MultipartFile file, Long institutionId) {
        if(file==null || file.isEmpty()) throw new IllegalArgumentException("Choose a non-empty CSV or Excel file.");
        if(file.getSize()>5*1024*1024) throw new IllegalArgumentException("Import file must be 5 MB or smaller.");
        if(institutionId==null) throw new IllegalArgumentException("Select the receiving college partner before previewing the file.");
        CollegePartnerAccount target=eligiblePartner(institutionId);
        String filename=Objects.toString(file.getOriginalFilename(),"").toLowerCase(Locale.ROOT);
        if(!(filename.endsWith(".csv")||filename.endsWith(".xlsx")||filename.endsWith(".xls"))) throw new IllegalArgumentException("Only .csv, .xlsx and .xls files are supported.");
        try {
            List<List<String>> records = filename.endsWith(".csv") ? readCsv(file) : readWorkbook(file);
            if(records.isEmpty()) throw new IllegalArgumentException("The uploaded file has no header row.");
            List<String> headers=records.get(0).stream().map(this::headerKey).toList(); Map<String,Integer> columns=mapLeadHeaders(headers);
            List<Map<String,Object>> rows=new ArrayList<>(); Set<String> seen=new HashSet<>(), seenPhones=new HashSet<>(); int valid=0,duplicates=0,invalid=0;
            for(int i=1;i<records.size();i++) { List<String> cells=records.get(i); if(cells.stream().allMatch(s->s==null||s.isBlank())) continue;
                Map<String,Object> row=new LinkedHashMap<>(); row.put("rowNumber",i+1); row.put("rawCells",cells); for(String key:columns.keySet()) row.put(key,cell(cells,columns.get(key)));
                List<String> errors=new ArrayList<>(); String email=Objects.toString(row.get("studentEmail"),"").trim().toLowerCase(Locale.ROOT); String phone=Objects.toString(row.get("studentPhone"),"").replaceAll("\\D","");
                if(Objects.toString(row.get("studentName"),"").isBlank()) errors.add("Student name is required.");
                if(!email.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) errors.add("Valid email address is required.");
                if(phone.length()<7||phone.length()>15) errors.add("Mobile number must contain 7–15 digits.");
                if(Objects.toString(row.get("course"),"").isBlank()) errors.add("Interested course is required.");
                if(!Set.of("true","yes","1","consented").contains(Objects.toString(row.get("consentGiven"),"").trim().toLowerCase(Locale.ROOT))) errors.add("Explicit contact-sharing consent is required.");
                if(Objects.toString(row.get("consentReference"),"").isBlank()) errors.add("Consent reference is required.");
                if(!Objects.toString(row.get("priority"),"").isBlank()&&!Set.of("LOW","NORMAL","HIGH","URGENT").contains(Objects.toString(row.get("priority")).trim().toUpperCase(Locale.ROOT))) errors.add("Priority must be LOW, NORMAL, HIGH or URGENT.");
                if(!Objects.toString(row.get("status"),"").isBlank()&&!STATUSES.contains(Objects.toString(row.get("status")).trim().toUpperCase(Locale.ROOT))) errors.add("Status must be NEW, CONTACTED, FOLLOW_UP, INTERESTED, CONVERTED or CLOSED.");
                boolean duplicate=(!email.isBlank()&&(!seen.add(email)||enquiries.existsByStudentEmailIgnoreCaseAndInstitution_Id(email,target.getInstitution().getId())))||(!phone.isBlank()&&(!seenPhones.add(phone)||enquiries.existsByStudentPhoneAndInstitution_Id(Objects.toString(row.get("studentPhone"),"").trim(),target.getInstitution().getId())));
                row.put("duplicate",duplicate); if(duplicate) duplicates++; if(!errors.isEmpty()) invalid++; else if(!duplicate) valid++;
                row.put("errors",errors); row.put("valid",errors.isEmpty()&&!duplicate); rows.add(row);
                if(rows.size()>1000) throw new IllegalArgumentException("Import is limited to 1,000 data rows.");
            }
            Map<String,Object> result=new LinkedHashMap<>(); result.put("headers",records.get(0)); result.put("suggestedColumns",columns.keySet()); result.put("rows",rows); result.put("total",rows.size()); result.put("valid",valid); result.put("duplicates",duplicates); result.put("invalid",invalid); result.put("message","Preview only. No leads have been saved."); return result;
        } catch(IllegalArgumentException ex) { throw ex; } catch(Exception ex) { throw new IllegalArgumentException("Could not read this file. Check that it is a valid CSV or Excel workbook."); }
    }

    @Transactional
    public Map<String,Object> assignImportedLeads(LeadImportAssignRequest request, String admin) {
        CollegePartnerAccount partner=eligiblePartnerForUpdate(request.institutionId());
        Set<String> emails=new HashSet<>(), phones=new HashSet<>();
        for(CollegeStudentEnquiry existing:enquiries.findByInstitution_IdOrderByCreatedAtDesc(partner.getInstitution().getId())) { emails.add(existing.getStudentEmail().trim().toLowerCase(Locale.ROOT)); String existingPhone=normalizePhone(existing.getStudentPhone()); if(!existingPhone.isBlank())phones.add(existingPhone); }
        for(AdminLeadRequest row:request.rows()) {
            if(!row.consentGiven() || row.consentReference().isBlank()) throw new IllegalArgumentException("Every imported lead requires documented contact-sharing consent.");
            String email=row.studentEmail().trim().toLowerCase(Locale.ROOT);
            String phone=normalizePhone(row.studentPhone());
            if(!emails.add(email)||(!phone.isBlank()&&!phones.add(phone))) throw new IllegalArgumentException("Duplicate lead detected for "+email+(phone.isBlank()?"":" / mobile ending "+phone.substring(Math.max(0,phone.length()-4)))+". Remove duplicates before importing.");
        }
        List<CollegeStudentEnquiry> saved=new ArrayList<>();
        for(AdminLeadRequest row:request.rows()) { if(!"EXCEL_IMPORT".equals(row.leadSource())) throw new IllegalArgumentException("Imported records must use the EXCEL_IMPORT source."); CollegeStudentEnquiry lead=makeAdminLead(row,partner,admin,"EXCEL_IMPORT"); saved.add(enquiries.save(lead)); }
        CollegeLeadAudit batch=new CollegeLeadAudit(); batch.setAction("IMPORT_BATCH_ASSIGNED"); batch.setActor(admin); batch.setInstitutionId(partner.getInstitution().getId()); batch.setImportFile(safeFileName(request.fileName())); batch.setRecordCount(saved.size()); batch.setDetails("Assigned imported leads after consent and duplicate validation."); leadAudits.save(batch);
        saved.forEach(lead->auditLead(lead,"IMPORTED_LEAD_ASSIGNED",admin,partner.getInstitution().getId(),"File: "+safeFileName(request.fileName())));
        return Map.of("assigned",saved.size(),"duplicates",0,"invalid",0,"institution",partner.getInstitution().getName());
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminLeadAudit() { return leadAudits.findTop500ByOrderByCreatedAtDesc().stream().map(a->{Map<String,Object> row=new LinkedHashMap<>(); row.put("leadId",a.getLead()==null?null:a.getLead().getId()); row.put("action",a.getAction()); row.put("actor",a.getActor()); row.put("institutionId",a.getInstitutionId()); row.put("fileName",a.getImportFile()); row.put("recordCount",a.getRecordCount()); row.put("details",a.getDetails()); row.put("date",a.getCreatedAt()); return row;}).toList(); }

    private CollegePartnerAccount eligiblePartner(Long institutionId) {
        CollegePartnerAccount partner=accounts.findByInstitution_Id(institutionId).orElseThrow(()->new IllegalArgumentException("The selected institution has no registered college partner account."));
        if(!partner.isActive()) throw new IllegalArgumentException("The selected college partner account is inactive.");
        return partner;
    }
    private CollegePartnerAccount eligiblePartnerForUpdate(Long institutionId) {
        CollegePartnerAccount partner=accounts.findByInstitutionIdForUpdate(institutionId).orElseThrow(()->new IllegalArgumentException("The selected institution has no registered college partner account."));
        if(!partner.isActive()) throw new IllegalArgumentException("The selected college partner account is inactive.");
        return partner;
    }
    private String duplicateLeadField(Long institutionId, String email, String phone) {
        String normalizedEmail=Objects.toString(email,"").trim().toLowerCase(Locale.ROOT), normalizedPhone=normalizePhone(phone);
        if(!normalizedEmail.isBlank()&&enquiries.findFirstByInstitution_IdAndStudentEmailIgnoreCase(institutionId,normalizedEmail).isPresent()) return "email address";
        if(!normalizedPhone.isBlank()&&enquiries.findRecentByNormalizedPhoneSuffix(institutionId,normalizedPhone).stream().anyMatch(existing->normalizedPhone.equals(normalizePhone(existing.getStudentPhone())))) return "mobile number";
        return null;
    }
    private String normalizePhone(String phone) {
        String digits=Objects.toString(phone,"").replaceAll("\\D","");
        if(digits.length()==12&&digits.startsWith("91")) return digits.substring(2);
        if(digits.length()==11&&digits.startsWith("0")) return digits.substring(1);
        return digits;
    }
    private String normalizePhoneForStorage(String phone) { return Objects.toString(phone,"").trim().replaceAll("[^+0-9]",""); }
    private CollegeStudentEnquiry makeAdminLead(AdminLeadRequest r, CollegePartnerAccount partner, String admin, String source) {
        if(!r.consentGiven()||r.consentReference().isBlank()) throw new IllegalArgumentException("Documented, relevant student contact-sharing consent is required before assignment.");
        String email=r.studentEmail().trim().toLowerCase(Locale.ROOT);
        String productType=r.leadProductType()==null?"WARM_LEAD":r.leadProductType(); walletService.ensureLeadProductEnabled(productType);
        CollegeStudentEnquiry e=new CollegeStudentEnquiry(); e.setInstitution(partner.getInstitution()); e.setStudentName(r.studentName().trim()); e.setStudentEmail(email); e.setStudentPhone(normalizePhoneForStorage(r.studentPhone())); e.setAlternativePhone(r.alternativePhone()==null||r.alternativePhone().isBlank()?null:normalizePhoneForStorage(r.alternativePhone())); e.setCourse(r.course().trim()); e.setPreferredDegree(clean(r.preferredDegree())); e.setStudyMode(clean(r.studyMode())); e.setPreferredCountry(clean(r.preferredCountry())); e.setCurrentQualification(clean(r.currentQualification())); e.setPassingYear(clean(r.passingYear())); e.setPreferredCollege(clean(r.preferredCollege())); e.setCity(clean(r.city())); e.setState(clean(r.state())); e.setMessage(clean(r.message())); e.setConsentGiven(true); e.setConsentAt(LocalDateTime.now()); e.setConsentScope("INSTITUTION_CONTACT"); e.setConsentReference(r.consentReference().trim()); e.setLeadSource(source); e.setPriority(r.priority()==null?"NORMAL":r.priority()); e.setStatus(r.status()==null?"NEW":r.status()); e.setAdminNotes(clean(r.adminNotes())); e.setAssignedBy(admin); walletService.snapshotLeadPricing(e,productType);
        users.findByEmail(email).filter(user -> "STUDENT".equals(user.getRole())).ifPresent(e::setStudent);
        return e;
    }
    private void auditLead(CollegeStudentEnquiry lead,String action,String actor,Long institutionId,String details) { CollegeLeadAudit a=new CollegeLeadAudit(); a.setLead(lead); a.setAction(action); a.setActor(actor); a.setInstitutionId(institutionId); a.setDetails(details); leadAudits.save(a); }
    private String safeFileName(String name) { if(name==null)return "unknown"; String safe=name.replaceAll("[^A-Za-z0-9._ -]","_"); return safe.substring(0,Math.min(255,safe.length())); }
    private String headerKey(String raw) { return Objects.toString(raw,"").toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]",""); }
    private Map<String,Integer> mapLeadHeaders(List<String> h) { Map<String,List<String>> aliases=new LinkedHashMap<>(); aliases.put("studentName",List.of("studentname","fullname","name")); aliases.put("studentEmail",List.of("studentemail","emailaddress","email")); aliases.put("studentPhone",List.of("studentphone","mobilenumber","phone","mobile")); aliases.put("alternativePhone",List.of("alternativephone","alternativemobile","alternatephone")); aliases.put("course",List.of("interestedcourse","course","program","programme")); aliases.put("preferredDegree",List.of("preferreddegree","degree")); aliases.put("studyMode",List.of("studymode","deliverymode")); aliases.put("preferredCountry",List.of("preferredcountry","country")); aliases.put("currentQualification",List.of("currentqualification","qualification")); aliases.put("passingYear",List.of("passingyear","graduationyear")); aliases.put("preferredCollege",List.of("preferredcollege","college")); aliases.put("city",List.of("city")); aliases.put("state",List.of("state")); aliases.put("consentGiven",List.of("consentgiven","consent","contactsharingconsent")); aliases.put("consentReference",List.of("consentreference","consentproof","consentid")); aliases.put("priority",List.of("priority","leadpriority")); aliases.put("status",List.of("status","leadstatus")); aliases.put("message",List.of("message","enquirymessage")); aliases.put("adminNotes",List.of("adminnotes","internalnotes")); Map<String,Integer> out=new LinkedHashMap<>(); aliases.forEach((key,values)->{for(int i=0;i<h.size();i++)if(values.contains(h.get(i))){out.put(key,i);break;}}); return out; }
    private String cell(List<String> cells,Integer index) { return index==null||index<0||index>=cells.size()?"":Objects.toString(cells.get(index),"").trim(); }
    private List<List<String>> readWorkbook(MultipartFile file) throws Exception { try(Workbook wb=WorkbookFactory.create(file.getInputStream())) { Sheet sheet=wb.getSheetAt(0); DataFormatter formatter=new DataFormatter(); List<List<String>> rows=new ArrayList<>(); int max=Math.min(sheet.getLastRowNum(),1001); for(int i=0;i<=max;i++){Row row=sheet.getRow(i); List<String> values=new ArrayList<>(); int width=row==null?0:Math.min(row.getLastCellNum(),40); for(int c=0;c<width;c++)values.add(row==null?"":formatter.formatCellValue(row.getCell(c))); rows.add(values);} return rows; } }
    private List<List<String>> readCsv(MultipartFile file) throws Exception { String text=new String(file.getBytes(),StandardCharsets.UTF_8); List<List<String>> rows=new ArrayList<>(); List<String> row=new ArrayList<>(); StringBuilder value=new StringBuilder(); boolean quoted=false; for(int i=0;i<text.length();i++){char c=text.charAt(i); if(c=='"'&&(i+1>=text.length()||text.charAt(i+1)!='"'))quoted=!quoted; else if(c=='"'&&i+1<text.length()&&text.charAt(i+1)=='"'){value.append('"');i++;} else if(c==','&&!quoted){row.add(value.toString());value.setLength(0);} else if((c=='\n'||c=='\r')&&!quoted){if(c=='\r'&&i+1<text.length()&&text.charAt(i+1)=='\n')i++;row.add(value.toString());value.setLength(0);rows.add(row);row=new ArrayList<>();if(rows.size()>1002)throw new IllegalArgumentException("Import is limited to 1,000 data rows.");} else value.append(c);} if(value.length()>0||!row.isEmpty()){row.add(value.toString());rows.add(row);} return rows; }

    @Transactional
    public void recordEvent(Long institutionId, String visitorId, String eventType, String course, Long studentId) {
        recordEventInternal(institutionId, visitorId, eventType, course, studentId, null, null, null);
    }

    @Transactional
    public void recordEvent(Long institutionId, String visitorId, String eventType, String course, Long studentId, String sourcePage, String requestEventId) {
        recordEventInternal(institutionId, visitorId, eventType, course, studentId, sourcePage, requestEventId, null);
    }

    private void recordEventInternal(Long institutionId, String visitorId, String eventType, String course, Long studentId, String sourcePage, String requestEventId, Long enquiryId) {
        recordEvent(institutionId, visitorId, eventType, course, studentId, sourcePage, requestEventId, enquiryId);
    }

    private void recordEvent(Long institutionId, String visitorId, String eventType, String course, Long studentId, String sourcePage, String requestEventId, Long enquiryId) {
        Institution institution = institutions.findByIdAndActiveTrueAndStudyAbroadEnabledTrue(institutionId).orElseThrow(() -> new IllegalArgumentException("College record not found."));
        Set<String> allowed = Set.of("PAGE_VIEW", "PROFILE_VIEW", "ENQUIRY_CLICK", "ENQUIRY_SUBMITTED", "COURSE_EXPLORED", "APPLICATION_INTENT"); if (!allowed.contains(eventType)) throw new IllegalArgumentException("Invalid analytics event.");
        String normalizedVisitor = normalizeVisitor(visitorId);
        Long verifiedStudentId = studentId == null ? null : users.findById(studentId).filter(user -> "STUDENT".equals(user.getRole())).map(com.ALL_in_one.entity.User::getId).orElse(null);
        String candidateKey = requestEventId != null && requestEventId.matches("[A-Za-z0-9_-]{12,80}") ? requestEventId : null;
        final String eventKey = candidateKey == null ? null : digest(candidateKey + ":" + institutionId + ":" + eventType + ":" + verifiedStudentId);
        if (eventKey != null && events.existsByDedupeKey(eventKey)) return;
        // Only retries with the same event ID are duplicates. Time-window
        // suppression incorrectly hides legitimate repeat visits.
        CollegeAnalyticsEvent event = new CollegeAnalyticsEvent(); event.setInstitution(institution); event.setEventType(eventType); event.setVisitorId(normalizedVisitor); event.setCourse(clean(course)); event.setSourcePage(clean(sourcePage)); event.setRelatedEnquiryId(enquiryId); event.setDedupeKey(eventKey); if (verifiedStudentId != null) users.findById(verifiedStudentId).ifPresent(event::setStudent);
        try { events.saveAndFlush(event); }
        catch (org.springframework.dao.DataIntegrityViolationException duplicate) {
            if (eventKey == null || !events.existsByDedupeKey(eventKey)) throw duplicate;
        }
    }

    @Transactional(readOnly = true)
    public Map<String,Object> adminInterest() {
        LocalDateTime since = LocalDateTime.now().minusDays(90);
        List<CollegeAnalyticsEvent> activity = events.findByCreatedAtAfterAndStudentIsNotNullOrderByCreatedAtDesc(since);
        Map<Long,List<CollegeAnalyticsEvent>> byStudent = activity.stream().collect(Collectors.groupingBy(e -> e.getStudent().getId()));
        List<Map<String,Object>> students = byStudent.entrySet().stream().map(entry -> summarizeStudent(entry.getKey(), entry.getValue())).filter(s -> ((Number)s.get("institutionCount")).intValue() > 1).toList();
        return Map.of("studentsExploringMultipleInstitutions", students.size(), "students", students, "notificationsSent", notifications.count(), "newNotifications", notifications.countByStatus("NEW"), "eligibleEnquiries", enquiries.findAll().stream().filter(e -> e.isConsentGiven() && e.getContactConsentRevokedAt() == null && "INSTITUTION_CONTACT".equals(e.getConsentScope())).count());
    }

    @Transactional(readOnly = true)
    public Map<String,Object> adminStudentInterest(Long studentId) {
        List<CollegeAnalyticsEvent> activity = events.findByStudent_IdAndCreatedAtAfterOrderByCreatedAtDesc(studentId, LocalDateTime.now().minusDays(90));
        if (activity.isEmpty()) throw new IllegalArgumentException("Student activity not found.");
        return summarizeStudent(studentId, activity);
    }

    private Map<String,Object> summarizeStudent(Long studentId, List<CollegeAnalyticsEvent> activity) {
        var student = activity.get(0).getStudent();
        Map<Long,List<CollegeAnalyticsEvent>> grouped = activity.stream().collect(Collectors.groupingBy(e -> e.getInstitution().getId()));
        List<Map<String,Object>> explored = grouped.entrySet().stream().map(entry -> {
            var institution = entry.getValue().get(0).getInstitution();
            Map<String,Object> item = new LinkedHashMap<>(); item.put("institutionId", institution.getId()); item.put("institution", institution.getName()); item.put("events", entry.getValue().stream().map(CollegeAnalyticsEvent::getEventType).distinct().toList()); item.put("visits", entry.getValue().size()); item.put("firstActivity", entry.getValue().stream().map(CollegeAnalyticsEvent::getCreatedAt).min(LocalDateTime::compareTo).orElse(null)); item.put("latestActivity", entry.getValue().stream().map(CollegeAnalyticsEvent::getCreatedAt).max(LocalDateTime::compareTo).orElse(null)); item.put("courses", entry.getValue().stream().map(CollegeAnalyticsEvent::getCourse).filter(Objects::nonNull).distinct().toList()); return item;
        }).toList();
        List<CollegeStudentEnquiry> studentEnquiries = enquiries.findByStudent_IdOrderByCreatedAtDesc(studentId);
        List<Long> consentTargets = studentEnquiries.stream().filter(e -> e.isConsentGiven() && e.getContactConsentRevokedAt() == null && "INSTITUTION_CONTACT".equals(e.getConsentScope())).map(e -> e.getInstitution().getId()).distinct().toList();
        Map<String,Object> result = new LinkedHashMap<>(); result.put("studentId", studentId); result.put("student", maskName(student.getFullName())); result.put("institutionCount", explored.size()); result.put("activityCount", activity.size()); result.put("firstActivity", activity.stream().map(CollegeAnalyticsEvent::getCreatedAt).min(LocalDateTime::compareTo).orElse(null)); result.put("latestActivity", activity.stream().map(CollegeAnalyticsEvent::getCreatedAt).max(LocalDateTime::compareTo).orElse(null)); result.put("institutions", explored); result.put("enquiries", studentEnquiries.stream().map(e -> Map.of("institutionId",e.getInstitution().getId(),"institution",e.getInstitution().getName(),"submittedAt",e.getCreatedAt(),"course",Objects.toString(e.getCourse(),""),"status",e.getStatus())).toList()); result.put("consentTargets", consentTargets); return result;
    }

    @Transactional
    public Map<String,Object> sendInterestNotification(Long studentId, Long institutionId, String adminUsername) {
        if (studentId == null || institutionId == null) throw new IllegalArgumentException("Student and target institution are required.");
        var summary = adminStudentInterest(studentId);
        List<Map<String,Object>> explored = (List<Map<String,Object>>) summary.get("institutions");
        Map<String,Object> target = explored.stream().filter(item -> Objects.equals(item.get("institutionId"), institutionId)).findFirst().orElseThrow(() -> new IllegalArgumentException("Student has no recorded activity for this institution."));
        if (explored.size() < 2) throw new IllegalArgumentException("Cross-institution alerts require activity at two or more institutions.");
        String activityWindow = digest(studentId + ":" + institutionId + ":" + LocalDate.now());
        if (notifications.existsByStudent_IdAndTargetInstitution_IdAndActivityWindowKey(studentId, institutionId, activityWindow)) throw new IllegalArgumentException("An alert for this student and institution was already sent today.");
        var account = accounts.findByInstitution_Id(institutionId).orElseThrow(() -> new IllegalArgumentException("The target institution does not have a partner account."));
        var admin = users.findByEmail(adminUsername).filter(user -> "ADMIN".equals(user.getRole())).orElseThrow(() -> new IllegalArgumentException("Administrator identity could not be verified."));
        String others = explored.stream().filter(item -> !Objects.equals(item.get("institutionId"), institutionId)).map(item -> Objects.toString(item.get("institution"), "")).collect(Collectors.joining(", "));
        CollegeInterestNotification notice = new CollegeInterestNotification(); notice.setTargetInstitution(account.getInstitution()); notice.setStudent(adminStudent(studentId)); notice.setCreatedByAdmin(admin); notice.setActivityWindowKey(activityWindow); notice.setTitle("A New Student Interest Opportunity"); notice.setContent("A student who explored " + target.get("institution") + " has also viewed other colleges on StepInStudents: " + others + ". This summary is based on recorded institution activity. Contact details remain protected unless the student separately consents and eligibility requirements are satisfied."); notifications.save(notice);
        return Map.of("id", notice.getId(), "status", notice.getStatus(), "institution", account.getInstitution().getName());
    }

    private com.ALL_in_one.entity.User adminStudent(Long id) { return users.findById(id).filter(user -> "STUDENT".equals(user.getRole())).orElseThrow(() -> new IllegalArgumentException("Student not found.")); }

    @Transactional
    public void revokeContactConsent(Long enquiryId, String studentEmail) {
        var student = users.findByEmail(studentEmail).filter(user -> "STUDENT".equals(user.getRole())).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        var enquiry = enquiries.findById(enquiryId).filter(e -> e.getStudent() != null && e.getStudent().getId().equals(student.getId())).orElseThrow(() -> new IllegalArgumentException("Enquiry not found."));
        if ("INSTITUTION_CONTACT".equals(enquiry.getConsentScope())) enquiry.setContactConsentRevokedAt(LocalDateTime.now());
    }

    @Transactional
    public void markNotificationReviewed(Long id) { CollegeInterestNotification notice = notifications.findById(id).orElseThrow(() -> new IllegalArgumentException("Notification not found.")); notice.setReviewedAt(LocalDateTime.now()); }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> partnerAlerts(String username) { var account = accountByUsername(username); return notifications.findByTargetInstitution_IdAndArchivedAtIsNullOrderByCreatedAtDesc(account.getInstitution().getId()).stream().map(n -> { Map<String,Object> row = new LinkedHashMap<>(); row.put("id",n.getId()); row.put("title",n.getTitle()); row.put("content",n.getContent()); row.put("status",n.getStatus()); row.put("createdAt",n.getCreatedAt()); row.put("institution",n.getTargetInstitution().getName()); row.put("contactDetails", "Protected information"); return row; }).toList(); }

    @Transactional
    public void markAlertRead(String username, Long id, boolean archive) { var account = accountByUsername(username); var notice = notifications.findByIdAndTargetInstitution_Id(id, account.getInstitution().getId()).orElseThrow(() -> new IllegalArgumentException("Notification not found.")); if (archive) { notice.setArchivedAt(LocalDateTime.now()); notice.setStatus("ARCHIVED"); } else { notice.setReadAt(LocalDateTime.now()); if ("NEW".equals(notice.getStatus())) notice.setStatus("READ"); } }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminNotificationHistory() { return notifications.findAllByOrderByCreatedAtDesc().stream().map(n -> { Map<String,Object> row = new LinkedHashMap<>(); row.put("id",n.getId()); row.put("institution",n.getTargetInstitution().getName()); row.put("title",n.getTitle()); row.put("status",n.getStatus()); row.put("createdAt",n.getCreatedAt()); row.put("reviewedAt",n.getReviewedAt()); row.put("student",maskName(n.getStudent().getFullName())); return row; }).toList(); }

    private String digest(String raw) { try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(raw.getBytes(StandardCharsets.UTF_8))); } catch (Exception e) { throw new IllegalStateException(e); } }

    @Transactional(readOnly = true)
    public Map<String,Object> adminSummary() {
        List<CollegePartnerAccount> all = accounts.findAll(); LocalDateTime now = LocalDateTime.now();
        return Map.of("totalPartners", all.size(), "activeAccounts", all.stream().filter(CollegePartnerAccount::isActive).count(), "inactiveAccounts", all.stream().filter(a -> !a.isActive()).count(), "pageVisits", events.countByEventType("PAGE_VIEW"), "enquiries", enquiries.count());
    }

    @Transactional(readOnly = true)
    private List<Map<String,Object>> dailyVisits(Long institutionId, LocalDateTime since) {
        Map<LocalDate,Long> byDay = events.findByInstitution_IdAndEventTypeAndCreatedAtAfterOrderByCreatedAtAsc(institutionId,"PAGE_VIEW",since).stream().collect(Collectors.groupingBy(event -> event.getCreatedAt().toLocalDate(),TreeMap::new,Collectors.counting()));
        return byDay.entrySet().stream().map(entry -> Map.<String,Object>of("date",entry.getKey().toString(),"visits",entry.getValue())).toList();
    }

    private CollegePartnerAccount account(Long id) { return accounts.findById(id).orElseThrow(() -> new IllegalArgumentException("College partner not found.")); }
    private CollegePartnerAccount accountByUsername(String username) { return accounts.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("College partner not found.")); }
    private String generatedUsername(String name) { String slug = name.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "").substring(0, Math.min(18, name.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "").length())); if (slug.length()<4) slug="college"; String value; do { value=slug+String.format("%04d", random.nextInt(10000)); } while(accounts.existsByUsernameIgnoreCase(value)); return value; }
    private String newPassword() {
        String upper="ABCDEFGHJKLMNPQRSTUVWXYZ", lower="abcdefghijkmnopqrstuvwxyz", digits="23456789", symbols="!@#$%";
        List<Character> chars = new ArrayList<>();
        for (String group : List.of(upper, lower, digits, symbols)) chars.add(group.charAt(random.nextInt(group.length())));
        for (int i=4;i<20;i++) chars.add(PASSWORD_CHARS.charAt(random.nextInt(PASSWORD_CHARS.length())));
        Collections.shuffle(chars, random); StringBuilder value = new StringBuilder(); chars.forEach(value::append); return value.toString();
    }
    private String clean(String s) { return s == null || s.isBlank() ? null : s.trim(); }
    private String normalizeVisitor(String visitorId) { if (visitorId == null || !visitorId.matches("[A-Za-z0-9_-]{16,64}")) return null; return visitorId; }
    private String maskName(String value) { if(value==null||value.isBlank())return "—"; String prefix=value.replaceAll("[^\\p{L}]",""); return (prefix.length()>3?prefix.substring(0,3):prefix)+"****"; }
    private String maskPhone(String value) { if(value==null||value.isBlank())return "—"; String digits=value.replaceAll("\\D",""); return "******"+(digits.length()>=4?digits.substring(digits.length()-4):digits); }
    private String maskEmail(String value) { if(value==null||!value.contains("@"))return "—"; String[] p=value.split("@",2); return p[0].substring(0,Math.min(3,p[0].length()))+"****@"+p[1]; }
}
