import styles from '../../styles/Businessform.module.css';

const CheckBoxGroup = ({ legend, options, register }) => {
    return (
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>{legend}</legend>
        <div className={styles.checkboxGroup}>
          {options.map((option) => (
            <label key={option.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                {...register(option.id)}
                value="true"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
    );
  };
export default CheckBoxGroup;

