import React from 'react'
import Axios from 'axios'




class ResetPassword extends React.Component{ 
    onResetButtonClick=()=>{
        const token = window.location.pathname.split('/')[2]
        const password = this.refs.password.value
        const confirm = this.refs.confirm.value
        if(password && confirm){

            if(password === confirm){
                Axios.patch('http://localhost:9000/auth/reset/' + token, {password : password} )
                .then((res) => {
                    if(res.data.error === false){
                        alert(res.data.message)
                    }
                })
                .catch((err) => {               
                    alert(err.message)
                })

            }else if(password !== confirm){
                alert('input harus sama')
            }
            

        }else{
            alert('semua form harus terisi')
            
        }
        this.refs.password.value = ''
        this.refs.confirm.value = ''

    }

  render(){
    return(
      <div className='container pt-5'>
        <div className='row justify-content-center'> 
          <div className='col-md-4 card'>
            
            <div className='card-body'>
            
              <label>Reset Password</label>
              <input type='password' ref='password' placeholder='Enter New Password' className='form-control ' />
              <label>Confirm Password</label>
              <input type='password' ref='confirm' placeholder='Confirm New Password' className='form-control ' />
              <input type='button' onClick={this.onResetButtonClick}className='btn btn-outline-primary mt-3' value='reset'/> 
             
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ResetPassword;
