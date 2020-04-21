import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'




class Login extends React.Component{
  state={
    loading : false , data : null,days: 0
}
onLoginBtnClick = () => {
  this.setState({loading : true})    
  const new_date = new Date ()    
  
  const email = this.refs.email.value
  const password = this.refs.password.value
 
  const data = {
      email,
      password,
      time : new_date,
      //  days : this.state.days
  }
  if(email && password){
      Axios.post('http://localhost:9000/auth/login' , data)
      .then((res) => {
          
          console.log(res.data)
          this.setState({data : res.data.data})

          const date2 = new Date(`${new_date}`)
          console.log(date2)
          // const date1= new Date(`${this.state.data.time}`)
          const date1= new Date(`2020-04-10T19:41:53.222Z`)
          console.log(date1)
          const interval = date2.getTime()- date1.getTime()
          const different_in_days= interval/(1000*3600*24)
          this.setState({days : different_in_days})
          console.log(this.state.days)

          localStorage.setItem('token' ,res.data.token)
          if(this.state.days <= 7){
            window.location = '/product-list'
            alert(res.data.message)

          }else{
            alert('check your email to insert token for login')
          }

       

         

      })
      .catch((err) => {
          alert(err.message)
      })
  }else{
      alert("All form must be filled")
  }


  
  this.setState({loading : false})
  this.refs.email.value = ''
this.refs.password.value = ''
}

  render(){
    return(
      <div className='container pt-5'>
        <div className='row justify-content-center'> 
          <div className='col-md-4 card'>
            <h5 class="card-title">Login</h5>
            <div className='card-body'>
              <label>Email</label>
              <input type='text' ref='email' placeholder='Masukkan Username' className='form-control' />
              <label>Password</label>
              <input type='password' ref='password' placeholder='Masukkan Password' className='form-control ' />
              {
                    this.state.loading === false ?
                        <button onClick={this.onLoginBtnClick} className='btn btn-outline-primary mt-3 mb-3'>Login</button>
                        :
                        <button disabled className='btn btn-outline-primary mt-3 mb-3'>loading ...</button>
              }
              <Link to='/forgotpassword'>
              <h6>Forgot Your Password?</h6>
              </Link>
              {/* <input type='button' className='btn btn-outline-primary mt-3' value='login'/> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Login;
