package los.trainees.backend.service;

import lombok.AllArgsConstructor;
import los.trainees.backend.dto.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        javaMailSender.send(message);
    }

    public List<String> sendEmail(EmailDTO emailDTO) {

        List<String> result = new ArrayList<>();

        List<String> to = emailDTO.getTo();
        String subject = emailDTO.getSubject();
        String body = emailDTO.getBody();
        for (String mail:
             to) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(mail);
            message.setSubject(subject);
            message.setText(body);

            javaMailSender.send(message);
            result.add(mail);
        }
        return result;
    }
}
