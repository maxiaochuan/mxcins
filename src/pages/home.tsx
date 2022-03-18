import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '../.mx/routes';

const Home: React.FC = () => {
  return (
    <>
      HOME
      {routes[0].routes?.map(
        row =>
          row.path && (
            <div>
              <Link style={{ color: 'blue' }} key={row.path} to={row.path}>
                {row.path}
              </Link>
            </div>
          ),
      )}
    </>
  );
};

export default Home;
