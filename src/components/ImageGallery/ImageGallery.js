import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const GalleryList = ({ pictures, onClickImg }) => {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => (
        <GalleryItem
          onClick={onClickImg}
          largeImageURL={picture.largeImageURL}
          key={picture.id}
          webformatURL={picture.webformatURL}
        />
      ))}
    </ul>
  );
};

GalleryList.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  onClickImg: PropTypes.func.isRequired,
};
