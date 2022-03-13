import * as React from 'react';
import { Link } from 'react-router-dom';
import { conf } from '../routes';

const Home: React.FC = () => {
  return <>HOME
  {conf[0].children?.map(row => row.path && (
    <div>
      <Link style={{ color: 'blue' }} key={row.path} to={row.path}>{row.path}</Link>
    </div>
  ))}
  </>
}

export default Home;
