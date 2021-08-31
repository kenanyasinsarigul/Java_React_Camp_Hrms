package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.ExperienceService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.*;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.CvDao;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.ExperienceDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Experience;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.ExperienceForSetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceManager implements ExperienceService {

    private ExperienceDao experienceDao;
    private CvDao cvDao;

    @Autowired
    public ExperienceManager(ExperienceDao experienceDao, CvDao cvDao) {
        this.experienceDao = experienceDao;
        this.cvDao=cvDao;
    }

    @Override
    public Result add(ExperienceForSetDto experienceForSetDto) {

        if(!this.cvDao.existsById(experienceForSetDto.getCvId())){
            return new ErrorResult("Böyle bir cv yok");
        }else if(experienceForSetDto.getCompanyName().length()<=2){
            return new ErrorResult("Şirket adı 2 karakterden uzun olmalıdır");
        }else if(experienceForSetDto.getPosition().length()<=2){
            return new ErrorResult("Pozisyon adı 2 karakterden uzun olmalıdır");
        }else if(experienceForSetDto.getStartDate() == null){
            return new ErrorResult("Başlangıç tarihi boş bırakılamaz");
        }

        Experience experience=new Experience();
        experience.setCv(this.cvDao.getById(experienceForSetDto.getCvId()));
        experience.setCompanyName(experienceForSetDto.getCompanyName());
        experience.setPosition(experienceForSetDto.getPosition());
        experience.setStartDate(experienceForSetDto.getStartDate());
        experience.setEndDate(experienceForSetDto.getEndDate());

        this.experienceDao.save(experience);
        return new SuccessResult("Kaydedildi");
    }

    @Override
    public Result delete(int experianceId) {
        if(!this.experienceDao.existsById(experianceId)){
            return new ErrorResult("Böyle bir tecrübe yok");
        }
        this.experienceDao.deleteById(experianceId);
        return new SuccessResult("Silindi");
    }

    @Override
    public DataResult<List<Experience>> getByCvId(int id) {

        return new SuccessDataResult(this.experienceDao.findByCvId(id),"Data listelendi");
    }
}
