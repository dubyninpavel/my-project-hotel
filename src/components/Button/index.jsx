import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.css';

const Button = ({
  className,
  type = 'button',
  variant = 'contained',
  endIcon,
  children,
  disabled = false,
  onClick,
}) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className={cn(styles.button, className, {
        [styles[variant]]: !!variant,
        [styles.buttonError]: !!disabled,
      })}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      {endIcon && <div className={styles.endIconContainer}>{endIcon}</div>}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  endIcon: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
