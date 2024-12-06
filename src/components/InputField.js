import styles from "../../styles/Businessform.module.css";
const InputField = ({ label, id, register, error, placeholder, type = "text" }) => (
    <div>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input {...register(id)} id={id} type={type} placeholder={placeholder} className={styles.input} />
      {error && <p>{error.message}</p>}
    </div>
  );
  
  export default InputField;