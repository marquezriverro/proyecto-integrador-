import React, { useState } from 'react'
import { useNavigate } from "react-router"
import './ProfileCard.scss'
import { APIConsumer } from "../../services/APIConsumer"

const ProfileCard = (props) => {
    const [fullName, setFullname] = useState('Nombre')
    const [email, setEmail] = useState('email')
    const [phoneNumber, setPhoneNumber] = useState('phoneNumber')
    const navigate = useNavigate()

    const handleChanges = () =>{
        navigate('/petProfile')
    }

    return (
        <div className="Card">
            <div className="upperCard">
                <div className="imageContainer">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbuzFZ5rIL1kMLIqJkp5hi8i6vgZdSt69x7A&usqp=CAU" alt="profilePic" height="100px" width="100px"/>
                </div>
            </div>
            <div className="lowerCard">
                <h3>{ props.fullName }</h3>
                <h4>{ props.email }</h4>
                <h4>{ props.phoneNumber }</h4>
                <button onClick={(e)=>handleChanges(e)}>Ver Mascotas</button>
            </div>
        </div>
    )
}

export default ProfileCard
