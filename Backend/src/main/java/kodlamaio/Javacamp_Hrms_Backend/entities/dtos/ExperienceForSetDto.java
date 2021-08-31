package kodlamaio.Javacamp_Hrms_Backend.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExperienceForSetDto {

    private int cvId;

    private String companyName;

    private String position;

    private LocalDate startDate;

    private LocalDate endDate;
}
