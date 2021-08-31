package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.WorkTimeService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.SuccessDataResult;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.WorkTimeDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.WorkTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkTimeManager implements WorkTimeService {

    private WorkTimeDao workTimeDao;

    @Autowired
    public WorkTimeManager(WorkTimeDao workTimeDao) {
        this.workTimeDao = workTimeDao;
    }

    @Override
    public DataResult<List<WorkTime>> getAll() {
        return new SuccessDataResult(this.workTimeDao.findAll(),"Data listelendi");
    }
}
