import { Link } from 'react-router-dom';

const Menu = ({ links }) =>
  links.map(({ label, href }) => (
    <Link className='mx-1' key={href} to={href}>
      {label}
    </Link>
  ));

export default Menu;
