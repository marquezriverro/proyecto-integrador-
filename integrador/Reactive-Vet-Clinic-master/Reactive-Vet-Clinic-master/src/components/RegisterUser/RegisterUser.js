import APIConsumer from "../../services/APIConsumer"
import { useNavigate } from "react-router"
import './RegisterUser.scss'

const RegisterUser = () => {
    const navigate = useNavigate()
    const handleChanges = async (e) => {
        e.preventDefault()
        await APIConsumer.CreateUser(JSON.stringify({
            "fullName": e.target.fullName.value,
            "email": e.target.email.value, 
            "phoneNumber": e.target.phoneNumber.value, 
            "password": e.target.password.value}))            
        navigate('/')
        }

return (
    <form className='add-form' onSubmit={(e)=>handleChanges(e)}>
        <div className='iner-form'>
            <div className='form-control'>
                <h2>Registro de Usuario</h2>
                <label>Nombre</label>
                <input type='text' name='fullName' placeholder='Añada su nombre completo.' required />
            </div>
            <div className='form-control'>
                <label>Email</label>
                <input type='email' name='email' placeholder='Añada un email válido.' required />
            </div>
            <div className='form-control'>
                <label>Numero de telefono</label>
                <input type='number' name='phoneNumber' placeholder='Añada un numero de telefono/movil.' required />
            </div>
            <div className='form-control'>
                <label>Contraseña</label>
                <input type='password' name='password' placeholder='Añade su contraseña con un mínimo  de 8 carácteres.' required />
            </div>
            {/* <div className='form-control form-control-check'>
                <label>¿Está de acuerdo con los terminos y condiciones?</label>
                <input type='checkbox' required />
            </div> */}
            <input type='submit' value='Registrarse' className='btn btn-block' />
        </div>
    </form>
)
}

export default RegisterUser