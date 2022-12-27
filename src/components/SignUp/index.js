import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, user } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { setDoc } from 'firebase/firestore';


const SignUp = () => {


  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''

  }

  const [loginData, setLoginData] = useState(data);

  //tres important//
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  }

  //destructuring data
  const { pseudo, email, password, confirmPassword } = loginData

  //creation d une condiation pour affichage du bouton qui valide l inscription client

  const BtnInscription = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Inscription</button> : <button>Inscription</button>



  const [error, setError] = useState('');

  // const handleSubmit = e => {
  //   e.preventdefaut();
  //   const { email, password } = loginData;
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(user => {
  //       setLoginData({ ...data });
  //     })
  //     .catch(error => {
  //       setError(error);
  //       setLoginData({ ...data });
  //     })
  // }

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, pseudo } = loginData;
    createUserWithEmailAndPassword(auth, email, password)

      //firebase pour creer un id en fonction du pseudo renseigné au moment de l inscription
      .then(authuser=> {
        return setDoc(user(authuser.user.uid),{
          pseudo: pseudo,
          email: email
        });
      })


      .then(() => {
        setLoginData({ ...data });
        navigate('/Welcome')
      })
      .catch(error => {
        setError(error);
        setLoginData({ ...data });
      })
  }

  const errorMsg = error !== '' && <span>{error.message}</span>

  let navigate = useNavigate()

  return (
    <div className='SignUpLoginbox'>
      <div className='slContainer'>
        <div className='formBoxLeftSignup'>
        </div>
        <div className='formBoxRight'>
          <div className='formContent'>

            {errorMsg}
            <h2>Inscription</h2>

            <form onSubmit={handleSubmit}>


              <div className='inputBox'>
                <input value={pseudo} onChange={handleChange} type="text" id="pseudo" autoComplete="off" required></input>
                <label htmlFor='pseudo' >Pseudo</label>
              </div>

              <div className='inputBox'>
                <input value={email} onChange={handleChange} type="email" id="email" autoComplete="off" required></input>
                <label htmlFor='email' >Email</label>
              </div>

              <div className='inputBox'>
                <input value={password} onChange={handleChange} type="password" id="password" autoComplete="off" required></input>
                <label htmlFor='password' >Password</label>
              </div>

              <div className='inputBox'>
                <input value={confirmPassword} onChange={handleChange} type="password" id="confirmPassword" autoComplete="off" required></input>
                <label htmlFor='confirmPassword' >Confirmer le mot de passe</label>
              </div>

              {BtnInscription}
            </form>
            <div className='linkContainer'>
              <a onClick={() => { navigate("/Login") }} className='simpleLink'>Déja inscrit? Connectez-vous.</a>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp
