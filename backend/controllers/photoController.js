const photoController = {
    upload : async(req,res)=>{
        try{
            console.log(req.file)
            return res.json({message : "Uploaded"})
        }catch(err){
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = photoController