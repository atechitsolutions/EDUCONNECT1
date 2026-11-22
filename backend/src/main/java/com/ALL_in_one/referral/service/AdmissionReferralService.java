package com.ALL_in_one.referral.service;

import com.ALL_in_one.entity.User;
import com.ALL_in_one.referral.dto.*;
import com.ALL_in_one.referral.entity.*;
import com.ALL_in_one.referral.repository.ReferralAuditLogRepository;
import com.ALL_in_one.referral.repository.*;
import com.ALL_in_one.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.*;

@Service @RequiredArgsConstructor
public class AdmissionReferralService {
    private final AdmissionPartnerRepository partners;
    private final ReferralLeadRepository leads;
    private final ReferralCommissionRepository commissions;
    private final ReferralAuditLogRepository auditLogs;
    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Map<String,Object> register(PartnerInterestRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        if (partners.existsByEmailIgnoreCase(email)) throw new ResponseStatusException(HttpStatus.CONFLICT,"An enquiry for this email is already recorded. Contact support if you need help.");
        AdmissionPartner partner = new AdmissionPartner(); partner.setFullName(request.fullName().trim()); partner.setEmail(email); partner.setPhone(clean(request.phone())); partner.setExperience(request.experience().trim()); partner.setCollegeName(clean(request.collegeName())); partner.setConsentAt(LocalDateTime.now());
        partners.save(partner); audit("PARTNER_INTEREST_SUBMITTED","PARTNER",partner.getId(),email,"Consent recorded."); return Map.of("id",partner.getId(),"status",partner.getStatus(),"message","Your partner interest has been submitted for review.");
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminList() { return partners.findAllByOrderByCreatedAtDesc().stream().map(this::partnerView).toList(); }

    @Transactional
    public Map<String,Object> decide(Long id, PartnerDecisionRequest request,String admin) {
        AdmissionPartner partner = partner(id); String status=request.status();
        if ("APPROVED".equals(status)) {
            String accountEmail=(request.userEmail()==null||request.userEmail().isBlank())?partner.getEmail():request.userEmail().trim().toLowerCase(Locale.ROOT);
            if (!accountEmail.equalsIgnoreCase(partner.getEmail())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"The partner account email must match the applicant email.");
            String initialPassword=firstFourPhoneDigits(partner.getPhone());
            String expectedRole=partner.getParent()==null?"DIRECT_PARTNER":"SUBPARTNER";
            Optional<User> existing=users.findByEmail(accountEmail);
            User user;
            if (existing.isPresent()) {
                user=existing.get();
            } else {
                user=new User();
                user.setFullName(partner.getFullName());
                user.setEmail(accountEmail);
                user.setPassword(passwordEncoder.encode(initialPassword));
                user.setRole(expectedRole);
                user.setCreatedAt(LocalDateTime.now());
                user=users.save(user);
            }
            if (!"STUDENT".equals(user.getRole()) && !expectedRole.equals(user.getRole())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"That account has a role that cannot be assigned to this partner relationship.");
            if (partner.getParent()!=null && (!"APPROVED".equals(partner.getParent().getStatus()) || !partner.getParent().isSubpartnersAllowed())) throw new ResponseStatusException(HttpStatus.CONFLICT,"The direct partner is not authorised to manage this subpartner relationship.");
            if (user.getRole().equals("STUDENT")) {
                user.setPassword(passwordEncoder.encode(initialPassword));
                user.setRole(expectedRole);
            }
            partner.setUser(user); partner.setReferralCode(partner.getReferralCode()==null?newCode():partner.getReferralCode());
            partner.setSubpartnersAllowed(Boolean.TRUE.equals(request.subpartnersAllowed()));
        }
        partner.setStatus(status); partners.save(partner); audit("PARTNER_"+status,"PARTNER",id,admin,"subpartnersAllowed="+partner.isSubpartnersAllowed()); return partnerView(partner);
    }

    @Transactional
    public Map<String,Object> invite(Long parentId, String username, PartnerInterestRequest request) {
        AdmissionPartner parent = approvedByEmail(username);
        if (!Objects.equals(parent.getId(),parentId)) throw new ResponseStatusException(HttpStatus.FORBIDDEN,"You can only create an invitation under your own partner account.");
        if (parent.getParent()!=null) throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Subpartners cannot create further subpartner levels.");
        if (!parent.isSubpartnersAllowed()) throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Your partner agreement does not currently permit subpartners.");
        String email=request.email().trim().toLowerCase(Locale.ROOT);
        if (partners.existsByEmailIgnoreCase(email)) throw new ResponseStatusException(HttpStatus.CONFLICT,"A partner enquiry for this email already exists.");
        AdmissionPartner sub=new AdmissionPartner();sub.setFullName(request.fullName().trim());sub.setEmail(email);sub.setPhone(clean(request.phone()));sub.setExperience(request.experience().trim());sub.setCollegeName(clean(request.collegeName())==null?parent.getCollegeName():clean(request.collegeName()));sub.setConsentAt(LocalDateTime.now());sub.setParent(parent);partners.save(sub);audit("SUBPARTNER_INVITED","PARTNER",sub.getId(),username,"Direct partner id="+parent.getId());
        return Map.of("id",sub.getId(),"status",sub.getStatus(),"message","Subpartner invitation recorded. Administrator review is required before access.");
    }

    @Transactional
    public Map<String,Object> setCollegeTerms(String username,PartnerTermsRequest request){
        AdmissionPartner superPartner=approvedByEmail(username);
        if(superPartner.getParent()!=null)throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Only a super partner can set college payment terms.");
        BigDecimal combined=request.partnerSharePercent().add(request.directPartnerSharePercent());
        if(combined.compareTo(new BigDecimal("100.00"))>0)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Partner shares cannot be greater than the full college consulting amount.");
        List<AdmissionPartner> collegePartners=new ArrayList<>();collegePartners.add(superPartner);collegePartners.addAll(partners.findByParent_IdOrderByCreatedAtDesc(superPartner.getId()));
        for(AdmissionPartner p:collegePartners){p.setCollegeName(request.collegeName().trim());p.setConsultingAmount(request.consultingAmount());p.setPartnerSharePercent(request.partnerSharePercent());p.setDirectPartnerSharePercent(request.directPartnerSharePercent());partners.save(p);}
        audit("COLLEGE_TERMS_UPDATED","PARTNER",superPartner.getId(),username,"College="+request.collegeName().trim()+", amount="+request.consultingAmount());
        return Map.of("collegeName",request.collegeName().trim(),"consultingAmount",request.consultingAmount(),"partnerSharePercent",request.partnerSharePercent(),"directPartnerSharePercent",request.directPartnerSharePercent(),"updatedPartners",collegePartners.size());
    }

    @Transactional(readOnly = true)
    public Map<String,Object> dashboard(String username) {
        AdmissionPartner partner=approvedByEmail(username); List<AdmissionPartner> children=partners.findByParent_IdOrderByCreatedAtDesc(partner.getId());
        List<AdmissionPartner> network=new ArrayList<>();network.add(partner);if(partner.getParent()==null)network.addAll(children);
        List<Long> networkIds=network.stream().map(AdmissionPartner::getId).toList();
        List<ReferralLead> own=leads.findByPartner_IdInOrderByCreatedAtDesc(networkIds);
        List<ReferralLead> personalLeads=own.stream().filter(l->l.getPartner().getId().equals(partner.getId())).toList();
        List<Map<String,Object>> childRows=children.stream().map(child->{Map<String,Object> row=partnerView(child);List<ReferralLead> childLeads=own.stream().filter(l->l.getPartner().getId().equals(child.getId())).toList();row.put("leadCount",childLeads.size());row.put("admissions",childLeads.stream().filter(l->"ADMISSION_CONFIRMED".equals(l.getStatus())).count());return row;}).toList();
        List<ReferralCommission> ledger=commissions.findByPartner_IdInOrDirectPartner_IdInOrderByCreatedAtDesc(networkIds,networkIds);
        BigDecimal payable=ledger.stream().filter(c->"PAYABLE".equals(c.getStatus())).map(c->c.getPartner().getId().equals(partner.getId())?c.getPartnerAmount():c.getDirectPartnerAmount()).reduce(BigDecimal.ZERO,BigDecimal::add);
        List<Map<String,Object>> personalLedger=ledger.stream().filter(c->c.getPartner().getId().equals(partner.getId())||(c.getDirectPartner()!=null&&c.getDirectPartner().getId().equals(partner.getId()))).map(c->{Map<String,Object> row=commissionView(c);boolean directEarning=c.getDirectPartner()!=null&&c.getDirectPartner().getId().equals(partner.getId());row.put("myAmount",directEarning?c.getDirectPartnerAmount():c.getPartnerAmount());row.put("mySharePercent",directEarning?c.getDirectPartnerSharePercent():c.getPartnerSharePercent());return row;}).toList();
        Map<String,Object> result=new LinkedHashMap<>();result.put("id",partner.getId());result.put("name",partner.getFullName());result.put("status",partner.getStatus());result.put("role",partner.getParent()==null?"SUPER_PARTNER":"PARTNER");result.put("collegeName",partner.getCollegeName());result.put("consultingAmount",partner.getConsultingAmount());result.put("partnerSharePercent",partner.getPartnerSharePercent());result.put("directPartnerSharePercent",partner.getDirectPartnerSharePercent());result.put("referralCode",partner.getReferralCode());result.put("referralUrl","/admission-partners?ref="+partner.getReferralCode());result.put("leads",personalLeads.stream().map(this::leadView).toList());result.put("networkLeads",own.stream().map(l->{Map<String,Object> row=leadView(l);row.put("partnerId",l.getPartner().getId());row.put("partnerName",l.getPartner().getFullName());return row;}).toList());result.put("subpartners",childRows);result.put("ledger",personalLedger);result.put("payable",payable);result.put("pendingRemittance",ledger.stream().filter(c->"PENDING_REMITTANCE".equals(c.getStatus())).map(c->earningFor(c,partner.getId())).reduce(BigDecimal.ZERO,BigDecimal::add));result.put("totalEarnings",ledger.stream().filter(c->!"REVERSED".equals(c.getStatus())).map(c->earningFor(c,partner.getId())).reduce(BigDecimal.ZERO,BigDecimal::add));result.put("networkLeadCount",own.size());result.put("networkAdmissions",own.stream().filter(l->"ADMISSION_CONFIRMED".equals(l.getStatus())).count());return result;
    }

    private BigDecimal earningFor(ReferralCommission c,Long partnerId){return c.getDirectPartner()!=null&&c.getDirectPartner().getId().equals(partnerId)?c.getDirectPartnerAmount():c.getPartnerAmount();}

    @Transactional
    public Map<String,Object> submitLead(String code, ReferralLeadRequest request) {
        AdmissionPartner partner=partners.findByReferralCodeAndStatus(code,"APPROVED").orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Referral code is invalid or inactive."));
        String email=request.studentEmail().trim().toLowerCase(Locale.ROOT);
        if (leads.existsByStudentEmailIgnoreCaseAndPartner_Id(email,partner.getId())) throw new ResponseStatusException(HttpStatus.CONFLICT,"This student is already attributed to this partner.");
        ReferralLead lead=new ReferralLead();lead.setPartner(partner);lead.setStudentName(request.studentName().trim());lead.setStudentEmail(email);lead.setStudentPhone(clean(request.studentPhone()));lead.setInstitutionInterest(clean(request.institutionInterest()));lead.setCourseInterest(clean(request.courseInterest()));lead.setConsentGiven(true);lead.setConsentAt(LocalDateTime.now());lead.setAttributionKey(UUID.randomUUID().toString());leads.save(lead);audit("REFERRAL_SUBMITTED","LEAD",lead.getId(),partner.getEmail(),"Student consent recorded; attribution key created.");
        return Map.of("id",lead.getId(),"attributionKey",lead.getAttributionKey(),"status",lead.getStatus(),"message","Student referral recorded with consent.");
    }

    @Transactional(readOnly = true)
    public Map<String,Object> validateCode(String code){AdmissionPartner partner=partners.findByReferralCodeAndStatus(code,"APPROVED").orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Referral code is invalid or inactive."));return Map.of("valid",true,"referralCode",code,"partnerName",partner.getFullName());}

    @Transactional
    public Map<String,Object> admission(Long leadId, AdmissionStatusRequest request,String admin) {
        ReferralLead lead=leads.findById(leadId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Referral lead not found."));
        String current=lead.getStatus(), next=request.status();
        boolean allowed="REFERRED".equals(current)&&Set.of("IN_REVIEW","WITHDRAWN").contains(next)
                || "IN_REVIEW".equals(current)&&Set.of("ADMISSION_CONFIRMED","WITHDRAWN").contains(next);
        if (!allowed) throw new ResponseStatusException(HttpStatus.CONFLICT,"That referral status transition is not allowed.");
        lead.setStatus(request.status());if ("ADMISSION_CONFIRMED".equals(request.status())) lead.setAdmissionConfirmedAt(LocalDateTime.now());leads.save(lead);audit("LEAD_"+request.status(),"LEAD",leadId,admin,"Lead status updated.");return leadView(lead);
    }

    @Transactional
    public Map<String,Object> postCommission(CommissionRequest request,String admin) {
        var existing=commissions.findByIdempotencyKey(request.idempotencyKey());if(existing.isPresent())return commissionView(existing.get());
        ReferralLead lead=leads.findById(request.leadId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Referral lead not found."));
        if (!"ADMISSION_CONFIRMED".equals(lead.getStatus())) throw new ResponseStatusException(HttpStatus.CONFLICT,"Commission can only be recorded for a confirmed admission.");
        BigDecimal agreedAmount=lead.getPartner().getConsultingAmount();
        BigDecimal total=(agreedAmount==null?request.institutionalAmount():agreedAmount).setScale(2,RoundingMode.HALF_UP);
        BigDecimal pct=(lead.getPartner().getPartnerSharePercent()==null?request.partnerSharePercent():lead.getPartner().getPartnerSharePercent()).setScale(2,RoundingMode.HALF_UP);
        BigDecimal directPct=(lead.getPartner().getParent()==null?request.directPartnerSharePercent():(lead.getPartner().getDirectPartnerSharePercent()==null?request.directPartnerSharePercent():lead.getPartner().getDirectPartnerSharePercent())).setScale(2,RoundingMode.HALF_UP);
        if (pct.add(directPct).compareTo(new BigDecimal("100.00"))>0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Combined direct and subpartner shares cannot exceed the institutional commission.");
        AdmissionPartner direct=lead.getPartner().getParent();
        if (directPct.signum()>0 && (direct==null || !direct.isSubpartnersAllowed())) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"A direct-partner share is only valid for an approved subpartner referral covered by an authorised agreement.");
        CommissionAllocation allocation=CommissionAllocation.calculate(total,pct,directPct);
        BigDecimal partnerShare=allocation.referringPartner(), directShare=allocation.directPartner(), platformShare=allocation.platform();
        ReferralCommission entry=new ReferralCommission();entry.setPartner(lead.getPartner());entry.setDirectPartner(directPct.signum()>0?direct:null);entry.setLead(lead);entry.setInstitutionalAmount(total);entry.setPartnerSharePercent(pct);entry.setPartnerAmount(partnerShare);entry.setDirectPartnerSharePercent(directPct);entry.setDirectPartnerAmount(directShare);entry.setPlatformAmount(platformShare);entry.setIdempotencyKey(request.idempotencyKey().trim());entry.setInstitutionReference(clean(request.institutionReference()));entry.setCreatedBy(admin);entry.setStatus("PENDING_REMITTANCE");commissions.save(entry);audit("COMMISSION_POSTED","COMMISSION",entry.getId(),admin,"idempotencyKey="+entry.getIdempotencyKey());return commissionView(entry);
    }

    @Transactional
    public Map<String,Object> reconcile(Long id,String status,String reference,String admin) {
        if (!Set.of("PENDING_REMITTANCE","PAYABLE","REVERSED").contains(status)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Unsupported commission status.");
        ReferralCommission entry=commissions.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Commission entry not found."));
        if ("REVERSED".equals(entry.getStatus()) && !"REVERSED".equals(status)) throw new ResponseStatusException(HttpStatus.CONFLICT,"Reversed ledger entries cannot be reopened. Create a correcting entry instead.");
        if ("PAYABLE".equals(status)) { if (reference==null||reference.isBlank()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"A verified institutional remittance reference is required before the partner share becomes payable."); entry.setRemittanceReference(reference.trim()); entry.setReconciledAt(LocalDateTime.now()); }
        entry.setStatus(status);commissions.save(entry);audit("COMMISSION_"+status,"COMMISSION",id,admin,"remittanceReference="+Objects.toString(entry.getRemittanceReference(),""));return commissionView(entry);
    }

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminLedger(){return commissions.findAllByOrderByCreatedAtDesc().stream().map(this::commissionView).toList();}

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminLeads(){return leads.findAllByOrderByCreatedAtDesc().stream().map(l->{Map<String,Object> row=leadView(l);row.put("partnerName",l.getPartner().getFullName());row.put("partnerEmail",l.getPartner().getEmail());return row;}).toList();}

    @Transactional(readOnly = true)
    public List<Map<String,Object>> adminAudit(){return auditLogs.findAllByOrderByCreatedAtDesc().stream().map(a->{Map<String,Object> row=new LinkedHashMap<>();row.put("id",a.getId());row.put("entityType",a.getEntityType());row.put("entityId",a.getEntityId());row.put("action",a.getAction());row.put("actor",a.getActor());row.put("details",a.getDetails());row.put("createdAt",a.getCreatedAt());return row;}).toList();}

    private AdmissionPartner approvedByEmail(String email){AdmissionPartner partner=partners.findByUser_EmailIgnoreCase(email).orElseThrow(()->new ResponseStatusException(HttpStatus.FORBIDDEN,"Approved admission partner access is required."));if(!"APPROVED".equals(partner.getStatus()))throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Partner access is not active.");return partner;}
    private AdmissionPartner partner(Long id){return partners.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Partner enquiry not found."));}
    private String newCode(){String code;do{code="EC"+UUID.randomUUID().toString().replace("-","").substring(0,10).toUpperCase(Locale.ROOT);}while(partners.existsByReferralCode(code));return code;}
    private String clean(String value){return value==null||value.isBlank()?null:value.trim();}
    private String firstFourPhoneDigits(String phone){
        String digits=phone==null?"":phone.replaceAll("\\D","");
        if(digits.length()<4) throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"The partner phone number must contain at least 4 digits.");
        return digits.substring(0,4);
    }
    private void audit(String action,String type,Long id,String actor,String details){ReferralAuditLog row=new ReferralAuditLog();row.setAction(action);row.setEntityType(type);row.setEntityId(id);row.setActor(actor);row.setDetails(details);auditLogs.save(row);}
    private Map<String,Object> partnerView(AdmissionPartner p){Map<String,Object> row=new LinkedHashMap<>();row.put("id",p.getId());row.put("fullName",p.getFullName());row.put("email",p.getEmail());row.put("phone",p.getPhone());row.put("experience",p.getExperience());row.put("collegeName",p.getCollegeName());row.put("consultingAmount",p.getConsultingAmount());row.put("partnerSharePercent",p.getPartnerSharePercent());row.put("directPartnerSharePercent",p.getDirectPartnerSharePercent());row.put("status",p.getStatus());row.put("referralCode",p.getReferralCode());row.put("userEmail",p.getUser()==null?null:p.getUser().getEmail());row.put("parentId",p.getParent()==null?null:p.getParent().getId());row.put("subpartnersAllowed",p.isSubpartnersAllowed());row.put("createdAt",p.getCreatedAt());return row;}
    private Map<String,Object> leadView(ReferralLead l){Map<String,Object> row=new LinkedHashMap<>();row.put("id",l.getId());row.put("studentName",l.getStudentName());row.put("studentEmail",l.getStudentEmail());row.put("studentPhone",l.getStudentPhone());row.put("institutionInterest",l.getInstitutionInterest());row.put("courseInterest",l.getCourseInterest());row.put("status",l.getStatus());row.put("createdAt",l.getCreatedAt());return row;}
    private Map<String,Object> commissionView(ReferralCommission c){Map<String,Object> row=new LinkedHashMap<>();row.put("id",c.getId());row.put("partnerName",c.getPartner().getFullName());row.put("partnerEmail",c.getPartner().getEmail());row.put("directPartnerName",c.getDirectPartner()==null?null:c.getDirectPartner().getFullName());row.put("leadId",c.getLead().getId());row.put("institutionalAmount",c.getInstitutionalAmount());row.put("partnerSharePercent",c.getPartnerSharePercent());row.put("partnerAmount",c.getPartnerAmount());row.put("directPartnerSharePercent",c.getDirectPartnerSharePercent());row.put("directPartnerAmount",c.getDirectPartnerAmount());row.put("platformAmount",c.getPlatformAmount());row.put("status",c.getStatus());row.put("idempotencyKey",c.getIdempotencyKey());row.put("institutionReference",c.getInstitutionReference());row.put("remittanceReference",c.getRemittanceReference());row.put("createdAt",c.getCreatedAt());return row;}
}
