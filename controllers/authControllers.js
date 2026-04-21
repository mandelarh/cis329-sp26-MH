const Doctor = require('../models/Doctor')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const {name, email, password, specialization} = req.body
        const salt = await bcrypt.genSalt(10) //10 = # of rounds to use when generating a salt
        const hashedPassword = await bcrypt.hash(password, salt) //hash the password using the generated salt
        
        //doctor instance with the hashed password
        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            specialization
        })

        await doctor.save()
        res.status(201).json({message: 'Doctor registered successfully'}) //201 = resource created successfully

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

exports.login = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({email: req.body.email}) //find the doctor by email
        
        if (!doctor) {
            return res.status(400).json({
                error: 'Invalid email or password'
            }) //400 = bad request
        }

        const validPass = await bcrypt.compare(req.body.password, doctor.password) //compare the provided password with the hashed password in the database
        
        if (!validPass) { //if the password is invalid
            return res.status(400).json({error: 'Invalid email or password'}) //400 = bad request
        }

        const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET, {expiresIn: '1h'}) //generate a JWT token with the doctor's ID as payload and a secret key from environment variables, set to expire in 1 hour
        
        res.json({token, doctorId: doctor._id}) //send the token back to the client
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}