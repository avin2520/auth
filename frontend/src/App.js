import React from 'react';
import './App.css';
import {Route,BrowserRouter} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import VerificationSuccess from './pages/VerificationSuccess';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductList from './pages/ProductList';
import VerifyCode from './pages/verifycode';

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
      <Route path='/' exact>
        <div>
          Hello World
        </div>
      </Route>
      <Route path='/register'>
        <Register/>
      </Route>
      <Route path='/login'>
        <Login/>
      </Route>
      <Route path='/verify'>
        <VerificationSuccess/>
                

      </Route>
      <Route path='/forgotpassword'>
        <ForgotPassword/>

      </Route>
      <Route path='/resetpassword'>
        <ResetPassword/>

      </Route>
      <Route path = '/product-list'>
        <ProductList/>
      </Route>

      <Route path = '/verifycode'>
        <VerifyCode/>
      </Route>
     
      </BrowserRouter>



     
    )
  }
}

export default App;