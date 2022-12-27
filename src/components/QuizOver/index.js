import React, { Fragment, useEffect, useState } from 'react'
import { GiCogLock, GiTrophyCup } from 'react-icons/gi'
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';



const QuizOver = React.forwardRef((props, ref) => {

    const {
        levNames,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestion
    } = props


    /* connexion a l api marvel avec le .end que l on securise en informant dans gitignore */
    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
    const hash = '2fd77ca5c4aec1905f65189cd1ca7a65'
    /* fin API CONNEXION */

    const [asked, setAsked] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [marvelapiData, setMarvelapiData] = useState([]);
    const [Loading, setLoading] = useState(true);


    useEffect(() => {
console.log(ref)
        setAsked(ref.current)

    }, [ref]);

    const showModal = (id) => {
        setOpenModal(true);

        axios
            .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash${hash}`)
            .then((response) => {
                setMarvelapiData(response.data)
                setLoading(false)
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

    }


    const hideModal = () => {
        setOpenModal(false)
        setLoading(true)
    }

    /* permet de mettre seulement la premiere lettre en majuscule */
    const uppercaseFirstletter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    /* ^^^^^^^^^^^^^ */

    const averageGrade = maxQuestions / 2
    // if (score < averageGrade) {
    //     setTimeout(() => {
    //         loadLevelQuestion(quizLevel)
    //     }, 3000)
    // }


    const decision = score >= averageGrade  ? (

        <Fragment>
            <div className='stepsBtnContainer'>
                {quizLevel < levNames.length ?
                    (
                        <Fragment>
                            <p className='successMsg'>Bravo, passer au niveau suivant!</p>


                            <button
                                className='btnResult success'
                                onClick={() => loadLevelQuestion(quizLevel)}
                            >Niveau suivant</button>
                        </Fragment>
                    )
                    :
                    (
                        <Fragment>
                            <p className='successMsg'><GiTrophyCup size={'40px'} /> Bravo vous êtes un expert !</p>
                            <button
                                onClick={() => loadLevelQuestion(0)}
                                className='btnResult success'>Acceuil</button>
                        </Fragment>
                    )}
            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>) : (
        <Fragment>


            <div className='stepsBtnContainer'>

                <Fragment>
                    <p className='failureMsg'>Vous avez échoué !</p>
                    <button
                        className='btnResult gameOver'
                        onClick={() => loadLevelQuestion(quizLevel)}
                    >Recommencer niveau</button>
                </Fragment>

            </div>
            <div className='percentage'>
                <div className='progressPercent'>Réussite: {percent}%</div>
                <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )


    const questionAnswers = score ? (asked.map(question => {
        return (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td>
                    <button className='btnInfo' onClick={() => showModal(question.heroId)}

                    >
                        Infos</button>
                </td>
            </tr>
        )
    }))
        :
        (
            <tr>
                <td colSpan="3">
                    <Loader

                        /*passer des propriété en tant que contenu ou pour du style pour
                        l exemple */
                        loadingMsg={'Pas de réponse'}
                        stylingMsg={{ textAlign: 'center', color: 'red' }}
                    />
                </td>
            </tr>)

    const resultInModal = !Loading ?
        (
            <Fragment>
                <div className='modalHeader'>
                    <h2>{marvelapiData.data.results[0].name}</h2>
                </div>
                <div className='modalBody'>
                    <div className='comicImage'>
                        <img
                            src={marvelapiData.data.results[0].thumbnail.path + '.' + marvelapiData.data.results[0].thumbnail.extension}
                            alt={marvelapiData.data.results[0].name}></img>
                        <p>{ }marvelapiData.attributionText</p>
                    </div>
                    <div className='comicDetails'>
                        <h3>description</h3>
                        {
                            marvelapiData.data.results[0].description ?
                                (<p>{marvelapiData.data.results[0].description}</p>)
                                :
                                (<p>Description indisponible ...</p>)
                        }
                        <h3>Plus d'infos</h3>
                        {
                            marvelapiData.data.results[0].urls &&
                            marvelapiData.data.results[0].urls.map((url, index) => {

                                console.log(url)
                                return <a

                                    key={index}
                                    href={url.url}
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    {uppercaseFirstletter(url.type)}
                                </a>

                            })
                        }
                    </div>
                </div>
                <div className='modalFooter'>
                    <button className='modalBtn' onClick={hideModal}>Fermer</button>
                </div>
            </Fragment>
        ) :
        (
            <Fragment>
                <div className='modalHeader'>
                    <h2>Reponse arrive...</h2>
                </div>
                <div className='modalBody'>
                    <h3>

                        <Loader />

                    </h3>
                </div>
            </Fragment>
        )

    return (


        <Fragment>
            {decision}
            <hr />
            <p>Les réponses aux questions posées:</p>


            <div className='answerContainer'>
                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>

                        {questionAnswers}

                    </tbody>
                </table>
            </div>
            <Modal openModal={openModal} hideModal={hideModal}>
                {resultInModal}
            </Modal>

        </Fragment>
    )
})

export default React.memo(QuizOver)
