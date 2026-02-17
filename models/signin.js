const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SignSchema =new mongoose.Schema({
  username:String,
  email:{
     type:String,
     required:true,
     unique:true,
  },
  password:{
    type:String,
    required:true,
  },
});

const Sign = mongoose.model('Sign',SignSchema);

module.exports= Sign;