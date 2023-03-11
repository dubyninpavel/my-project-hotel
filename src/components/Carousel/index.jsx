import Slider from 'react-slick';
import { useWindowSize } from 'usehooks-ts';
import arrCarouselLink from '../../constant/arrCarouselLink';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './styles.module.css';

const Carousel = () => {
  const size = useWindowSize();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      size.width > 1000
        ? 3.4
        : size.width > 600
        ? 3
        : size.width > 400
        ? 2
        : 1.5,
    slidesToScroll: 2,
    initialSlide: 0,
  };

  return (
    <ul className={styles.carousel}>
      <Slider {...settings}>
        {arrCarouselLink.map((item, index) => (
          <li key={index}>
            <img className={styles.image} src={item} />
          </li>
        ))}
      </Slider>
    </ul>
  );
};

export default Carousel;
