import { AiOutlineLoading } from 'react-icons/ai';

const LoadingSpinner = ({ size }) => (
  <div className='loading'>
    <AiOutlineLoading size={size || '1.5em'} />
  </div>
);

export default LoadingSpinner;
