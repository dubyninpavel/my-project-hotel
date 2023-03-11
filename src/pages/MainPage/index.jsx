import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Carousel from '../../components/Carousel';
import FilterButton from '../../components/FilterButton';
import CardsList from '../../components/CardsList';
import dateMonth from '../../constant/dateMonth';
import {
  correctEndingHotels,
  correctEndingDays,
} from '../../constant/correctWordEndings';
import {
  correctEndingHotelsArr,
  correctEndingDaysArr,
} from '../../constant/constants';
import { ReactComponent as SignOutIcon } from '../../icons/logout.svg';
import { ReactComponent as VectorIcon } from '../../icons/vectorInCity.svg';
import { ReactComponent as HotelIcon } from '../../icons/hotelIcon.svg';
import styles from './styles.module.css';

const SearchHotelSchema = Yup.object().shape({
  location: Yup.string().required('Необходимо указать город'),
  dateCheckIn: Yup.date('Необходиом указать в формате даты').required(
    'Необходимо указать дату заселения',
  ),
  countDays: Yup.number()
    .min(1, 'Минимальный период 1 день')
    .integer('Укажите целое количество дней')
    .required('Укажите количество дней'),
});

const MainPage = ({ setCurrentUser }) => {
  const checkInDate = new Date();
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [selectedDateYear, setSelectedDateYear] = useState(
    `${checkInDate.getFullYear()}`,
  );
  const [selectedDateMonth, setSelectedDateMonth] = useState(
    `${
      checkInDate.getMonth() + 1 > 9
        ? `${checkInDate.getMonth() + 1}`
        : `0${checkInDate.getMonth() + 1}`
    }`,
  );
  const [selectedDateDay, setSelectedDateDay] = useState(
    `${
      checkInDate.getDate() > 9
        ? `${checkInDate.getDate()}`
        : `0${checkInDate.getDate()}`
    }`,
  );
  const [numberDaysOfStay, setNumberDaysOfStay] = useState(1);
  const selectedDate = `${selectedDateDay} ${dateMonth[selectedDateMonth]} ${selectedDateYear}`;
  const dispatch = useDispatch();
  const hotelsArr = useSelector((state) => state.user.foundHotels);
  const favoritesHotelsArr = useSelector((state) => state.user.favoritesHotels);
  const errorApi = useSelector((state) => state.user.errors);

  useEffect(() => {
    dispatch({
      type: 'getHotels',
      payload: {
        location: selectedCity,
        checkInDate: `${selectedDateYear}-${selectedDateMonth}-${selectedDateDay}`,
        checkOutDate: `${selectedDateYear}-${selectedDateMonth}-${selectedDateDay}`,
      },
    });
  }, []);

  const signOut = () => {
    setCurrentUser({});
  };

  return (
    <>
      <section className={styles.header}>
        <h1 className={styles.headerTitle}>Simple Hotel Check</h1>
        <Button
          type='submit'
          variant='pure'
          disabled={false}
          endIcon={<SignOutIcon />}
          onClick={signOut}
        >
          Выйти
        </Button>
      </section>
      <section className={styles.main}>
        <div className={styles.containerInfo}>
          <div className={styles.containerForm}>
            <Formik
              initialValues={{
                location: `${selectedCity}`,
                dateCheckIn: `${selectedDateYear}-${selectedDateMonth}-${selectedDateDay}`,
                countDays: `${numberDaysOfStay}`,
              }}
              validationSchema={SearchHotelSchema}
              onSubmit={(values) => {
                const { location, dateCheckIn, countDays } = values;

                setSelectedCity(location);

                const dateCheckInArr = dateCheckIn.split('-');
                setSelectedDateYear(dateCheckInArr[0]);
                setSelectedDateMonth(dateCheckInArr[1]);
                setSelectedDateDay(dateCheckInArr[2]);

                setNumberDaysOfStay(Number(countDays));

                const checkOutDate = new Date(dateCheckIn);
                checkOutDate.setDate(
                  checkOutDate.getDate() + Number(countDays),
                );

                const dateCheckOut = `${checkOutDate.getFullYear()}-${
                  checkOutDate.getMonth() + 1 > 9
                    ? `${checkOutDate.getMonth() + 1}`
                    : `0${checkOutDate.getMonth() + 1}`
                }-${
                  checkOutDate.getDate() > 9
                    ? `${checkOutDate.getDate()}`
                    : `0${checkOutDate.getDate()}`
                }`;

                dispatch({
                  type: 'getHotels',
                  payload: {
                    location,
                    checkInDate: dateCheckIn,
                    checkOutDate: dateCheckOut,
                  },
                });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <Input
                    className={styles.formInput}
                    name='location'
                    label='Локация'
                    type='text'
                    isAuth={false}
                    values={values.location}
                    errors={errors.location}
                    touched={touched.location}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <Input
                    className={styles.formInput}
                    name='dateCheckIn'
                    label='Дата заселения'
                    type='date'
                    isAuth={false}
                    values={values.dateCheckIn}
                    errors={errors.dateCheckIn}
                    touched={touched.dateCheckIn}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <Input
                    className={styles.formInput}
                    name='countDays'
                    label='Количество дней'
                    type='number'
                    isAuth={false}
                    values={`${values.countDays}`}
                    errors={errors.countDays}
                    touched={touched.countDays}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <Button
                    className={styles.formButton}
                    type='submit'
                    variant='contained'
                    disabled={
                      !(
                        !errors.location &&
                        !errors.dateCheckIn &&
                        !errors.countDays
                      )
                    }
                    onClick={handleSubmit}
                  >
                    Найти
                  </Button>
                </form>
              )}
            </Formik>
          </div>
          <div className={styles.favourites}>
            <h2 className={styles.favouritesTitle}>Избранное</h2>
            <div className={styles.favouritesFilter}>
              <FilterButton
                sortParameter='stars'
                disabled={favoritesHotelsArr.length === 0}
              >
                Рейтинг
              </FilterButton>
              <FilterButton
                sortParameter='priceAvg'
                disabled={favoritesHotelsArr.length === 0}
              >
                Цена
              </FilterButton>
            </div>
            <CardsList
              className={styles.cardListFavouriteHotels}
              hotelsArr={favoritesHotelsArr}
              selectedDate={selectedDate}
              countDays={`${numberDaysOfStay} ${correctEndingDays(
                numberDaysOfStay,
                correctEndingDaysArr,
              )}`}
              useUniqueKey={false}
            />
          </div>
        </div>
        <div className={styles.containerHotels}>
          <div className={styles.containerHotelsHeader}>
            <div className={styles.containerHotelsHeaderInfo}>
              <h2 className={styles.containerHotelsTitle}>Отели</h2>
              <VectorIcon className={styles.vectorIcon} />
              <h2 className={styles.containerHotelsTitle}>{selectedCity}</h2>
            </div>
            <h2 className={styles.containerHotelsTitleDate}>{selectedDate}</h2>
          </div>
          <Carousel />
          <h2 className={styles.countFavouritesTitle}>
            Добавлено в Избранное:{' '}
            <p className={styles.countFavouritesNumber}>
              {favoritesHotelsArr.length}
            </p>
            {correctEndingHotels(
              favoritesHotelsArr.length,
              correctEndingHotelsArr,
            )}
          </h2>
          {errorApi ? (
            <h3 className={styles.errApi}>
              {errorApi}
            </h3>
          ) : (
            <CardsList
              className={styles.cardListFoundHotels}
              hotelsArr={hotelsArr}
              selectedDate={selectedDate}
              countDays={`${numberDaysOfStay} ${correctEndingDays(
                numberDaysOfStay,
                correctEndingDaysArr,
              )}`}
              useUniqueKey={true}
              startIcon={<HotelIcon />}
            />
          )}
        </div>
      </section>
    </>
  );
};

MainPage.propTypes = {
  setCurrentUser: PropTypes.func,
  localStorageUsers: PropTypes.array,
};

export default MainPage;
