package kodlamaio.Javacamp_Hrms_Backend.business.abstracts;

import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.DataResult;
import kodlamaio.Javacamp_Hrms_Backend.core.utilities.results.Result;
import kodlamaio.Javacamp_Hrms_Backend.entities.concretes.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    DataResult<List<Image>> getAll();
    Result update(MultipartFile multipartFile, int cvId);
    Result delete(int id);
    DataResult<Image> getById(int id);
    Boolean isExist(int id);
}
