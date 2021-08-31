package kodlamaio.Javacamp_Hrms_Backend.entities.concretes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Calendar;

@Entity
@Table(name = "activation_codes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "code")
    private String code;

    @Column(name = "verified")
    private boolean verified;

    @Column(name = "verify_date")
    private LocalDate verifyDate;
}
