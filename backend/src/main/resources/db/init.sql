INSERT IGNORE INTO user (user_id, email, info, logo, username, password, phone, role)
VALUES (1, 'provider1@example.com', 'Provider 1 Info',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Canal_10_Uruguay_Logo_1960.webp/640px-Canal_10_Uruguay_Logo_1960.webp.png',
        'Provider 1', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '48690', 'PROVIDER'),
       (2, 'provider2@example.com', 'Provider 2 Info',
        'https://upload.wikimedia.org/wikipedia/commons/3/33/Canal4_uy.png', 'Provider 2', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '48690',
        'PROVIDER'),
       (3, 'provider3@example.com', 'Provider 3 Info',
        'https://upload.wikimedia.org/wikipedia/commons/7/79/Teledoce_2022.png', 'Provider 3', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '48690',
        'PROVIDER'),
       (4, 'provider4@example.com', 'Provider 4 Info',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Banco_santander_logo.svg/2560px-Banco_santander_logo.svg.png',
        'Provider 4', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '48691', 'PROVIDER'),
       (5, 'partner@example.com', 'User Test', 'https://pbs.twimg.com/profile_images/1367445938801901574/kyh0-_mu_400x400.jpg',
        'partner', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '48691', 'PARTNER'),
       (6, 'admin@example.com', 'User Admin', 'https://pbs.twimg.com/profile_images/1367445938801901574/kyh0-_mu_400x400.jpg',
        'admin', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '48691', 'ADMIN');

INSERT IGNORE INTO provider (address, business_name, contact, rut, user_id)
VALUES ('Lorenzo Carnelli 1234', 'CANAL 10 S.A.', 'contact',
        '734879753738964', 1),
       ('Paraguay, 2253, Montevideo, Uruguay', 'CANAL 4 S.A.', 'contact',
        '633334234363643', 2),
       ('Enriqueta Compte y Riqué 1276', 'TELEDOCE S.A.', 'contact',
        '3457385937529', 3),
       ('18 de Julio 1321', 'SANTANDER S.A.', 'contact', 'RUT1', 4);

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

INSERT IGNORE INTO partner (address, business_name, contact, rut, user_id)
VALUES ('address', 'business_name', 'contact', 'rut', 5);

INSERT IGNORE INTO admin (user_id, business_role)
VALUES (6, 'Rol administrador');

INSERT IGNORE INTO question
VALUES (1, 'GOVERNANCE', 'Pregunta #1 Governance', 'TrueOrFalse', 10),
       (2, 'GOVERNANCE', 'Pregunta #2 Governance', 'Ranking5', 20),
       (3, 'ENVIRONMENTAL', 'Pregunta #1 Environmental', 'TrueOrFalse', 30),
       (4, 'SOCIAL', 'Pregunta #1 Social', 'TrueOrFalse', 40);
