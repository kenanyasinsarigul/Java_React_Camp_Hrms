package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.WorkPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkPlaceDao extends JpaRepository<WorkPlace,Integer> {
}
