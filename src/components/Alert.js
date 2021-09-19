import React from 'react'

const Alert = (props) => {
    return (
        <div class="alert alert-primary my-5" role="alert">
            {props.message}
        </div>
    )
}

export default Alert
