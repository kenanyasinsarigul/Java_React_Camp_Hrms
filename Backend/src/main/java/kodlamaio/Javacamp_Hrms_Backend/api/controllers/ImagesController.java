package kodlamaio.Javacamp_Hrms_Backend.api.controllers;

import kodlamaio.Javacamp_Hrms_Backend.business.abstracts.ImageService;
import kodlamaio.Javacamp_Hrms_Backend.core.services.CloudinaryService;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.dataAccess.abstracts.CvDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/images")
public class ImagesController {

    private CloudinaryService cloudinaryService;
    private ImageService imageService;
    private CvDao cvDao;

    @Autowired
    public ImagesController(CloudinaryService cloudinaryService, ImageService imageService,CvDao cvDao) {
        this.cloudinaryService = cloudinaryService;
        this.imageService = imageService;
        this.cvDao=cvDao;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.imageService.getAll());
    }

    @CrossOrigin
    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam MultipartFile multipartFile ,@RequestParam int cvId){
        Result result=this.imageService.update(multipartFile,cvId);
        if(!result.isSuccess()){
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam int id){
        Result result=this.imageService.delete(id);
        if(!result.isSuccess()){
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }
}
