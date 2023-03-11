import { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addUser } from '../../store/reducer/usersReducer';
import loginBg from '../../images/login_bg.png';
import styles from './styles.module.css';

const LoginAuthSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите корректный email')
    .required('Логин не может быть пустым'),
  password: Yup.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/^[^а-яё]+$/iu, 'Пароль не должен содержать кириллицу')
    .required('Пароль не может быть пустым'),
});

const LoginPage = ({
  setLoggedIn,
  localStorageUsers,
  setLocalStorageUsers,
  setCurrentUser,
}) => {
  const [errorPassword, setErrorPassword] = useState(false);
  const dispatch = useDispatch();

  return (
    <section className={styles.login}>
      <img src={loginBg} className={styles.bgImage} />
      <div className={styles.container}></div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginAuthSchema}
        onSubmit={(values) => {
          const { email, password } = values;
          const findUser = localStorageUsers.find(
            (user) => user.email === email,
          );

          if (findUser) {
            if (findUser.password === password) {
              setLoggedIn(true);
              setErrorPassword(false);
            } else {
              setErrorPassword(true);
            }
          } else {
            setLocalStorageUsers((previousValue) => [
              ...previousValue,
              {
                email,
                password,
                favoritesHotels: [],
              },
            ]);
            setCurrentUser({ email, password });
            dispatch(addUser({ email, password }));
          }
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
            <h1 className={styles.title}>Simple Hotel Check</h1>
            <Input
              className={styles.formInput}
              name='email'
              label='Логин'
              type='email'
              isAuth={true}
              value={values.email}
              errors={errors.email}
              touched={touched.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <Input
              className={styles.formInput}
              name='password'
              label='Пароль'
              type='password'
              isAuth={true}
              values={values.password}
              errors={errors.password}
              touched={touched.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {errorPassword && (
              <p className={styles.errorPassword}>Неверный пароль</p>
            )}
            <Button
              className={styles.formButton}
              type='submit'
              variant='contained'
              disabled={
                !(
                  !errors.email &&
                  !errors.password &&
                  touched.email &&
                  touched.password
                )
              }
              onClick={handleSubmit}
            >
              Войти
            </Button>
          </form>
        )}
      </Formik>
    </section>
  );
};

LoginPage.propTypes = {
  setLoggedIn: PropTypes.func,
  localStorageUsers: PropTypes.array,
  setLocalStorageUsers: PropTypes.func,
  setCurrentUser: PropTypes.func,
};

export default LoginPage;
