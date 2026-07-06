const mongoose=require('mongoose');
// const NameidSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     phone:{
//         type:Number,
//         required:true
//     },
//     dob:{
//         type:Date,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     idno:{
//         type:Number,
//         required:true
//     }
// })
// const Nameid=mongoose.model('Nameid',NameidSchema);
 
const ProfileidSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    img:{url:String,public_id:String

    },
    phone:{
        type:Number,
        required:true
    },
    about:{
        type:String
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
   
});

const Profileid=mongoose.model('Profileid',ProfileidSchema);
module.exports=Profileid;