package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Employer;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.EmployerUpdate;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.EmployerForRegisterDto;

import java.util.List;

public interface EmployerService {
    DataResult<List<Employer>> getAll();
    DataResult<Employer> getByEmail(String email);
    Result add(EmployerForRegisterDto employerDto);
    DataResult<Employer> getById(int id);
    Result update(EmployerUpdate employerUpdate);
    Result verifyUpdate(int employerUpdateId,int staffId);
}
