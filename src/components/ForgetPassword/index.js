import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../Firebase/FirebaseConfig';

const ForgetPasword = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError(null);
                setSuccess(`Consultez votre ${email} pour changer le mot de passe`)
                setEmail("");

                setTimeout(()=>{
                    navigate('/login')
                }, 5000)
            })
            .catch(error => {
                setError(error)
                setEmail("")
            })
    }




    //btn display
    useEffect(() => {
        if (email !== '') {
            setBtn(true)
        } else if (btn === true) {
            setBtn(false)
        }
    }, [email, btn]);

    const displaybtn = btn ? <button>Récuperer</button> : <button disabled>Récuperer</button>

    return (

        <div className='signUpLoginbox'>
            <div className='slContainer'>
                <div className='formBoxLeftForget'>
                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {
                            success && <span
                                style={{
                                    border: '1px solid green',
                                    background: 'green',
                                    color: '#ffffff'
                                }}>
                                {success}
                            </span>
                        }
                        {error && <span>{error.message}</span>}

                        <h2>Mot de passe oublié?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className='inputBox'>
                                <input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="off" required></input>
                                <label htmlFor='email' >Email</label>
                            </div>

                            {displaybtn}

                        </form>
                        <div className='linkContainer'>
                            <a  onClick={() => { navigate("/Login") }} className='simpleLink'>Déja inscrit? Connectez-vous.</a>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default ForgetPasword
