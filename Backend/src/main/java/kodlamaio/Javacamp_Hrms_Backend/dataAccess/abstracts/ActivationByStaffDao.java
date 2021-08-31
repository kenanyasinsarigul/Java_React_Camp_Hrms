package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.ActivationByStaff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationByStaffDao extends JpaRepository<ActivationByStaff,Integer> {
    ActivationByStaff findByEmployeId(int id);

}

