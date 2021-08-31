package kodlamaio.Javacamp_Hrms_Backend.api.controllers;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.ExperienceService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Experience;
import kodlamaio.Javacamp_Hrms_Backend.entities.dtos.ExperienceForSetDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin
public class ExperiencesController {

    private ExperienceService experienceService;

    @Autowired
    public ExperiencesController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ExperienceForSetDto experienceForSetDto){
        Result result = this.experienceService.add(experienceForSetDto);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @DeleteMapping("/delete")
    public Result delete(@RequestParam int experienceId){
        return this.experienceService.delete(experienceId);
    }

    @GetMapping("/getByCvId")
    public DataResult<List<Experience>> getByCvId(@RequestParam int id){
        return this.experienceService.getByCvId(id);
    }
}
