package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.JobAdActivation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobAdActivationDao extends JpaRepository<JobAdActivation,Integer> {
}

