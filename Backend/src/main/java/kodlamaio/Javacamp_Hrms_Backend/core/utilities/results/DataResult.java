package kodlamaio.Javacamp_Hrms_Backend.core.utilities.results;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.EmailService;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

public class DataResult<T> extends Result{

    private T data;

    public DataResult(T data, boolean success, String message) {
        super(success, message);
        this.data=data;
    }

    public DataResult(T data, boolean success){
        super(success);
        this.data=data;
    }

    public T getData(){
        return this.data;
    }
}

