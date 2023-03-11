import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FilterCheckbox from '../FilterCheckbox';
import {
  addFavoritesHotels,
  removeFavoritesHotels,
  addFavoritesHotelId,
  removeFavoritesHotelId,
} from '../../store/reducer/usersReducer';

import { ReactComponent as Star } from './icons/star.svg';
import styles from './styles.module.css';

const Card = ({
  index,
  name,
  selectedDate,
  hotelId,
  countDays,
  rating,
  price,
  startIcon,
  isCheckLike,
}) => {
  const [isCheck, setCheck] = useState(isCheckLike);
  const dispatch = useDispatch();
  const hotelsArr = useSelector((state) => state.user.foundHotels);
  const favoritesHotelId = useSelector((state) => state.user.favoritesHotelId);

  useEffect(() => {
    setCheck(isCheckLike);
  }, [favoritesHotelId]);

  const handleChange = () => {
    setCheck(!isCheck);

    if (isCheck) {
      dispatch(removeFavoritesHotelId(hotelId));
      dispatch(removeFavoritesHotels(hotelId));
    } else {
      const savedHotel = hotelsArr.find((hotel) => hotel.hotelId === hotelId);
      const copySavedHotel = {
        ...savedHotel,
        dateCheckIn: selectedDate,
        countDays,
      };

      dispatch(addFavoritesHotelId(hotelId));
      dispatch(addFavoritesHotels(copySavedHotel));
    }
  };

  return (
    <>
      <li key={index} className={styles.card}>
        <div className={styles.mainInfo}>
          {startIcon && <div className={styles.iconContainer}>{startIcon}</div>}
          <div className={styles.mainInfoContainer}>
            <div className={styles.cardTitleContainer}>
              <h2 className={styles.cardTitle}>{name}</h2>
              <FilterCheckbox
                id={index}
                value={isCheck}
                onChange={handleChange}
              />
            </div>
            <div className={styles.cardSubtitleContainer}>
              <p className={styles.selectedDate}>{selectedDate}</p>
              <hr className={styles.lineTitle} />
              <p className={styles.countDays}>{countDays}</p>
            </div>
            <div className={styles.starsContainer}>
              <div>
                <Star
                  className={cn(styles.star, {
                    [styles.starActive]: rating >= 1,
                  })}
                />
                <Star
                  className={cn(styles.star, {
                    [styles.starActive]: rating >= 2,
                  })}
                />
                <Star
                  className={cn(styles.star, {
                    [styles.starActive]: rating >= 3,
                  })}
                />
                <Star
                  className={cn(styles.star, {
                    [styles.starActive]: rating >= 4,
                  })}
                />
                <Star
                  className={cn(styles.star, {
                    [styles.starActive]: rating >= 5,
                  })}
                />
              </div>
              <div className={styles.priceContainer}>
                <h3 className={styles.priceName}>
                  Price:
                  <p className={styles.payment}>{`${price} ₽`}</p>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <hr className={styles.lineUnderCard} />
      </li>
    </>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  selectedDate: PropTypes.string,
  countDays: PropTypes.string,
  hotelId: PropTypes.number,
  rating: PropTypes.number,
  index: PropTypes.number,
  price: PropTypes.number,
  startIcon: PropTypes.object,
  isCheckLike: PropTypes.bool,
};

export default Card;
