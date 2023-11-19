package los.trainees.backend.service;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import los.trainees.backend.enums.EEmailType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@AllArgsConstructor
@Log4j2
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmailList(List<String> emailList, EEmailType emailType, String url) {
        String subject = null;
        String body = null;
        switch (emailType) {
            case SIGN_UP -> {
                subject = "DERES | Bienvenido a DERES!";
                body = readFromFile("email_sign_up.html", url);
            }
            case INVITATION -> {
                subject = "DERES | Un socio te ha invitado a unirte como su proveedor!";
                body = readFromFile("email_invitation.html", url);
            }
            case NOTIFICATION -> {
            }
        }
        for (String emailTo : emailList) {
            sendEmail(emailTo, subject, body);
        }
    }

    private void sendEmail(String emailTo, String subject, String body) {
        log.info("Email sent to: {}", emailTo);
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setTo(emailTo);
            helper.setSubject(subject);
            helper.setText(body, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Error sending email to: {}", emailTo, e);
        }
    }

    private String readFromFile(String file, String url) {
        try {
            Resource resource = new ClassPathResource("templates/" + file);
            InputStream inputStream = resource.getInputStream();
            return FileCopyUtils.copyToString(new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))).replace("{url}", url);
        } catch (Exception e) {
            log.error("Error reading from file", e);
        }
        return null;
    }
}
