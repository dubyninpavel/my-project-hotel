import { Link } from 'react-router-dom';
import pageNotFoundImg from '../../images/page_not_found.jpg';
import pageNotFoundStyles from './styles.module.css';

const PageNotFound = () => (
  <section className={pageNotFoundStyles.pagenotfound}>
    <img
      className={pageNotFoundStyles.image}
      src={pageNotFoundImg}
      alt='страница не найдена'
    />
    <p className={pageNotFoundStyles.subtitle}>
      Извините, но такой страницы нет на нашем сайте на нашем сайте. <br />
      Возможно вы ввели неправильный адрес или страница была удалена. <br />
      Попробуйте вернуться на
      <Link className={pageNotFoundStyles.link} to='/'>
        Гланую страницу
      </Link>
    </p>
  </section>
);

export default PageNotFound;
