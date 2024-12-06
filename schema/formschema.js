import * as yup from "yup";

export const formSchema = yup.object().shape({
  fantasyName: yup
    .string()
    .min(3, "El Nombre de fantasía debe tener al menos 3 caracteres.")
    .max(250, "El Nombre de fantasía no puede exceder 250 caracteres.")
    .required("El campo 'Nombre de fantasía' es obligatorio."),

  category: yup
    .string()
    .min(3, "El Rubro debe tener al menos 3 caracteres.")
    .max(250, "El Rubro no puede exceder 250 caracteres.")
    .required("El campo 'Rubro' es obligatorio."),

  subcategory: yup
    .string()
    .min(3, "El Subrubro debe tener al menos 3 caracteres.")
    .max(250, "El Subrubro no puede exceder 250 caracteres.")
    .required("El campo 'Subrubro' es obligatorio."),

  description: yup
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(2500, "La descripción no puede exceder 2500 caracteres.")
    .nullable(),

  phone: yup
    .string()
    .matches(
      /^\+?[0-9]{7,15}$/,
      "El teléfono debe contener sólo dígitos (y opcionalmente un '+') con entre 7 y 15 caracteres."
    )
    .required("El campo Teléfono es obligatorio."),

  schedule: yup
    .string()
    .min(5, "El horario debe tener al menos 5 caracteres.")
    .max(50, "El horario no puede exceder 50 caracteres.")
    .required("El campo 'Horario' es obligatorio."),

  city: yup
    .string()
    .min(2, "La localidad debe tener al menos 2 caracteres.")
    .max(100, "La localidad no puede exceder 100 caracteres.")
    .required("El campo 'Localidad' es obligatorio."),

  street: yup
    .string()
    .min(2, "La calle debe tener al menos 2 caracteres.")
    .max(200, "La calle no puede exceder 200 caracteres.")
    .required("El campo 'Calle' es obligatorio."),

  number: yup
    .string()
    .matches(/^[0-9]+$/, "El número sólo puede contener dígitos.")
    .min(1, "El número debe tener al menos 1 dígito.")
    .max(6, "El número no puede exceder 6 dígitos.")
    .required("El campo 'Número' es obligatorio."),

  web: yup
    .string()
    .url("La URL de la página web debe ser válida (ejemplo: https://tusitio.com).")
    .nullable(),

  instagram: yup
    .string()
    .url("La URL de Instagram debe ser válida (ejemplo: https://instagram.com/tunegocio).")
    .nullable(),
});