import React, { Component } from 'react'
import Axios from 'axios'
import SuccessIcon from '../images/success.png'
import ErrorIcon from'../images/error.png'

export default class VerificationSuccess extends Component {
    state = {error : null}
    // get id 2
    // jalanin api update verified = 1 where id=2
    componentDidMount(){
        const token = window.location.pathname.split('/')[2]
        // console.log(id)
        Axios.patch('http://localhost:9000/auth/verify/' + token)
        .then((res) => {
            if(res.data.error === false){
                alert(res.data.message)
            }else{
                this.setState({error : true})
            }
        })
        .catch((err) => {
            this.setState({error : true})
            alert(err.message)
        })
    }
    render() {
        return (
            // <div className='container'>
            //     <h1 className='text-center'>
            //         Verification Success
            //     </h1>
            // </div>
            <div className='container' style={{height : '80vh'}}>
                <div className="row justify-content-center align-items-center h-100">
                    {
                        this.state.error ?
                        <div className="col-md-3">
                            <h1 className='text-center'>
                                Verification Error
                            </h1>
                            <img alt='icon' width='100%' src={ErrorIcon}></img>
                        </div>

                        :
                        <div className="col-md-3">
                            <h1 className='text-center'>
                                Verification Success
                            </h1>
                            <img alt='icon' width='100%' src={SuccessIcon}></img>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
}