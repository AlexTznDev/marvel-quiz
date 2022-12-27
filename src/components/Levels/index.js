import React , {useEffect, useState} from 'react';
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelNames ,quizLevel}) => {

const [levels, setLevels] = useState([]);

useEffect(() => {
  const quizStep = levelNames.map( level => ({title: level.toUpperCase()}))
  setLevels(quizStep)
  console.log(levels)
}, [levelNames]);




  return (
    <div className='levelsContainer' style={{background:'transparent'}}>

        <Stepper steps={levels}
          activeStep={quizLevel} 
          circleTop={0}
          activeTitleColor={'#f94144'}
          activeColor={'#f94144'}
          completeTitleColor={'#E0E0E0'}
          completeColor={'#E0E0E0'}
          completeBarColor={'#E0E0E0'}
          size={45}
          circleFontSize={20}
          barStyle={'dashed'}
          completeOpacity={'.8'}
          />


    </div>
  )
}

export default React.memo(Levels)
