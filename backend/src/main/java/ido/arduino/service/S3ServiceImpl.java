package ido.arduino.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
 
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;

import ido.arduino.dao.UserMapper;
 
@Service
public class S3ServiceImpl implements S3Service {
 
    private static final Logger LOGGER = LoggerFactory.getLogger(S3ServiceImpl.class);
 
    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private AmazonS3 amazonS3;
    @Value("${aws.s3.bucket}")
    private String bucketName;
    @Override
    @Async  // @Async annotation을 사용하면 해당 method가 다른 thread에서 실행되게 할 수 있다!! 
    public void uploadFile(final MultipartFile multipartFile, int userID) {
        LOGGER.info("File upload in progress...");
        try {
            final File file = convertMultiPartFileToFile(multipartFile);
            uploadFileToS3Bucket(bucketName, file, userID);
            LOGGER.info("File upload is completed.");
            Boolean result = file.delete();  // S3 업로드 후 프로젝트에 저장된 파일 지우기
            System.out.println("Delete result?"+ result);
        } catch (final AmazonServiceException ex) {
            LOGGER.info("File upload is failed.");
            LOGGER.error("Error= {} while uploading file.", ex.getMessage());
        }
    }
 
    private File convertMultiPartFileToFile(final MultipartFile multipartFile) {
        final File file = new File(multipartFile.getOriginalFilename());
        try (final FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(multipartFile.getBytes());
        } catch (final IOException ex) {
            LOGGER.error("Error converting the multi-part file to file= ", ex.getMessage());
        }
        return file;
    }
 
    private void uploadFileToS3Bucket(final String bucketName, final File file, int userID) {
        String uniqueFileName = LocalDateTime.now() + "_" + file.getName();
        LOGGER.info("Uploading file with name= " + uniqueFileName);
        userMapper.uploadProfileImage(userID, uniqueFileName);
        
        final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFileName, file);
        amazonS3.putObject(putObjectRequest);
    }
}