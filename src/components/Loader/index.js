import React, {Fragment} from 'react'

const Loader = ({loadingMsg, stylingMsg}) => {
  return (

    <Fragment>
    <div className='loader'></div>
    <p style={stylingMsg}>
        {loadingMsg}
    </p>
    </Fragment>
  )
}

export default Loader
