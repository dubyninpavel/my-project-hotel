import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  sortFavoritesHotelsDescending,
  sortFavoritesHotelsAscending,
} from '../../store/reducer/usersReducer';
import { ReactComponent as SelectUpIcon } from './icons/selectUp.svg';
import { ReactComponent as SelectDownIcon } from './icons/selectDown.svg';
import styles from './styles.module.css';

const FilterButton = ({
  type = 'button',
  sortParameter,
  disabled,
  children,
}) => {
  const [stateFilter, setStateFilter] = useState('off');
  const dispatch = useDispatch();

  const handleClick = () => {
    if (stateFilter === 'off') {
      dispatch(sortFavoritesHotelsDescending(sortParameter));
      setStateFilter('ascending');
    } else if (stateFilter === 'ascending') {
      dispatch(sortFavoritesHotelsAscending());
      setStateFilter('descending');
    } else {
      setStateFilter('off');
    }
  };

  return (
    <button
      className={cn(styles.filterButton, {
        [styles.buttonActive]: !(stateFilter === 'off'),
        [styles.buttonError]: !!disabled,
      })}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      <div className={styles.selectIconContainer}>
        <SelectUpIcon
          className={cn(styles.select, {
            [styles.selectActive]: stateFilter === 'ascending',
            [styles.selectInactive]: stateFilter === 'descending',
          })}
        />
        <SelectDownIcon
          className={cn(styles.select, {
            [styles.selectActive]: stateFilter === 'descending',
            [styles.selectInactive]: stateFilter === 'ascending',
          })}
        />
      </div>
    </button>
  );
};

FilterButton.propTypes = {
  type: PropTypes.string,
  sortParameter: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default FilterButton;
