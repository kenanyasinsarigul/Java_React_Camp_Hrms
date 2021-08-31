package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.User;

public interface EmailService {
    void sendVerifyEmail(User user, String code);
}

