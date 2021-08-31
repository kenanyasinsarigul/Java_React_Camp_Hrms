package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Language;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.LanguageForSetDto;

import java.util.List;

public interface LanguageService {
    public Result addLanguage(LanguageForSetDto languageForSetDto);
    public Result deleteLanguage(int languageId);
    public DataResult<List<Language>> getByCvId(int cvId);
}

