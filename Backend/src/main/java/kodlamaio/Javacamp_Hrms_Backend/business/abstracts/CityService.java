package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.City;

import java.util.List;

public interface CityService {
    public DataResult<List<City>> getAll();
}
