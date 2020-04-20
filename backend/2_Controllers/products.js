const db = require('./../3_Databases/mysql')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function getAllProducts(req,res){
     const token = req.token
     try{
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        let sql = 'select * from products'
        db.query(sql,(err,result)=>{
            try{
                if(err) throw err
                res.json({
                    error : false,
                    data : result                        
                })

            }catch(err){
                res.json({
                    error : true,
                    message : err.message                      
                })
            }
        })
     }catch(err){
         console.log(err)
         res.json({
             error : true,
             message : "User not Authorized"                        
         })
     }
    // console.log(token)
    // res.send('sukses')
}

function postNewProduct(req,res){
    const token = req.token
    try{
        const dataDecoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(dataDecoded) // info user yang punya token // payload 
        if(dataDecoded.role !== 'admin') throw {message : "user must be admin"}

        const data = req.body
        let sql = 'insert into products set ?'
        db.query(sql, data,(err,result) => {
            try{
                if(err) throw err
                res.json({
                    error : false,
                    message : "Post Data Success"
                })
            }catch(err){
                res.json({
                    error : true,
                    message :err.message
                })
            }
        })

    }catch(err){
        res.json({
            error : true,
            message :err.message
        })
    }
}

module.exports={
    getAllProducts,
    postNewProduct
}