import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import axiosInstance from '../../api/axios.js';
import styles from "../../styles/Businessform.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from '../../schema/formschema.js';
import InputField from './InputField';
import CheckBoxGroup from './CheckBoxGroup';

// Mapeos de etiquetas a llaves internas
const paymentMethodsMapping = {
  "Efectivo": "efectivo",
  "Transferencia": "transferencia",
  "Tarjeta de crédito": "credito",
  "Tarjeta de débito": "debito",
  "Criptomonedas": "criptomonedas"
};

const generalMapping = {
  "Atención bilingüe": "bilingual",
  "Reservas online": "onlineBooking",
  "Cancelación flexible": "cancelation",
  "Atención las 24 horas": "attention",
  "Servicio de emergencia": "emergency",
  "Personal capacitado en primeros auxilios": "aids",
  "Eventos y celebraciones privadas": "events",
  "Espacios climatizados": "cspaces",
  "Estacionamiento privado": "estprivate"
};

const accessibilityMapping = {
  "Rampas para silla de ruedas": "rampas",
  "Baños adaptados": "abath",
  "Asistencia para personas con movilidad reducida": "assistance"
};

const gastronomyMapping = {
  "Menú para celíacos": "cmenu",
  "Opciones veganas y vegetarianas": "vegetarian",
  "Menú infantil": "infant",
  "Delivery": "delivery",
  "Takeaway": "takeaway",
  "Carta de vinos": "wine",
  "Cerveza artesanal": "beer",
  "Espectáculos en vivo": "live",
  "Música ambiental": "ambient",
  "Menú en braille": "braile"
};

const connectivityMapping = {
  "Wifi gratuito para clientes": "freewifi",
  "Opciones de carga rápida": "fastcharge",
  "Espacio de coworking": "coworkspace"
};

const additionalMapping = {
  "Puntos de reciclaje": "recycling",
  "Espacio pet friendly": "petfriendly"
};

// Arrays de opciones mostradas al usuario
const paymentMethods = Object.keys(paymentMethodsMapping);
const general = Object.keys(generalMapping);
const accessibility = Object.keys(accessibilityMapping);
const gastronomy = Object.keys(gastronomyMapping);
const connectivity = Object.keys(connectivityMapping);
const additional = Object.keys(additionalMapping);

const BusinessForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(formSchema),
  });
  
  const router = useRouter();

  function createBooleanObject(mapping, formData) {
    const result = {};
    for (const label in mapping) {
      const key = mapping[label];
      // Si el checkbox no fue marcado, será undefined, lo forzamos a false
      result[key] = !!formData[label];
    }
    return result;
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Crear objetos booleanos con las llaves internas
      const paymentMethodsObj = createBooleanObject(paymentMethodsMapping, data);
      const generalObj = createBooleanObject(generalMapping, data);
      const accessibilityObj = createBooleanObject(accessibilityMapping, data);
      const gastronomyObj = createBooleanObject(gastronomyMapping, data);
      const connectivityObj = createBooleanObject(connectivityMapping, data);
      const additionalObj = createBooleanObject(additionalMapping, data);

      const location = {
        city: data.city,
        street: data.street,
        number: data.number,
      };

      formData.append('location', JSON.stringify(location));

      // Eliminar las props originales
      delete data.city;
      delete data.street;
      delete data.number;
      delete data.coverPhoto;
      delete data.gallery;

      // Eliminar las props de checkboxes originales
      paymentMethods.forEach(option => delete data[option]);
      general.forEach(option => delete data[option]);
      accessibility.forEach(option => delete data[option]);
      gastronomy.forEach(option => delete data[option]);
      connectivity.forEach(option => delete data[option]);
      additional.forEach(option => delete data[option]);

      // Agregar los nuevos objetos con llaves internas
      formData.append('paymentMethods', JSON.stringify(paymentMethodsObj));
      formData.append('general', JSON.stringify(generalObj));
      formData.append('accessibility', JSON.stringify(accessibilityObj));
      formData.append('gastronomy', JSON.stringify(gastronomyObj));
      formData.append('connectivity', JSON.stringify(connectivityObj));
      formData.append('additional', JSON.stringify(additionalObj));

      // Agregar el resto de los campos (fantasyName, category, subcategory, etc.)
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      if (data.coverPhoto) {
        formData.append("coverPhoto", data.coverPhoto[0]);
      }

      if (data.gallery) {
        Array.from(data.gallery).forEach((file) => formData.append("gallery", file));
      }
      
      await axiosInstance.post('/api/business', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('Negocio registrado exitosamente');
      router.push('/');
    } catch (err) {
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1>Completá este formulario para crear tu landing page personalizada y destacar en nuestra plataforma</h1>

      <InputField 
        label="Nombre de fantasía" 
        id="fantasyName" 
        register={register} 
        error={errors.fantasyName} 
        placeholder="Ejemplo: Hotel Sol de mar" 
      />

      <InputField 
        label="Rubro principal" 
        id="category" 
        register={register} 
        error={errors.category} 
        placeholder="Ejemplo: Turismo, Gastronomía, Salud, Tecnología, etc." 
      />

      <InputField 
        label="Subrubro" 
        id="subcategory" 
        register={register} 
        error={errors.subcategory} 
        placeholder="Ejemplo: Pizzería, Alquiler de sombrillas, Psicólogo, Electricista, etc." 
      />

      <InputField 
        label="Descripción" 
        id="description" 
        register={register} 
        error={errors.description} 
        placeholder="Incluye qué ofreces, especialidades y diferenciadores." 
      />

      <CheckBoxGroup 
        legend="Métodos de Pago" 
        options={paymentMethods.map((id) => ({ id, label: id }))} 
        register={register} 
      />

      <CheckBoxGroup 
        legend="General para todos los comercios" 
        options={general.map((id) => ({ id, label: id }))}
        register={register} 
      />

      <CheckBoxGroup 
        legend="Accesibilidad" 
        options={accessibility.map((id) => ({ id, label: id }))}
        register={register} 
      />

      <CheckBoxGroup 
        legend="Rubro gastronómico" 
        options={gastronomy.map((id) => ({ id, label: id }))}
        register={register} 
      />

      <CheckBoxGroup 
        legend="Conectividad y tecnología" 
        options={connectivity.map((id) => ({ id, label: id }))}
        register={register} 
      />

      <CheckBoxGroup 
        legend="Adicionales" 
        options={additional.map((id) => ({ id, label: id }))}
        register={register} 
      />

      <label htmlFor="coverPhoto" className={styles.label}>Foto de Portada</label>
      <input {...register("coverPhoto")} type="file" id="coverPhoto" accept="image/*" className={styles.fileInput} />

      <label htmlFor="gallery" className={styles.label}>Galería de Imágenes</label>
      <input {...register("gallery")} type="file" id="gallery" accept="image/*" multiple className={styles.fileInput} />

      <InputField 
        label="Horarios de apertura" 
        id="schedule" 
        register={register} 
        error={errors.schedule} 
        placeholder="Ejemplo: Lunes a Viernes de 8:00 am a 20:00 pm" 
      />

      <InputField 
        label="Localidad" 
        id="city" 
        register={register} 
        error={errors.city} 
        placeholder="Ejemplo: Villa Gesell" 
      />

      <InputField 
        label="Calle" 
        id="street" 
        register={register} 
        error={errors.street} 
        placeholder="Ejemplo: Avenida 3" 
      />

      <InputField 
        label="Número" 
        id="number" 
        register={register} 
        error={errors.number} 
        placeholder="Ejemplo: 398" 
      />

      <InputField 
        label="Teléfono" 
        id="phone" 
        register={register} 
        error={errors.phone} 
        placeholder="Sólo dígitos" 
      />

      <InputField 
        label="Página web" 
        id="web" 
        register={register} 
        error={errors.web} 
        placeholder="Opcional" 
      />

      <InputField 
        label="Instagram" 
        id="instagram" 
        register={register} 
        error={errors.instagram} 
        placeholder="Opcional" 
      />

      <button type="submit" className={styles.button}>Registrar Negocio</button>
    </form>
  );
};

export default BusinessForm;
