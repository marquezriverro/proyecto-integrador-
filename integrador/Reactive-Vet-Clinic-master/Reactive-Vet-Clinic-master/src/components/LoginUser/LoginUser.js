import { APIConsumer } from "../../services/APIConsumer"
import './LoginUser.scss'
import { useNavigate } from "react-router"
import store from '../../services/store'
import { LOG_IN } from "../../services/actions/actionTypes"

const LoginUser = () => {    
    //const navigate = useNavigate
    const handleChanges = async (e) => {
        e.preventDefault()
        let res = await APIConsumer.userLogin(JSON.stringify({email: e.target.email.value, password: e.target.password.value}))  
        //navigate('/userProfile') 

        if(res.userData){
            store.dispatch({
                type: LOG_IN,
                payload:res.userData
            })
        } else {
            console.log('no tengo ni puta idea')
        }
    }

    return (      
        <form className='add-form' onSubmit={(e)=>handleChanges(e)}>
            <div className='inner-form'>
                <h2>Login</h2>
                <div className='form-control'>
                    <label>Email:</label>
                    <input type='email' name='email' placeholder='Email' required />
                </div>
                <div className='form-control'>
                    <label>Contraseña:</label>
                    <input type='password' name='password' placeholder='Contraseña' required />
                </div>    
                <input type='submit' value='Login' className='btn btn-block' />
            </div>
        </form>       
    )
}

export default LoginUser