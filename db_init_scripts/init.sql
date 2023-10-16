-- Crear registros de ejemplo en la tabla `User` para los proveedores y socios
INSERT INTO user (email, info, name, password, phone, role)
VALUES ('provider1@example.com', 'Provider 1 Info', 'Provider 1', '48690', '48690', 'PROVIDER'),
       ('provider2@example.com', 'Provider 2 Info', 'Provider 2', '48690', '48690', 'PROVIDER'),
       ('provider3@example.com', 'Provider 3 Info', 'Provider 3', '48690', '48690', 'PROVIDER');

-- Crear registros de ejemplo en la tabla `Provider` para los proveedores
INSERT INTO provider (address, business_name, contact, logo, rut, social_environmental, social_governance, social_score, user_id, form_form_id, average_score)
VALUES ('Lorenzo Carnelli 1234', 'CANAL 10 S.A.', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Canal_10_Uruguay_Logo_1960.webp/640px-Canal_10_Uruguay_Logo_1960.webp.png', '734879753738964', 0, 0, 9, 1, null, null),
       ('Paraguay, 2253, Montevideo, Uruguay', 'CANAL 4 S.A.', '', 'https://upload.wikimedia.org/wikipedia/commons/3/33/Canal4_uy.png', '633334234363643', 0, 0, 6, 2, null, null),
       ('Enriqueta Compte y Riqué 1276', 'TELEDOCE S.A.', '', 'https://upload.wikimedia.org/wikipedia/commons/7/79/Teledoce_2022.png', '3457385937529', 0, 0, 7, 3, null, null);

-- Crear registros de ejemplo en la tabla `Category` para los proveedores
INSERT INTO provider_category (category, provider_user_id)
VALUES ('AGRO_FORESTAL_OTROS', 1),
       ('COMERCIO_RETAIL_SERVICIOS', 1),
       ('AGRO_FORESTAL_OTROS', 2),
       ('COMERCIO_RETAIL_SERVICIOS', 2),
       ('TELECOMUNICACIONES_DATOS', 2),
       ('SERVICIO_SEGURO_AFINES', 2),
       ('SERVICIO_GASTRONOMICO_AFINES', 2),
       ('SERVICIO_FINANCIERO_AFINES', 3),
       ('SERVICIO_GASTRONOMICO_AFINES', 3),
       ('SERVICIO_GASTRONOMICO_AFINES', 1);

-- Otras relaciones y datos que desees crear

-- Crear registros de ejemplo en la tabla `Partner`
INSERT INTO user (email, info, name, password, phone, role)
VALUES ('partner1@example.com', 'Partner 1 Info', 'Partner 1', '48690', '48691', 'PARTNER');

INSERT INTO partner (address, business_name, contact, logo, rut, user_id)
VALUES ('18 de Julio 1321', 'SANTANDER S.A.', '', 'ttps://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Banco_santander_logo.svg/2560px-Banco_santander_logo.svg.png', 'RUT1', 4);

