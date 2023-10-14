package los.trainees.backend.exception;

import los.trainees.backend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IncorrectUserDataException.class)
    public ResponseEntity<String> handleCustomException(IncorrectUserDataException ex) {
        return new ResponseEntity<>("Incorrect user data.", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return new ResponseEntity<>("Ocurrió un error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
