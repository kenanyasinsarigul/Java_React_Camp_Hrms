package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.JobPositionService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.*;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.JobPositionDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.JobPosition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPositionManager implements JobPositionService {

    private JobPositionDao jobPositionDao;

    @Autowired
    public JobPositionManager(JobPositionDao jobPositionDao) {
        this.jobPositionDao = jobPositionDao;
    }

    @Override
    public DataResult<List<JobPosition>> getAll() {
        return new SuccessDataResult(this.jobPositionDao.findAll(),"Data listelendi");
    }

    @Override
    public Result add(JobPosition jobPosition) {
        if(getByName(jobPosition.getName()).getData() != null){
            return new ErrorResult("Bu isimde bir pozisyon zaten kayıtlı");
        }else if(jobPosition.getName().length() <=2){
            return new ErrorResult("İş ismi 2 karakterden kısa olamaz");
        }else{
            this.jobPositionDao.save(jobPosition);
            return new SuccessResult("İş eklendi");
        }


    }

    @Override
    public DataResult<JobPosition> getByName(String name) {
        return new SuccessDataResult<JobPosition>(this.jobPositionDao.findByName(name),"Listelendi");
    }
}
