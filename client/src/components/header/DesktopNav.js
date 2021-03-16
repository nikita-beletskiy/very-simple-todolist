import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ErrorsContext } from '../../contexts/ErrorsContext';

const Menu = ({ links }) => {
  const { updateErrors } = useContext(ErrorsContext);

  return links.map(({ label, href }) => (
    <Link key={href} to={href} onClick={() => updateErrors(null)}>
      {label}
    </Link>
  ));
};

export default Menu;
