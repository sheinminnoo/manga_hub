const Contact = require("../models/Contact");

const ContactController = {

    getContactMessage : async(req,res)=>{
        try{
            if(req.user.role==="CEO" || req.user.role==="admin" ){
                let messages = await Contact.find(null,['username','message','profile','createdAt']);
                return res.json(messages).status(200)
            }
        }catch(error){
            return res.send({message: "Internet Server Error!"}).status(500)
        }
    },

    storeContactMessage: async (req, res) => {
        const { message } = req.body;
        const { username, email, _id: userId ,profile:profile } = req.user;

        try {
            const contactMessage = new Contact({ username, email, message, userId, profile });
            await contactMessage.save();
            res.status(201).send(contactMessage);
        } catch (error) {
            res.status(500).send({ message: "Server Error", error });
        }
    }
};

module.exports = ContactController;
