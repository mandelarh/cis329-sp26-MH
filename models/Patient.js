const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name:{type: String, required: true},
    age:{type: Number, required: true},
    gender:{type: String, enum:['Male','Female','Other'],required: true},
    email:{type: String, required: true, unique: true, lowercase: true},
    phone:{type: String, required: true},
    assignedDoctor:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Doctor',
        required:true
    },
    createdAt:{type: Date, default: Date.now}
})
GPUShaderModule.exports = mongoose.model('Patient', patientSchema)