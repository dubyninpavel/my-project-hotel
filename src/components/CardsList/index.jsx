import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import Card from '../Card';
import styles from './styles.module.css';

const CardsList = ({
  className,
  hotelsArr,
  selectedDate,
  countDays,
  useUniqueKey,
  startIcon,
}) => {
  const favoritesHotelId = useSelector((state) => state.user.favoritesHotelId);

  return (
    <ul className={cn(styles.cardsListContainer, className)}>
      {hotelsArr.length > 0 &&
        hotelsArr.map((hotel, index) => (
          <Card
            key={useUniqueKey ? hotel.hotelId : index}
            index={useUniqueKey ? hotel.hotelId : index}
            hotelId={hotel.hotelId}
            name={hotel.hotelName}
            selectedDate={hotel.dateCheckIn ? hotel.dateCheckIn : selectedDate}
            countDays={hotel.countDays ? hotel.countDays : countDays}
            rating={Number(hotel.stars)}
            price={Math.round(hotel.priceAvg)}
            startIcon={startIcon}
            isCheckLike={
              !!favoritesHotelId.find((hotelId) => hotelId === hotel.hotelId)
            }
          />
        ))}
    </ul>
  );
};

CardsList.propTypes = {
  className: PropTypes.string,
  hotelsArr: PropTypes.array,
  selectedDate: PropTypes.string,
  countDays: PropTypes.string,
  useUniqueKey: PropTypes.bool,
  startIcon: PropTypes.object,
};

export default CardsList;
