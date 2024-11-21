import React from 'react'
import { useNavigate } from 'react-router'
import APIConsumer from '../../services/APIConsumer'
import './RegisterPet'

const RegisterPet = () => {
    const navigate = useNavigate()
    const handleChanges = async (e) => {
        e.preventDefault()
        await APIConsumer.CreatePet(JSON.stringify({
            "name": e.target.name.value,
            "animal": e.target.animal.value, 
        }))            
        navigate('/petProfile')
        }
    return (
        <form className='add-form' onSubmit={(e)=>handleChanges(e)}>
        <div className='iner-form'>
            <div className='form-control'>
                <h2>Registro de Mascota</h2>
                <label>Nombre</label>
                <input type='text' name='name' placeholder='Añada el nombre del animal.' required />
            </div>
            <div className='form-control'>
                <label>Animal</label>
                <input type='text' name='animal' placeholder='Añada un tipo de animal.' required />
            </div>
            <input type='submit' value='Registrar Pet' className='btn btn-block' />
        </div>
    </form>
    )
}

export default RegisterPet
