package com.ALL_in_one.collegepartner.security;
import com.ALL_in_one.collegepartner.repository.CollegePartnerAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
@Component("collegePartnerAccess") @RequiredArgsConstructor
public class CollegePartnerAccess {
    private final CollegePartnerAccountRepository accounts;
    public boolean passwordChanged(String username) {
        return accounts.findByUsername(username).map(account -> account.isActive() && !account.isMustChangePassword()).orElse(false);
    }
}
