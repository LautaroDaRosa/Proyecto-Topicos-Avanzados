package los.trainees.backend.exception;

public class IncorrectUserDataException extends RuntimeException {
    public IncorrectUserDataException() {

    }
    public IncorrectUserDataException(String message) {
        super(message);
    }
}
