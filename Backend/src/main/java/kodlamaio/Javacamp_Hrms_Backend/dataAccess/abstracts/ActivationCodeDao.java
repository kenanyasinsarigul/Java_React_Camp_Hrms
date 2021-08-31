package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.ActivationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationCodeDao extends JpaRepository<ActivationCode,Integer> {
    ActivationCode findByCode(String code);
}