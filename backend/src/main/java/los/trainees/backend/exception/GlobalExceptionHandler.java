package los.trainees.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IncorrectUserDataException.class)
    public ResponseEntity<Map<String, String>> handleIncorrectUserDataException() {
        return new ResponseEntity<>(Map.of("message", "Incorrect login credentials"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> handleUnauthorizedUserException() {
        return new ResponseEntity<>(Map.of("message", "Access denied"), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleQuestionNotFoundException() {
        return new ResponseEntity<>(Map.of("message", "Incorrect question id"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProviderIdNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleBadRequestProviderIDException() {
        return new ResponseEntity<>(Map.of("message", "Incorrect provider id"), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AlreadyCreatedInviteException.class)
    public ResponseEntity<Map<String, String>> handleBadInvite() {
        return new ResponseEntity<>(Map.of("message", "Invite already created, try someone else"), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(InviteNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleBadIdInvite() {
        return new ResponseEntity<>(Map.of("message", "Invite not found"), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidRegisterException.class)
    public ResponseEntity<Map<String, String>> handleBadRegister() {
        return new ResponseEntity<>(Map.of("message", "Can not create that user with the passed params"), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidInviteException.class)
    public ResponseEntity<Map<String, String>> handleInvalidInvite() {
        return new ResponseEntity<>(Map.of("message", "Can not create that invite"), HttpStatus.BAD_REQUEST);
    }
}
