package kodlamaio.Javacamp_Hrms_Backend.business.concretes;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.WorkPlaceService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.SuccessDataResult;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.WorkPlaceDao;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.WorkPlace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkPlaceManager implements WorkPlaceService {

    private WorkPlaceDao workPlaceDao;

    @Autowired
    public WorkPlaceManager(WorkPlaceDao workPlaceDao) {
        this.workPlaceDao = workPlaceDao;
    }

    @Override
    public DataResult<List<WorkPlace>> getAll() {
        return new SuccessDataResult(this.workPlaceDao.findAll(),"Data listelendi");
    }
}
