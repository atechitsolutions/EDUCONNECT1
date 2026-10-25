package com.ALL_in_one.community.config;

import com.ALL_in_one.community.entity.StudentProfile;
import com.ALL_in_one.community.repository.StudentProfileRepository;
import com.ALL_in_one.entity.User;
import com.ALL_in_one.repository.UserRepository;
import java.util.Locale;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class CommunityProfileInitializer implements ApplicationRunner {
    private final UserRepository users;
    private final StudentProfileRepository profiles;

    public CommunityProfileInitializer(UserRepository users, StudentProfileRepository profiles) {
        this.users = users;
        this.profiles = profiles;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        for (User user : users.findAll()) {
            if (!"STUDENT".equals(user.getRole()) || profiles.existsById(user.getId())) continue;
            StudentProfile profile = new StudentProfile();
            profile.setUser(user);
            profile.setUsername("student_" + user.getId());
            profiles.save(profile);
        }
    }
}
