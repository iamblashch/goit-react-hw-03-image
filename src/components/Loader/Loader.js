import DotLoader from 'react-spinners/ClipLoader';
import css from './Loader.module.css';

export function Loader() {
  return (
    <div className={css.overlay}>
      <DotLoader size={250} color={'#461646'} className={css.loader} />
    </div>
  );
}