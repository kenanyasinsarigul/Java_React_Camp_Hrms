package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Staff;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.StaffUpdateDto;

import java.util.List;

public interface StaffService {
    public Result create(Staff staff);
    public DataResult<List<Staff>> getAll();
    public Result update(StaffUpdateDto staffUpdateDto);
}
