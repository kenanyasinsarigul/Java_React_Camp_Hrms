package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityDao extends JpaRepository<City,Integer> {
}
