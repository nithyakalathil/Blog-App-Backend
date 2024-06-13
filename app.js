const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcryptjs")
const {blogmodel}=require("./models/blog")


const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://nithya:nithya913@cluster0.r7eo1il.mongodb.net/blogsDB?retryWrites=true&w=majority&appName=Cluster0")


const generateHashedPassword = async(password)=>{
 
    const salt=await bcrypt.genSalt(10) 

    return bcrypt.hash(password,salt)

}

 

app.use("/signup",async (req,res)=>{
let input=req.body
let hasedpassword=await generateHashedPassword(input.password)
console.log(hasedpassword)
input.password=hasedpassword
let blog = new blogmodel(input)
blog.save()
    res.json({status:"Success"})
})


app.listen(8081,()=>{
    console.log("server started")
}) 