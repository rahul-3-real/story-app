import { Routes, Route } from 'react-router-dom';
import { Home, Login, Register, Stories } from './modules/pages';
import { Main } from './modules/base';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path='/' element={<Home />} />
          <Route path='/stories' element={<Stories />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;