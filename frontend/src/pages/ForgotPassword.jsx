import React from 'react'
import Axios from 'axios'




class ForgotPassword extends React.Component{ 
    onSubmitButtonClick = () =>{
        const email = this.refs.email.value
        if(email){
            Axios.post('http://localhost:9000/auth/forget' , {email : email})
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
            alert('email harus diisi')
        }

        this.refs.email.value = ''
    
    }

  render(){
    return(
      <div className='container pt-5'>
        <div className='row justify-content-center'> 
          <div className='col-md-4 card'>
           
            <div className='card-body'>
              <label>Masukkan Email Anda</label>
              <input type='text' ref='email' placeholder='Email' className='form-control' />
               <input type='button' onClick={this.onSubmitButtonClick} className='btn btn-outline-primary mt-3' value='submit'/> 
             
             
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ForgotPassword;
