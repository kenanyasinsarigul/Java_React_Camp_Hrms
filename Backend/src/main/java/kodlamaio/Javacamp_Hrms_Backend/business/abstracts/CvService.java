package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Cv;

import java.util.List;

public interface CvService {
    public Result add(int candidateId);
    public DataResult<List<Cv>> getAll();

    public DataResult<Cv> getByCvId(int cvId);
    public DataResult<Cv> getByCandidateId(int candidateId);

    public Result updateGithub(String github, int cvId);
    public Result deleteGithub(int cvId);

    public Result updateLinkedin(String linkedin, int cvId);
    public Result deleteLinkedin(int cvId);

    public Result updateBiography(String biography, int cvId);
    public Result deleteBiography(int cvId);
}

