package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.ValidationService;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Candidate;
import org.springframework.stereotype.Service;

@Service
public class ValidationManager implements ValidationService {


    @Override
    public boolean validate(Candidate candidate) {
        if(candidate.getNationalNumber().length()!=11){
            return false;
        }
        return true;
    }
}
