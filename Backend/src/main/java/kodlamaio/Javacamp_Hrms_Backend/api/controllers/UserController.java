package kodlamaio.Javacamp_Hrms_Backend.api.controllers;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.UserService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.User;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.UserLoginDto;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.UserLoginReturnDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getall")
    public DataResult<List<User>> getAll(){
        return this.userService.getAll();
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody UserLoginDto userLoginDto){
        DataResult<UserLoginReturnDto> result = this.userService.login(userLoginDto);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/getVerifiedUsers")
    DataResult<List<User>> getVerifiedUsers(){
        return this.userService.getVerifiedUsers();
    }
}
