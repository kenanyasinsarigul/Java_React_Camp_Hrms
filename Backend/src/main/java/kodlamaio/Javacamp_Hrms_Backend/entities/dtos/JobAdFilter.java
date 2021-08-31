package kodlamaio.Javacamp_Hrms_Backend.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobAdFilter {

    private List<Integer> cityId;
    private List<Integer> jobPositionId;
    private List<Integer> workPlaceId;
    private List<Integer> workTimeId;
}
