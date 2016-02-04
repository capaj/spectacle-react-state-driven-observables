import React, {PropTypes} from 'react'

const Alert = (props) => {
  let content
  if (props.html) {
    content = <div dangerouslySetInnerHTML={{
      __html: props.html
    }}/>
  } else {
    content = props.children
  }
  const classes = `alert alert-dismissible alert-${props.type} verification-alert`
  return (
    <div className={ classes } role='alert'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12' >
            { props.dismissible ? renderDismissButton() : null }
            { content }
          </div>
        </div>
      </div>
    </div>
  )
}

const renderDismissButton = () => (
  <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
    <span aria-hidden='true'>&times;</span>
  </button>
)

Alert.propTypes = {
  html: PropTypes.string,
  type: PropTypes.string,
  dismissible: PropTypes.bool,
  children: React.PropTypes.node
}

export default Alert
