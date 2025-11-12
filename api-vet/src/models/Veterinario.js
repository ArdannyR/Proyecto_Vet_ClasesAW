import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const veterinarioSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    }, apellido:{
        type:String,
        require:true,
        trim:true
    }, direccion:{
        type:String,
        require:true,
        default:null
    }, celular:{
        type:String,
        require:true,
        default:null
    }, email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    }, password:{
        type:String,
        require:true
    }, status:{
        type:Boolean,
        default:true
    }, token:{
        type:String,
        default:null
    }, confirmEmail:{
        type:Boolean,
        default:false
    }, rol:{
        type:String,
        default:"Veterinario"
    }
},{
    timestamps:true
}) 


// cifrado de constraseña 
veterinarioSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password es el mismo de la BDD
veterinarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
veterinarioSchema.methods.createToken= function(){
    const tokenGenerado = Math.random().toString(36).slice(2)
    this.token = tokenGenerado
    return tokenGenerado
}

export default model ('Veterinario', veterinarioSchema)