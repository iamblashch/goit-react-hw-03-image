import PropTypes from 'prop-types'
import css from './Button.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.Button}>
      Load more
    </button>
  );
};

export default LoadMoreBtn

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired
}