package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.School;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.SchoolForSerDto;

import java.util.List;

public interface SchoolService {
    public Result addSchool(SchoolForSerDto schoolForSerDto);
    public Result deleteSchool(int schoolId);
    public DataResult<List<School>> getByCvId(int cvId);
}

