
import { useForm } from 'react-hook-form';
import axiosInstance from '../../api/axios';
import { useRouter } from 'next/router';
import styles from "../../styles/Businessform.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({
  category: yup
    .string()
    .min(3, "El Rubro debe tener al menos 3 caracteres.")
    .max(50, "El Rubro no puede exceder 50 caracteres.")
    .required("El campo 'Rubro' es obligatorio."),
    
  subcategory: yup
    .string()
    .min(3, "El Subrubro debe tener al menos 3 caracteres.")
    .max(50, "El Subrubro no puede exceder 50 caracteres.")
    .required("El campo 'Subrubro' es obligatorio."),
    
  description: yup
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(2500, "La descripción no puede exceder 2500 caracteres.")
    .nullable(),
    
  phone: yup
    .string()
    .matches(
      /^[0-9\s-]+$/,
      "El teléfono sólo puede contener números, espacios y guiones."
    )
    .min(7, "El teléfono debe tener al menos 7 caracteres.")
    .max(15, "El teléfono no puede exceder los 15 caracteres.")
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
    .max(100, "La calle no puede exceder 100 caracteres.")
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

const BusinessForm = ()=> {
  const { register, handleSubmit,formState:{errors},setError } = useForm({
    resolver:yupResolver(schema)
  });
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      // Convertir booleanos a "Sí" o "No"
      const booleanFields = ['accessibility', 'wifi', 'acceptsPets', 'parking'];
      booleanFields.forEach((field) => {
        data[field] = data[field] ? 'Sí' : 'No';
      });
  
      // Agrupa los métodos de pago como "Sí" o "No"
      const paymentMethods = {
        efectivo: data.efectivo ? 'Sí' : 'No',
        transferencia: data.transferencia ? 'Sí' : 'No',
        credito: data.credito ? 'Sí' : 'No',
        debito: data.debito ? 'Sí' : 'No',
      };
      formData.append('paymentMethods', JSON.stringify(paymentMethods));
  
      // Agrupa la ubicación en un objeto
      const location = {
        city: data.city,
        street: data.street,
        number: data.number,
      };
      formData.append('location', JSON.stringify(location));
  
      // Agrega otros datos al FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'coverPhoto' || key === 'gallery') {
          if (value instanceof FileList) {
            Array.from(value).forEach((file) => formData.append(key, file));
          }
        } else if (!['efectivo', 'transferencia', 'credito', 'debito', 'city', 'street', 'number'].includes(key)) {
          formData.append(key, value);
        }
      });
  
      // Enviar datos al backend
      await axiosInstance.post('/api/business', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Negocio registrado exitosamente');
      await axiosInstance.post('/auth/logout');
      router.push('/');
    }catch (err) {
      if (err.response?.status === 400 || err.response?.status === 401) {
        const validationErrors = err.response.data.errors || [];
        validationErrors.forEach(({ field, message }) => {
          setError(field, { type: "manual", message });
        });
        alert('Error al registrar el negocio: ' + (err.response?.data?.message || 'Error desconocido'));
      } else {
        alert('Error inesperado: ' + (err.message || 'Inténtalo nuevamente.'));
      }
    }
  };
  
  
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>Registrar Negocio</h1>

        <label htmlFor="category" className={styles.label}>Rubro</label>
        <input
          {...register('category', { required: true })}
          type="text"
          id="category"
          placeholder="Ej. Restaurante"
          className={styles.input}
        />
        {errors.category && <p className={styles.error}>{errors.category.message}</p>}

        <label htmlFor="subcategory" className={styles.label}>Subrubro</label>
        <input
          {...register('subcategory', { required: true })}
          type="text"
          id="subcategory"
          placeholder="Ej. Comida rápida"
          className={styles.input}
        />
        {errors.subcategory && <p className={styles.error}>{errors.subcategory.message}</p>}


        <label htmlFor="description" className={styles.label}>Descripción</label>
        <textarea
          {...register('description', { required: true })}
          id="description"
          placeholder="Describe tu negocio..."
          className={styles.textarea}
        ></textarea>
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Métodos de Pago</legend>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input {...register('efectivo')} type="checkbox" /> Efectivo
            </label>
            <label className={styles.checkboxLabel}>
              <input {...register('transferencia')} type="checkbox" /> Transferencia
            </label>
            <label className={styles.checkboxLabel}>
              <input {...register('credito')} type="checkbox" /> Tarjeta de crédito
            </label>
            <label className={styles.checkboxLabel}>
              <input {...register('debito')} type="checkbox" /> Tarjeta de débito
            </label>
          </div>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Opciones</legend>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input {...register('accessibility')} type="checkbox" /> Accesibilidad
            </label>
            <label className={styles.checkboxLabel}>
              <input {...register('wifi')} type="checkbox" /> Wifi
            </label>
            <label className={styles.checkboxLabel}>
              <input {...register('acceptsPets')} type="checkbox" /> Acepta Mascotas
            </label>
            <label className={styles.checkboxLabel}>
              <input {...register('parking')} type="checkbox" /> Estacionamiento Disponible
            </label>
          </div>
        </fieldset>

        <label htmlFor="coverPhoto" className={styles.label}>Foto de Portada</label>
        <input
          {...register('coverPhoto')}
          type="file"
          id="coverPhoto"
          accept="image/*"
          className={styles.fileInput}
        />

        <label htmlFor="gallery" className={styles.label}>Galería de Imágenes</label>
        <input
          {...register('gallery')}
          type="file"
          id="gallery"
          accept="image/*"
          multiple
          className={styles.fileInput}
        />

        <label htmlFor="schedule" className={styles.label}>Horarios Semanales</label>
        <input
          {...register('schedule', { required: true })}
          type="text"
          id="schedule"
          placeholder="Ej. 9:00 AM - 9:00 PM"
          className={styles.input}
        />
        {errors.schedule && <p className={styles.error}>{errors.schedule.message}</p>}

        <label htmlFor="city" className={styles.label}>Localidad</label>
        <input
          {...register('city', { required: true })}
          type="text"
          id="city"
          placeholder="Ciudad"
          className={styles.input}
        />
        {errors.city && <p className={styles.error}>{errors.city.message}</p>}


        <label htmlFor="street" className={styles.label}>Calle</label>
        <input
          {...register('street', { required: true })}
          type="text"
          id="street"
          placeholder="Calle"
          className={styles.input}
        />
        {errors.street && <p className={styles.error}>{errors.street.message}</p>}
        <label htmlFor="number" className={styles.label}>Número</label>
        <input
          {...register('number', { required: true })}
          type="text"
          id="number"
          placeholder="Número"
          className={styles.input}
        />
        {errors.number && <p className={styles.error}>{errors.number.message}</p>}

        <label htmlFor="phone" className={styles.label}>Teléfono</label>
        <input
          {...register('phone', { required: true })}
          type="text"
          id="phone"
          placeholder="Teléfono de contacto"
          className={styles.input}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        <label htmlFor="web" className={styles.label}>Página web</label>
        <input
          {...register('web')}
          type="text"
          id="web"
          placeholder="URL (opcional)"
          className={styles.input}
        />
         {errors.web && <p className={styles.error}>{errors.web.message}</p>}

        <label htmlFor="instagram" className={styles.label}>Instagram</label>
        <input
          {...register('instagram')}
          type="text"
          id="instagram"
          placeholder="URL (opcional)"
          className={styles.input}
        />
         {errors.instagram && <p className={styles.error}>{errors.instagram.message}</p>}

        <button type="submit" className={styles.button}>Registrar Negocio</button>
      </form>
    </div>
  );

};


export default BusinessForm;