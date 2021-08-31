package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Experience;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.ExperienceForSetDto;

import java.util.List;

public interface ExperienceService{
    Result add(ExperienceForSetDto experienceForSetDto);
    Result delete(int experienceId);
    DataResult<List<Experience>> getByCvId(int id);
}
