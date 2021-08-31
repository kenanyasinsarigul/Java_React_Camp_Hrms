package kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.JobAd;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.JobAdFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobAdDao extends JpaRepository<JobAd,Integer> {
    List<JobAd> findByActive(boolean active);
    List<JobAd> findByActiveOrderByLastDate(boolean active);
    List<JobAd> findByActiveTrueAndEmployer_Id(int id);


    @Query("Select j from kodlamaio.Javacamp_Hrms_Backend.entities.concretes.JobAd j where ((:#{#filter.cityId}) IS NULL OR j.city.id IN (:#{#filter.cityId}))"
            +" and ((:#{#filter.jobPositionId}) IS NULL OR j.jobPosition.id IN (:#{#filter.jobPositionId}))"
            +" and ((:#{#filter.workPlaceId}) IS NULL OR j.workPlace.id IN (:#{#filter.workPlaceId}))"
            +" and ((:#{#filter.workTimeId}) IS NULL OR j.workTime.id IN (:#{#filter.workTimeId}))"
            +" and j.active=true")
    public Page<JobAd> getByFilter(@Param("filter") JobAdFilter jobAdFilter, Pageable pageable);
}