import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axios";
import { useRouter } from "next/router";
import styles from "../../styles/LoginForm.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Eliminar errores automáticamente después de 5 segundos
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        clearErrors();
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [errors, clearErrors]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);

      if (response.data) {
        console.log("Usuario autenticado:", response.data);
        router.push("/business-form");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err.response?.data || err.message);

      if (err.response?.status === 400 || err.response?.status === 401) {
        const validationErrors = err.response.data.errors || [];
        validationErrors.forEach(({ field, message }) => {
          setError(field, { type: "manual", message });
        });
      } else if (err.response?.status === 403) {
        alert(err.response.data.message || "Usuario bloqueado. Intente más tarde.");
      } else if (err.response?.status === 404) {
        setError("username", {
          type: "manual",
          message: "El usuario no existe. Verifique los datos ingresados.",
        });
      } else {
        alert("Error desconocido, por favor intente más tarde.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <h1 className={styles.title}>Cotel</h1>
          <h2 className={styles.subtitle}>Publicidad en gesell.com.ar</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label className={styles.label}>
              
              <input
                {...register("username", {
                  required: "El nombre de usuario es obligatorio.",
                  minLength: {
                    value: 3,
                    message: "El nombre de usuario debe tener al menos 3 caracteres.",
                  },
                  maxLength:{
                    value:100,
                    message:"El nombre de usuario debe tener un máximo de 100 caracteres"
                  }
                })}
                type="text"
                placeholder="Nombre de usuario"
                className={`${styles.input} ${errors.username ? styles.errorInput : ""}`}
              />
              {errors.username && <p className={styles.error}>{errors.username.message}</p>}
            </label>

            <label className={styles.label}>
             
              <input
                {...register("password", {
                  required: "La contraseña es obligatoria.",
                  minLength:{
                    value:8,
                    message:'la contraseña debe contar con un mínimo de 8 caracteres'
                  },
                  maxLength:{
                    value:50,
                    message:'La contraseña debe contar con un máximo de 50 caracteres'
                  },
                })}
                type="password"
                placeholder="Contraseña"
                className={`${styles.input} ${errors.password ? styles.errorInput : ""}`}
              />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </label>

            <button type="submit" className={styles.button}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
