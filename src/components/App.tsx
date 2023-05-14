import { Route, Routes } from 'react-router-dom';

import { NotFound } from '../pages/NotFound';
import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { Graphi } from '../pages/Graphi';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Register } from '../pages/Register';
import { ResetPass } from '../pages/ResetPass';

import { Paths } from '../enums/Paths';

export const App = () => {
  return (
    <>
      <Header />
      <section className='main'>
        <Routes>
          <Route path={Paths.ROOT} element={<Welcome />} />
          <Route path={Paths.LOGIN} element={<Login />} />
          <Route path={Paths.REGISTER} element={<Register />} />
          <Route path={Paths.RESET} element={<ResetPass />} />
          <Route path={Paths.GRAPH} element={<Graphi />} />
          <Route path={Paths.ANY} element={<NotFound />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
};
