

import React from 'react'
// import { connect } from 'dva'
import Content from './components/Content'

interface props {

}

interface state{

}


class Home extends React.Component<props, state>{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    return(
      <div>
        <Content />
      </div>
    )
  }
}

export default Home