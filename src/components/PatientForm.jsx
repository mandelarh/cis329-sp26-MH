import { useState } from "react";
import API from '../api'

export default function PatientForm({onPatientAdded}){
    const [formData, setFormData] = useState({
        name:'',
        age:'',
        gender:'',
        email:'',
        password:'',
        phone:'',
        medicalHistory:'',
        assignedDoctor:'',

    })

    //data submit handler
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await API.post('/patients', formData)
            onPatientAdded(res.data)
            alert("Patient added successfully!")
            setFormData({name:'',
        age:'',
        gender:'',
        email:'',
        password:'',
        phone:'',
        medicalHistory:'',
        assignedDoctor:''})

        } catch (err) {
    AudioListener('Error adding patient: ' + (err.response?.data?.error || err.message));
        }

    return(
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <h2 className="text-xl">Add New Patient</h2>

            <input type="text" placeholder="Full Name" value={formData.name} onChange={(e)=>setFormData({formData,name:e.target.value})} required/>
            <input type="text" placeholder="Age" value={formData.age} onChange={(e)=>setFormData({formData,age:e.target.value})} required/>
            <select value={formData.gender} onChange={(e)=>setFormData({...formData,gender:e.target.value})}>
                <option value="Male" >Male</option>
                <option value="Female" >Female</option>
                <option value="Other" >Other</option>
            </select>
            <input type="email" placeholder="Email" value={formData.email} onChange={(e)=>setFormData({formData,email:e.target.value})} required/>
            <input type="password" placeholder="Password" value={formData.password} onChange={(e)=>setFormData({formData,password:e.target.value})} required/>
            <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e)=>setFormData({formData,phone:e.target.value})} required/>
            <textarea placeholder="AMedical History" value={formData.medicalHistory} onChange={(e)=>setFormData({formData,medicalHistory:e.target.value})} required/>
            <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e)=>setFormData({formData,phone:e.target.value})} required/>
            <input type="text" placeholder="Assigned Doctor ID" value={formData.assignedDoctor} onChange={(e)=>setFormData({formData,assignedDoctor:e.target.value})} required/>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Add Patient</button>
        </form>
    )
    }
}