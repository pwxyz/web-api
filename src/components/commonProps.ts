

import { connect } from 'dva'

const initDispatchToProps = dispatch => { 
  return {
    dispatch
  }
 }

const initStateToProps = state =>{ 
  return {
    state 
  }
}

export default () => connect(initStateToProps, initDispatchToProps)