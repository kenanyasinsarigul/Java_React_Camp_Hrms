package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Employer;

public interface ActivationByStaffService {
    void createActivationByStaff(Employer employer);
    Result activateEmployer(int employerId, int staffId);
}