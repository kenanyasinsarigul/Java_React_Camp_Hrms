package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.CityService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.SuccessDataResult;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.CityDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityManager implements CityService {

    private CityDao cityDao;

    @Autowired
    public CityManager(CityDao cityDao) {
        this.cityDao = cityDao;
    }

    @Override
    public DataResult<List<City>> getAll() {
        return new SuccessDataResult(this.cityDao.findAll(),"Data listelendi");
    }
}
