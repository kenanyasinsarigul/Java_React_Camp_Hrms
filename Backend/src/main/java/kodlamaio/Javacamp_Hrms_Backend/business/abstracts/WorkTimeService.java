package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.WorkTime;

import java.util.List;

public interface WorkTimeService {
    public DataResult<List<WorkTime>> getAll();
}

