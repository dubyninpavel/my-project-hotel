import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.css';

const Input = ({
  className,
  name,
  label,
  type = 'text',
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => (
  <>
    <label
      className={cn(styles.label, className, {
        [styles.errorLabel]: errors && touched,
      })}
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className={cn(styles.input, {
        [styles.errorInput]: errors && touched,
      })}
      type={type}
      name={name}
      id={name}
      value={values}
      onChange={handleChange}
      onBlur={handleBlur}
      required
    />
    {errors && touched && <p className={styles.error}>{errors}</p>}
  </>
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.string,
  errors: PropTypes.string,
  touched: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
};

export default Input;
