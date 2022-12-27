import React, { useState, useEffect } from 'react'
// import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../QuizMarvel'




const QuizCompo = () => {

    console.log('je suis dans quizcompo')
    const [data, setData] = useState(

        {

            levelNames: ["debutant", "confirme", "expert"],
            quizLevel: 0,
            maxQuestions: 10,
            storedQuestions: [],
            question: null,
            option: [],
            idQuestion: 0

        }

    );





    

    const loadQuestions = quizz => {


        console.log('je suis dans load question')

        const fetchArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchArrayQuiz.length >= data.maxQuestions) {
            //methode map en enlevant des données a ne pas presenter type reponse avec la methode app
            //answer + ... pour dire le reste au quel on donne un nom dans ce cas 
            //keepRest
            const newArray = fetchArrayQuiz.map(({ answer, ...keepRest }) => keepRest);

            setData(prevState => {
                return {
                    ...prevState, storedQuestions: newArray,


                };



            });
        } else {
            console.log('Pas assez de questions!!!')
        }

    }







    useEffect(() => {

        console.log('avant appel de load')
        loadQuestions(data.levelNames[data.quizLevel]);
        console.log('apres appel de load');

    }, []);


    useEffect(() => {

        setData(prevState => {
            return {
                ...prevState,
                question: data.storedQuestions[data.idQuestion].question,
                option: data.storedQuestions[data.idQuestion].options,

            };

        });

    }, []);





    // useEffect((prevProps, prevState) => {


    //     console.log('je suis dans useeffect 2 !!!!!!')

    //     if (data.storedQuestions !== prevState.storedQuestions) {

    //         setData({
    //             question: data.storedQuestions[data.idQuestion].question,
    //             option: data.storedQuestions[data.idQuestion].options,
    //         })

    //     }
    // }, []);




    const displayOption = data.option.map((option, index) => {
        return (
            <p key={index} className='answerOptions'>{option}</p>
        )
    })


    return (



        <div>
            {console.log('je suis dans le return')}
            {/* <Levels levelNameQuiz={data.levelNames[data.quizLevel]} /> */}
            {/* <Levels levelNameQuiz={levelNameeffect} /> */}
            <ProgressBar />
            <h2>{data.question}</h2>
            {displayOption}

            <button className='btnSubmit'>Suivant</button>
        </div>
    )

}
export default QuizCompo
