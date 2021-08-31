package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.JobAd;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.JobAdDto;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.JobAdFilter;

import java.util.List;

public interface JobAdService {
    Result create(JobAdDto jobAdDto);
    Result setPasssive(int jobAdId);
    Result setActiveAndConfirm(int jobAdId,int staffId);
    DataResult<List<JobAd>> getAll();
    DataResult<JobAd> getByJobAdId(int id);
    DataResult<List<JobAd>> getActiveAds();
    DataResult<List<JobAd>> getActiveAndOrderLastDate();
    DataResult<List<JobAd>> getActiveAndCompanyId(int id);
    DataResult<List<JobAd>> getByIsActiveAndPageNumberAndFilter(int pageNo, int pageSize, JobAdFilter jobAdFilter);
}