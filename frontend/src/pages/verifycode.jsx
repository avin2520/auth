import React from 'react'
import Axios from 'axios'




class VerifyCode extends React.Component{ 
    onVerifyCodeClick=()=>{
        const token = window.location.pathname.split('/')[2]
        const code= this.refs.code.value
        const confirm = this.refs.confirm.value
        if(code && confirm){

            if(code === confirm){
                Axios.post('http://localhost:9000/auth/verifycode/' + token, {code : code} )
                .then((res) => {
                    console.log(res.data)
                    if(res.data.error === false){
                        localStorage.setItem('token' ,res.data.token)
                        alert(res.data.message)
                        window.location = '/product-list'

                    }
                    if(res.data.error === true){
                        alert(res.data.message)                      
                    }
                })
                .catch((err) => {               
                    alert(err.message)
                })

            }else if(code !== confirm){
                alert('input harus sama')
            }
            

        }else{
            alert('semua form harus terisi')
            
        }
        this.refs.code.value = ''
        this.refs.confirm.value = ''

    }

  render(){
    return(
      <div className='container pt-5'>
        <div className='row justify-content-center'> 
          <div className='col-md-4 card'>
            
            <div className='card-body'>
            
              <label>Input Code</label>
              <input type='password' ref='code' placeholder='Enter Code' className='form-control ' />
              <label>Confirm Code</label>
              <input type='password' ref='confirm' placeholder='Confirm Code' className='form-control ' />
              <input type='button' onClick={this.onVerifyCodeClick}className='btn btn-outline-primary mt-3' value='login'/> 
             
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default VerifyCode;
