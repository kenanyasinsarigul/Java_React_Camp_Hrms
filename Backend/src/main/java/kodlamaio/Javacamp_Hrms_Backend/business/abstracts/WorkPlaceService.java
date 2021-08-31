package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.WorkPlace;

import java.util.List;

public interface WorkPlaceService {
    public DataResult<List<WorkPlace>> getAll();
}
