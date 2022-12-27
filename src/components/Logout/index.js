import React, { useState, useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';


const Logout = () => {

    const [checked, setChecked] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        if (checked) {
            signOut(auth).then(() => {
                console.log('Vous êtes deconnecté')
                setTimeout(() => {
                    navigate('/')
                }, 300)

            }).catch((error) => {
                console.log(error)
                console.log('Nous avons une erreur!')
            });

        }
    }, [checked, navigate]);

    const handleChange = (event) => {

        setChecked(event.target.checked)
        checked ? setChecked(false) : setChecked(true)
    }

    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <span className='slider round' data-tip="Deconnexion"></span>

            </label>
            <ReactTooltip
                place='left'
                effect='solid'
            />

        </div>
    )
}

export default Logout
