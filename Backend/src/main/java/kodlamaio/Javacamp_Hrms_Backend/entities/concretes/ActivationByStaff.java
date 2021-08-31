package kodlamaio.Javacamp_Hrms_Backend.entities.concretes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Calendar;

@Entity
@Table(name = "activation_by_staffs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivationByStaff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "employe_id")
    private int employeId;

    @Column(name = "staff_id")
    private Integer staffId;

    @Column(name = "verified")
    private boolean verified;

    @Column(name = "verify_date")
    private LocalDate verifyDate;
}
