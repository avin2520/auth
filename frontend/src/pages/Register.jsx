import React from 'react'
import Axios from 'axios'




class Register extends React.Component{
  state={
    loading : false
  }
  onRegisterClick = () => {
    this.setState({loading : true})
    const email = this.refs.email.value
    const password = this.refs.password.value
    const confirm = this.refs.confirm.value

    if(email && password && confirm){
        console.log('masuk')
        if(password === confirm){
            console.log('masuk')
            Axios.post('http://localhost:9000/auth/register' , {email : email,password : password})
            .then((res) => {
                console.log(res)
                if(res.data.error === false){
                    alert(res.data.message)
                }else if(res.data.error === true){
                  alert(res.data.message)
                }

            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('password dan konfirm harus sama')
        }
    }else{
        alert('semua form harus terisi')
    }

    
    this.refs.email.value = ''
    this.refs.password.value = ''
    this.refs.confirm.value = ''
    this.setState({loading : false})
}

  render(){
    return(
      <div className='container pt-5'>
        <div className='row justify-content-center'> 
          <div className='col-md-4 card'>
            <h5 class="card-title">Register</h5>
            <div className='card-body'>
              <label>Username</label>
              <input type='text' ref='email' placeholder='Email' className='form-control' />
              <label>Password</label>
              <input type='password' ref='password' placeholder='Enter Password' className='form-control ' />
              <label>Confirm Password</label>
              <input type='password' ref='confirm' placeholder='Confirm Your Password' className='form-control ' />
              {
                    this.state.loading === false ?
                      <button onClick={this.onRegisterClick} className='btn btn-outline-primary mt-3'>Register</button>
                      :
                      <button disabled className='btn btn-outline-primary mt-3'>Register</button>
              }

              
              {/* <input type='button' onClick={this.onRegisterClick} className='btn btn-outline-primary mt-3' value='submit'/> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Register;
