package kodlamaio.Javacamp_Hrms_Backend.api.controllers;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.CvService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Cv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cv")
@CrossOrigin
public class CvsController {

    private CvService cvService;

    @Autowired
    public CvsController(CvService cvService) {
        this.cvService = cvService;
    }

    @GetMapping("/getall")
    public DataResult<List<Cv>> getAll(){
        return this.cvService.getAll();
    }

    @GetMapping("/getByCvId")
    public ResponseEntity<?> getByCvId(@RequestParam int cvId){
        DataResult<Cv> result=this.cvService.getByCvId(cvId);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @GetMapping("/getByCandidateId")
    public ResponseEntity<?> getByCandidateId(@RequestParam int candidateId){
        DataResult<Cv> result=this.cvService.getByCandidateId(candidateId);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PutMapping("/updateGithub")
    public ResponseEntity<?> updateGithub(@RequestParam String github,@RequestParam int cvId){
        Result result=this.cvService.updateGithub(github,cvId);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @DeleteMapping("/deleteGithub")
    public ResponseEntity<?> deleteGithub(@RequestParam int cvId){
        Result result=this.cvService.deleteGithub(cvId);
        if (result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PutMapping("/updateLinkedin")
    public ResponseEntity<?> updateLinkedin(@RequestParam String linkedin,@RequestParam int cvId){
        Result result=this.cvService.updateLinkedin(linkedin,cvId);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @DeleteMapping("/deleteLinkedin")
    public ResponseEntity<?> deleteLinkedin(@RequestParam int cvId){
        Result result=this.cvService.deleteLinkedin(cvId);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @PutMapping("/updateBiography")
    public ResponseEntity<?> updateBiography(@RequestParam String biography,@RequestParam int cvId){
        Result result=this.cvService.updateBiography(biography,cvId);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @DeleteMapping("/deleteBiography")
    public ResponseEntity<?> deleteBiography(@RequestParam int cvId){
        Result result=this.cvService.deleteBiography(cvId);
        if(result.isSuccess()){
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }
}
