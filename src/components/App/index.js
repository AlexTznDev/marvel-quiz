
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../../App.css';
import Header from '../Header/Index';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';
import ErrorPage from '../ErrorPage';
import ForgetPasword from '../ForgetPassword';
import { IconContext } from 'react-icons'

function App() {
  return (
    <Router>

      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header></Header>


        <Routes>

          <Route exact path='/' element={<Landing />}></Route>
          <Route path='/Welcome' element={<Welcome />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/ForgetPasword' element={<ForgetPasword />}></Route>
          <Route path='*' element={<ErrorPage />}></Route>

        </Routes>

        <Footer></Footer>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
