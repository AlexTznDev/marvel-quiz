import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/FirebaseConfig';





const Login = () => {


  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');




  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setBtn(true)
    } else if (btn === true) {
      setBtn(false)
    }

  }, [password, email, btn]);

  const handleSubmit = e => {

    //permet d eviter la recharge et de perdre les donnée inscrite dans le champs
    e.preventDefault()
    //
    signInWithEmailAndPassword(auth, email, password)
      .then(user => {
        setEmail('');
        setPassword('');
        navigate('/welcome', { replace: true });

      })
      .catch(error => {
        setError(error);
        setEmail('');
        setPassword('')
        
      })
  }

  const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginbox'>
      <div className='slContainer'>
        <div className='formBoxLeftLogin'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>


            {errorMsg}
            <h2>Connexion</h2>

            <form onSubmit={handleSubmit}>

              <div className='inputBox'>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="off" required></input>
                <label htmlFor='email' >Email</label>
              </div>

              <div className='inputBox'>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" autoComplete="off" required></input>
                <label htmlFor='password' >Password</label>
              </div>

              {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}


            </form>
            <div className='linkContainer'>
              <a  onClick={() => { navigate("/ForgetPasword") }} className='simpleLink'>Mot de passse oublié? cliquez ici.</a>
              <p className='textinfovisiteur'>Copier/coller les informations</p>
              <p className='textinfovisiteur'>Email:</p><p className='infovisiteur'> visiteur@gmail.com</p>
              <p className='textinfovisiteur'>Mots de passe:</p><p className='infovisiteur'> visiteurMDP</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
