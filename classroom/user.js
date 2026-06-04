const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Hello User");
})
router.get("/:id",(req,res)=>{
    res.send("Hello user with id");
})
router.post("/:id",(req,res)=>{
    res.send("Hello user with post ");
})
router.delete("/:id",(req,res)=>{
    res.send("delete the  post ");
})

module.exports=router;
