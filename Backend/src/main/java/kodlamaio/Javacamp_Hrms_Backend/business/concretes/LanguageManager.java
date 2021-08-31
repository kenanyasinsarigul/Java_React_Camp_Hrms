package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.LanguageService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.*;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.CvDao;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.LanguageDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Language;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.LanguageForSetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageManager implements LanguageService {

    private LanguageDao languageDao;
    private CvDao cvDao;

    @Autowired
    public LanguageManager(LanguageDao languageDao,CvDao cvDao) {
        this.languageDao = languageDao;
        this.cvDao=cvDao;
    }

    @Override
    public Result addLanguage(LanguageForSetDto languageForSetDto) {

        if(!this.cvDao.existsById(languageForSetDto.getCvId())){
            return new ErrorResult("Böyle bir cv yok");
        }else if(languageForSetDto.getName().length()<=2){
            return new ErrorResult("Dil ismi 2 karakterden uzun olmalıdır");
        }else if(Integer.parseInt(languageForSetDto.getLevel()) <=0 || Integer.parseInt(languageForSetDto.getLevel()) >=6){
            return new ErrorResult("Dil seviyesi 1-5 arası bir değer olmalıdır");
        }

        Language language=new Language();
        language.setCv(this.cvDao.getById(languageForSetDto.getCvId()));
        language.setName(languageForSetDto.getName());
        language.setLevel(languageForSetDto.getLevel());

        this.languageDao.save(language);
        return new SuccessResult("Dil kaydedildi");
    }

    @Override
    public Result deleteLanguage(int languageId) {
        if(!this.languageDao.existsById(languageId)){
            return new ErrorResult("Böyle bir dil bulunamadı");
        }
        this.languageDao.deleteById(languageId);
        return new SuccessResult("Silindi");
    }

    @Override
    public DataResult<List<Language>> getByCvId(int cvId) {
        if(!this.cvDao.existsById(cvId)){
            return new ErrorDataResult("Böyle bir cv yok");
        }
        return new SuccessDataResult<List<Language>>(this.languageDao.findByCvId(cvId),"Listelendi");
    }
}
