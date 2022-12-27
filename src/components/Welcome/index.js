import React, { useState, Fragment, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, user } from '../Firebase/FirebaseConfig'
import Logout from '../Logout'
import Quiz from '../Quizz'
import { useNavigate } from 'react-router-dom'
import { getDoc } from 'firebase/firestore';
// import QuizCompo from '../Quizz/indexcomponent'

const Welcome = () => {
    
    
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});

    const navigate = useNavigate()

    const display = userSession ? (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                {/* <QuizCompo userData={userData}/> */}
                <Quiz userData={userData} />
            </div>
        </div>) :
        (
            <Fragment> 
                <div className='loader'></div>
                <p className='loaderText'>Loading...</p>
            </Fragment>)






    useEffect(() => {

        const listener = onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate('/')

        });


        //permet la reucperation de donné venant de firebase

        if (!!userSession) {

            const colRef = user(userSession.uid);

            getDoc(colRef)
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const docData = snapshot.data(); // objet
                        setUserData(docData);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }


        return listener
    }, [userSession]);

    //permet la reucperation de donné venant de firebase  ^^^^


    return (

        <div>{display}</div>

    )

}

export default Welcome
