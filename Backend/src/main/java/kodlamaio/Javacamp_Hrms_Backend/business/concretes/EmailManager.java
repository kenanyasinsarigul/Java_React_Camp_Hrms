package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.EmailService;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
public class EmailManager implements EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Override
    public void sendVerifyEmail(User user, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("Javacamp_Hrms_Mail_Doğrulama");
        message.setText("Hrms kayıt işleminizi tamamlamak için linke tıklayınız:" + "http://localhost:8080/api/activationcode/active/" + code);
        message.setTo(user.getEmail());
        message.setFrom("dene60me@gmail.com");

        emailSender.send(message);
    }
}
