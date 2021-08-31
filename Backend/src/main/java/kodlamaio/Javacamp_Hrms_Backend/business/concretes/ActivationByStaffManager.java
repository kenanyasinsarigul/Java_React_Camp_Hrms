package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.ActivationByStaffService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.ErrorResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.SuccessResult;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.ActivationByStaffDao;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.EmployerDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.ActivationByStaff;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDate;

@Service
public class ActivationByStaffManager implements ActivationByStaffService {

    private ActivationByStaffDao activationByStaffDao;
    private EmployerDao employerDao;

    @Autowired
    public ActivationByStaffManager(ActivationByStaffDao activationByStaffDao,EmployerDao employerDao) {
        this.activationByStaffDao = activationByStaffDao;
        this.employerDao=employerDao;
    }

    @Override
    public void createActivationByStaff(Employer employer) {
        ActivationByStaff activationByStaff=new ActivationByStaff();
        activationByStaff.setEmployeId(employer.getId());
        activationByStaff.setVerified(false);
        activationByStaff.setStaffId(null);
        activationByStaffDao.save(activationByStaff);
    }

    @Override
    public Result activateEmployer(int employerId, int staffId) {

        try {
            Employer employer = employerDao.getById(employerId);
            ActivationByStaff activationByStaff = activationByStaffDao.findByEmployeId(employerId);

            employer.setActive(true);
            employerDao.save(employer);

            activationByStaff.setVerified(true);
            activationByStaff.setVerifyDate(LocalDate.now());
            activationByStaff.setStaffId(staffId);
            activationByStaffDao.save(activationByStaff);

        }catch (EntityNotFoundException exception){
            return new ErrorResult("Hatalı id");
        }
        return new SuccessResult("Kullanıcı aktif edildi");
    }
}
