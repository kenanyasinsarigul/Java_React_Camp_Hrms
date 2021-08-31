package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceDao extends JpaRepository<Experience,Integer> {
    List<ExperienceDao> findByCvId(int id);
}

