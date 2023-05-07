import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { Graphi } from '../pages/Graphi';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Register } from '../pages/Register';
import { ResetPass } from '../pages/ResetPass';

export const App = () => {
  return (
    <>
      <Header />
      <section className='main'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/reset' element={<ResetPass />} />
          <Route path='/graphiQL' element={<Graphi />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </section>
      <Footer />
    </>
  );
};
