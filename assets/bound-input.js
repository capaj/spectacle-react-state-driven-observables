import React, {PropTypes} from 'react'
import {observer} from 'mobservable-react'
import _ from 'lodash'

const BoundInput = (props) => {
  if (!props.source && !props.parent) {
    throw new Error('missing property source on the BoundInput')
  }
  let {source} = props
  const {name, validation, onChange} = props
  if (!source) {
    source = {}
    source[name] = props.parent.state[name]
  }
  let cln = ''
  if (validation) {
    const validRes = validation(source[name])
    if (validRes === false) {
      cln = 'has-error'
    }
    if (typeof validRes === 'object') {
      cln = 'has-error'
      // todo show hint
    }
  }

  const defVal = source[name]
  var propsToPass = _.omit(props, 'onChange')

  return <input className={cln} value={defVal} defaultValue={defVal} onChange={(ev) => {
    const {value} = ev.target
    if (value || value === '') {  // onChange gets triggered even when invalid key is pressed(for example 'a' key on an input of type number)
      source[name] = value
    }
    if (onChange) {
      onChange(ev)
    }
  }} {...propsToPass}/>
}

BoundInput.propTypes = {
  name: PropTypes.string,
  validation: PropTypes.func,
  autocomplete: PropTypes.string,
  boundPrefix: PropTypes.string,
  onChange: PropTypes.func,
  source: PropTypes.object
}

export default observer(BoundInput)
