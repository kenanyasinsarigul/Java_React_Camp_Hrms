package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.TechnologyService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.*;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.CvDao;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.TechnologyDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Technology;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.TechnologyForSerDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnologyManager implements TechnologyService {

    private TechnologyDao technologyDao;
    private CvDao cvDao;

    @Autowired
    public TechnologyManager(TechnologyDao technologyDao, CvDao cvDao) {
        this.technologyDao = technologyDao;
        this.cvDao = cvDao;
    }

    @Override
    public Result addTechnology(TechnologyForSerDto technologyForSerDto) {

        if(!this.cvDao.existsById(technologyForSerDto.getCvId())){
            return new ErrorResult("Böyle bir cv yok");
        }else if(technologyForSerDto.getName().length()<=2){
            return new ErrorResult("Teknoloji adı 2 karekterden kısa olamaz");
        }

        Technology technology=new Technology();
        technology.setCv(this.cvDao.getById(technologyForSerDto.getCvId()));
        technology.setName(technologyForSerDto.getName());

        this.technologyDao.save(technology);
        return new SuccessResult("Eklendi");
    }

    @Override
    public Result deleteTechnology(int technologyId) {
        if(!this.technologyDao.existsById(technologyId)){
            return new ErrorResult("Böyle bir teknoloji yok");
        }
        this.technologyDao.deleteById(technologyId);
        return new SuccessResult("Silindi");
    }

    @Override
    public DataResult<List<Technology>> getByCvId(int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorDataResult("Böyle bir cv yok");
        }

        return new SuccessDataResult<List<Technology>>(this.technologyDao.findByCvId(cvId),"Data listelendi");
    }
}
