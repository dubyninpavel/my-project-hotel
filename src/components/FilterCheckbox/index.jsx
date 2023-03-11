import propTypes from 'prop-types';
import cn from 'classnames';
import { ReactComponent as LikeIcon } from './icons/like.svg';
import styles from './styles.module.css';

const FilterCheckbox = ({ id, value, onChange }) => {
  const handleChange = () => {
    onChange();
  };

  return (
    <div className={styles.filtercheckbox}>
      <input
        className={styles.input}
        type='checkbox'
        id={id}
        checked={value}
        onChange={handleChange}
      />
      <label className={styles.label} htmlFor={id}>
        {''}
        <LikeIcon
          className={cn(styles.like, {
            [styles.likeActive]: value,
          })}
        />
      </label>
    </div>
  );
};

FilterCheckbox.propTypes = {
  id: propTypes.number,
  value: propTypes.bool,
  onChange: propTypes.func,
};

export default FilterCheckbox;
