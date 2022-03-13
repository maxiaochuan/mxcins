import * as React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return <>HOME
  <Link to="/components/button">[components/button]</Link>
  <Link to="/webapi">[webapi]</Link>
  </>
}

export default Home;
