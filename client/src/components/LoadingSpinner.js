import { AiOutlineLoading } from 'react-icons/ai';
import globalStyles from '../styles/GlobalStyles.module.css';

const LoadingSpinner = ({ size }) => (
  <div className={globalStyles.loading}>
    <AiOutlineLoading size={size || '1em'} />
  </div>
);

export default LoadingSpinner;
