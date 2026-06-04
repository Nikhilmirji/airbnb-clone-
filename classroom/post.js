const express=require("express");
const router=express.Router();

router.get("/post",(req,res)=>{
    res.send("Hello User wiht post");
})
router.get("/post/:id",(req,res)=>{
    res.send("post with an id");
})
router.post("/post/:id",(req,res)=>{
    res.send("osama bin laden");
})
router.delete("/post/:id",(req,res)=>{
    res.send("delete the  post ");
})

module.exports=router;
