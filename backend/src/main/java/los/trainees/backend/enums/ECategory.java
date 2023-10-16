package los.trainees.backend.enums;

public enum ECategory {
    AGRO_FORESTAL_OTROS("Agro, Forestal y Otros"),
    COMERCIO_RETAIL_SERVICIOS("Comercio, Retail y Servicios"),
    COMUNICACIONES_PUBLICIDAD("Comunicaciones, Publicidad"),
    CONSTRUCCION_AFINES("Construcción y Afines"),
    ENTRETENIMIENTO_DEPORTE_CULTURA("Entretenimiento, Deporte y Cultura"),
    INDUSTRIA_DISTRIBUCION("Industria, Distribución"),
    SERVICIO_CONSULTORIA_EDUCACION_AFINES("Servicio Consultoría, Educación y Afines"),
    SERVICIO_SALUD_AFINES("Servicio Salud y Afines"),
    SERVICIO_CORREO("Servicio Correo"),
    SERVICIO_FINANCIERO_AFINES("Servicio Financiero y Afines"),
    SERVICIO_GASTRONOMICO_AFINES("Servicio Gastronómico y Afines"),
    SERVICIO_HOTELERIA_TURISMO("Servicio Hotelería y Turismo"),
    SERVICIO_PUBLICO_TRANSPORTE("Servicio Público y Transporte"),
    SERVICIO_SEGURO_AFINES("Servicio Seguro y Afines"),
    SERVICIO_VIGILANCIA_LIMPIEZA("Serivcio Vigilancia y Limpieza"),
    TELECOMUNICACIONES_DATOS("Telecomunicaciones y Datos");

    public final String name;

    ECategory(String name) {
        this.name = name;
    }

    public static ECategory findByName(String name) {
        for (ECategory eCategory : ECategory.values()) {
            if (eCategory.name.equalsIgnoreCase(name)) {
                return eCategory;
            }
        }
        return null;
    }
}
