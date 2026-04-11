const express = require('express')
const router = express.Router()
const pool=require('./../db/pool')
const result = require('./../utils/result')
const createResult = require('./../utils/result')
const config = require('./../utils/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




router.post('/signup',async (req,res)=>{
    const {name,email,password,phone} = req.body
    const sql ='INSERT INTO users(name,email,password,phone) VALUES (?,?,?,?)'
    try{
        const hashPassword=await bcrypt.hash(password,config.SALT_ROUNDS)
        const data =await pool.query(sql,[name,email,hashPassword,phone])
        res.send(createResult(data[0]))   
    } catch (error) {
        res.send(createResult(null,error))
    }
})

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body
    const sql = 'SELECT * FROM users WHERE email = ?'
    try{
        const data = await pool.query(sql,[email])
        const sql_data =data[0][0]
        // console.log(sql_data)
        if(sql_data){
            const status = await bcrypt.compare(password,sql_data.password)
            if(status){
                const payload = {
                    uid:sql_data.uid
                }
                const token = jwt.sign(payload,config.SECRET)

                const user ={
                    token,
                    phone:sql_data.phone
                }
                res.send(createResult(user))
            }
            res.send(createResult(null,'Invalid Password'))
        }
        res.send(createResult(null,'Invalid Email'))
    }
    catch(error){
        res.send(createResult(null,error))
    }
})

router.get('/',async (req,res)=>{
    const uid =req.headers.uid
    const sql = 'SELECT name ,email,phone FROM users WHERE uid =?'
    try {
        const data = await pool.query(sql,[uid])
        res.send(createResult(data[0][0]))
    } catch (error) {
        res.send(createResult(null,error))
    }
})

router.put('/',async(req,res)=>{
    const {phone}=req.body
    const uid = req.headers.uid
    const sql = 'UPDATE users SET phone = ? WHERE uid = ?'
    try{
        const data = await pool.query(sql,[phone,uid])
        // console.log(data)
        const [user] = data
        res.send(createResult(user))
    }
    catch(error){
        res.send(createResult(null,error))
    }
})

router.delete('/',async (req,res)=>{
    const uid = req.headers.uid
    const sql = 'DELETE FROM users WHERE uid = ?'
    try{
        const data = await pool.query(sql,[uid])
        const [user] = data
        res.send(createResult(user))
    }
    catch(error){
        res.send(createResult(null,error))
    }
})

module.exports=router