package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.ActivationCode;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.User;

public interface ActivationCodeService {
    ActivationCode getByCode(String code);
    String createActivationCode(User user);
    Result activateUser(String code);
}
