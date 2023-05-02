import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Welcome } from '../pages/Welcome';
import { Auth } from '../pages/Auth';
import { Graphi } from '../pages/Graphi';
import { Header } from './Header';
import { Footer } from './Footer';

export const App = () => {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/graphiQL' element={<Graphi />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
