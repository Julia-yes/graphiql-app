import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Loading } from './Loading/Loading';

import { Paths } from '../enums/Paths';

const NotFound = lazy(() => import('../pages/NotFound'));
const Welcome = lazy(() => import('../pages/Welcome'));
const Login = lazy(() => import('../pages/Login'));
const Graphi = lazy(() => import('../pages/Graphi'));
const Register = lazy(() => import('../pages/Register'));
const ResetPass = lazy(() => import('../pages/ResetPass'));

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading type={'spinningBubbles'} color={'#1b2240'} />}>
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
      </Suspense>
      <Footer />
    </>
  );
};
