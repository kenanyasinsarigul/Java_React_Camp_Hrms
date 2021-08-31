package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.EmployerUpdate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerUpdateDao extends JpaRepository<EmployerUpdate, Integer> {
}

