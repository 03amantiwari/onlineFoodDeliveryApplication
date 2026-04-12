const express = require('express')
const app = express()
const cors = require('cors')


const userRouter = require('./routes/user')
const foodRouter = require('./routes/food')
const authUser = require('./utils/auth')


//middlewares
app.use(express.json())
app.use(cors())
app.use( '/foodImage', express.static('images'))
app.use(authUser)

//routes
app.use('/user',userRouter)
app.use('/food',foodRouter)




app.listen(4000,'0.0.0.0',()=>{
    console.log("express start server is start listening at port no 4000 at local host ........")
})