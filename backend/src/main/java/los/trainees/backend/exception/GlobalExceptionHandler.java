package los.trainees.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IncorrectUserDataException.class)
    public ResponseEntity<Map<String, String>> handleCustomException() {
        return new ResponseEntity<>(Map.of("message", "Incorrect login credentials"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        ex.printStackTrace();
        return new ResponseEntity<>("Ocurrió un error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
