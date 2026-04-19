const express = require('express')
const fs = require('fs/promises')
const multer = require('multer')

const upload =multer({dest:'images'})
const router = express.Router()
const pool = require('./../db/pool')
const createResult = require('./../utils/result')




router.get('/menu',async (req,res)=>{
    const sql = 'SELECT * FROM food'
    try{
        const data = await pool.query(sql)
        

        res.send(createResult(data[0]))
    }
    catch(error){
        res.send("not Done !!")
    }
})

router.post('/', upload.single('image'), async (req,res)=>{
    const { name, description, price ,image } = req.body
    const file = req.file
    console.log(req.file)
    const sql = `INSERT INTO food(name,description,price,image) VALUES(?,?,?,?)`
    try {
        await fs.rename(file.path, 'images/' + file.originalname)
        const data = await pool.query(sql, [name, description, price, file.originalname])
        res.send(createResult(data[0]))
    } catch (error) {
        res.send(createResult(null, error))
    }
})




module.exports=router