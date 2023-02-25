
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const GalleryItem = ({ webformatURL,largeImageURL, onClick}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt=""
        onClick={() => onClick(largeImageURL)}
     
      />
    </li>
  );
};

GalleryItem.propTypes = {
  webformatURL:PropTypes.string.isRequired,
  largeImageURL:PropTypes.string.isRequired,
  onClick:PropTypes.func.isRequired,
}
