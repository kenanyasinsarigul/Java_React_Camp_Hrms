package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.JobAdFavorites;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobAdFavoritesDao extends JpaRepository<JobAdFavorites,Integer> {
    List<JobAdFavorites> findByCandidateId(int id);
    boolean existsByCandidate_IdAndJobAd_Id(int candidateId,int JobAdId);
}
