package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.User;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.UserLoginDto;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.UserLoginReturnDto;

import java.util.List;

public interface UserService {
    DataResult<List<User>> getAll();
    DataResult<User> getByEmail(String email);
    DataResult<UserLoginReturnDto> login(UserLoginDto userLoginDto);
    DataResult<List<User>> getVerifiedUsers();
}

