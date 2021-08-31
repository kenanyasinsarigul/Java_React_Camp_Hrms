package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Candidate;

public interface ValidationService {
    boolean validate(Candidate candidate);
}

