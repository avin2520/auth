const db = require('./../3_Databases/mysql')
const passwordHasher = require('./../4_Helpers/hash')
// const nodemailer = require('nodemailer')
const transporter = require('./../4_Helpers/nodemailerTransporter')
const {createJwt,decodeToken} = require('./../4_Helpers/jwt')


function Register(req,res){
    const data = req.body//{email: blabla@blabla.com,password:123123}

    // check email availibility
    const sqlEmailCheck='select * from users where email=?;';
    db.query(sqlEmailCheck,data.email,(err,result)=>{
        try{
            if(err) throw err
            if(result.length > 0){
                res.json({
                    error : true,
                    message : "email not available"
                    
                })
            }else{
                  // available

                // hashing password
                const afterHashing = passwordHasher(data.password)
                data.password = afterHashing

                // post data to sql with status unverified email
                const sqlInsert = 'insert into users set ?;'
                db.query(sqlInsert, data, (err,result) => {
                    try{
                        if(err) throw err

                        const token = createJwt({email : data.email , id : result.insertId})

                        // send email verification to user
                        transporter.sendMail({
                            from : "Toko Berkah",
                            to : data.email,
                            subject : "VERIFY YOUR EMAIL NOW !!!",
                            html : `
                                <h1> Click Link <a href='http://localhost:3000/verify/${token}'> Here </a> to verify your email
                            `
                        }).then((response)=>{
                             res.json({
                                error : false,
                                message : "Register Success, Please Verify Your Account"
                            })

                        }).catch((err)=>{
                            console.log(err)
                        })                 
                    }catch(err){
                        res.json({
                            error : true,
                            message : err.message
                        })
                    }
                })                
            }
        }catch(err){
            res.json({
                error : true,
                message : err.message
                
            })

        }
    })
}

function forget(req,res){
    const data = req.body//{email: blabla@blabla.com}
    console.log(data.email)
    
    const sqlEmailCheck='select * from users where email=?;';
    db.query(sqlEmailCheck,data.email,(err,result)=>{
        try{
            //  console.log(result[0].id)
            if(err) throw err
            if(result.length === 0){
                res.json({
                    error : true,
                    message : "email not registered"                    
                })
            }           
            else{
                  // available         
                        const token = createJwt({email : data.email , id : result[0].id})

                        // send email verification to user
                        transporter.sendMail({
                            from : "Toko Berkah",
                            to : data.email,
                            subject : "VERIFY YOUR EMAIL NOW !!!",
                            html : `
                                <h1> Click Link <a href='http://localhost:3000/resetpassword/${token}'> Here </a> to verify your email
                            `
                        }).then((response)=>{
                             res.json({
                                error : false,
                                message : "Email Submitted Successfully, please kindly check your email to reset password"
                            })

                        }).catch((err)=>{
                            console.log(err)
                        })                             
            }
        }catch(err){
            res.json({
                error : true,
                message : err.message
                
            })

        }
    })
}

function testNodemailer(req,res){
    console.log('masuk')
    // let transporter = nodemailer.createTransport({
    //     service : 'gmail',
    //     auth : {
    //         user : 'airumma@gmail.com',
    //         pass:'isiwudanytyqpppx'
    //     },
    //     tls : {
    //         rejectUnauthorized : false
    //     }

    // })

    const mailOptions ={
        from : "Avinda K",
        to: "avinda628@gmail.com",
        subject:"verify your account",
        html :"<h1>Hello please verify your email<a href='google.com>here</a></h1>"
    }

    transporter.sendMail(mailOptions)
    .then((val)=>{
        console.log(val)
        res.json({
            error : false,
            message : "Email Successfully Sent"
        })
    })
    .catch((res)=>{
        console.log(res)
    })
}

function verify (req,res) {
    // const id = req.params.id
    const token = req.params.token
    const dataToken = decodeToken(token)
    console.log(dataToken)
    let sqlUpdate = `update users set verified = 1 where id = ? and where email=?`
    db.query(sqlUpdate,[dataToken.id, dataToken.email], (err,result) => {
        if(err) throw err
        res.json({
            error : false,
            message : "verify success"
        })
    })
}

function reset (req,res) {
    const data = req.body
    // console.log(data)
    // console.log(data.password)

    const afterHashing = passwordHasher(data.password)
    data.password  = afterHashing
    // console.log(data.password)

    const token = req.params.token
    const dataToken = decodeToken(token)
    // console.log(dataToken.id)

    let sqlUpdate = `update users set password = '${data.password}' where id = ?`
    db.query(sqlUpdate,dataToken.id, (err,result) => {
        // console.log('masuk')
        try{
            if(err) throw err
            res.json({
                error : false,
                message : "reset success"
            })           

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }

    })

}

function login (req,res){
    //ambil datanya pakai req
    const data = req.body // {password : 123123, email : fikri@fikri.com}
    //hash password
    const afterHashing = passwordHasher(data.password)
    data.password  = afterHashing
    //jalanin query
    // if user dan password ada res success
    // else res.failed
    let sql = 'select * from users where email = ? and password = ?;'
    db.query(sql, [data.email , data.password ] , (err,result) => {
        try{
            if(err) throw err
            if(result.length === 0) throw {error : true , message : "Password or Email Invalid"}
            if(result[0].verified === 0) throw {error : true,message : "Email Belum di Verifikasi, silahkan verifikasi terlebih dahulu"}
            const dataUser = result[0]
            const token =createJwt({id:dataUser.id,email:dataUser.email,role:dataUser.role})



            res.json({
                error : false,
                message : "Login Success",
                data : {id:dataUser.id,email:dataUser.email,role:dataUser.role},
                token : token
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}

module.exports = {
   Register : Register,
   testNodemailer : testNodemailer,
   verify : verify,
   login : login,
   forget : forget,
   reset : reset
}
