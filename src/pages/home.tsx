import * as React from 'react';
import { Link } from 'react-router-dom';
import routes from '../.mx/routes';

const Home: React.FC = () => {
  return (
    <>
      HOME
      {routes[0].routes?.map(
        (row, i) =>
          row.path && (
            <div key={row.path || `p-${i}`}>
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
