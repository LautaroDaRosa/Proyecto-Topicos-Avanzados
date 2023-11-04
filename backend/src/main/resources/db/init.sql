INSERT IGNORE INTO user (user_id, email, info, username, password, phone, role)
VALUES (1, 'provider1@example.com', 'Provider 1 Info', 'Provider 1', '48690', '48690', 'PROVIDER'),
       (2, 'provider2@example.com', 'Provider 2 Info', 'Provider 2', '48690', '48690', 'PROVIDER'),
       (3, 'provider3@example.com', 'Provider 3 Info', 'Provider 3', '48690', '48690', 'PROVIDER'),
       (4, 'provider4@example.com', 'Provider 4 Info', 'Provider 4', '48690', '48691', 'PROVIDER');
INSERT IGNORE INTO provider (address, business_name, contact, logo, rut, social_environmental, social_governance, social_score,
                      user_id, form_form_id, average_score)
VALUES ('Lorenzo Carnelli 1234', 'CANAL 10 S.A.', '',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Canal_10_Uruguay_Logo_1960.webp/640px-Canal_10_Uruguay_Logo_1960.webp.png',
        '734879753738964', 1, 2, 3, 1, null, 2),
       ('Paraguay, 2253, Montevideo, Uruguay', 'CANAL 4 S.A.', '',
        'https://upload.wikimedia.org/wikipedia/commons/3/33/Canal4_uy.png', '633334234363643', 1, 2, 3, 2, null, 2),
       ('Enriqueta Compte y Riqué 1276', 'TELEDOCE S.A.', '',
        'https://upload.wikimedia.org/wikipedia/commons/7/79/Teledoce_2022.png', '3457385937529', 4, 5, 6, 3, null,
        5),
       ('18 de Julio 1321', 'SANTANDER S.A.', '',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Banco_santander_logo.svg/2560px-Banco_santander_logo.svg.png',
        'RUT1', 10, 10, 10, 4, null, 10);
INSERT IGNORE INTO provider_category (category, provider_user_id)
VALUES ('AGRO_FORESTAL_OTROS', 1),
       ('COMERCIO_RETAIL_SERVICIOS', 1),
       ('AGRO_FORESTAL_OTROS', 2),
       ('COMERCIO_RETAIL_SERVICIOS', 2),
       ('TELECOMUNICACIONES_DATOS', 2),
       ('SERVICIO_SEGURO_AFINES', 2),
       ('SERVICIO_GASTRONOMICO_AFINES', 2),
       ('SERVICIO_FINANCIERO_AFINES', 4),
       ('SERVICIO_GASTRONOMICO_AFINES', 3),
       ('SERVICIO_GASTRONOMICO_AFINES', 1);
INSERT IGNORE INTO user (user_id, email, info, username, password, phone, role)
VALUES (5, 'topicos@example.com', 'User Test', 'topicos', '48690', '48691', 'PARTNER');
INSERT IGNORE INTO partner (address, business_name, contact, logo, rut, user_id)
VALUES ('address', 'business_name', 'contact', 'logo', 'rut', 5)
