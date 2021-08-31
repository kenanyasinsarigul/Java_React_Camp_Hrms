package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.JobAdFavorites;

import java.util.List;


public interface JobAdFavoritesService {
    public DataResult<List<JobAdFavorites>> getByCandidateId(int candidateId);
    public Result addFavorite(int candidateId, int jobAdId);
    public Result removeFavorite(int favoriteId);
}

