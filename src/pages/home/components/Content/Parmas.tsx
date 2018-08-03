//传入json数据，用来预览其效果的

import React from 'react'
import { Tag } from 'antd'


const Parmas = ({ obj, }) => {
  if(length in obj) return (
    <div>
      {obj.map((i,index) => <div key={ index }  ><Parmas obj={ i }  /></div> )}
    </div>
  )
  return(
    <div style={{ border:'1px solid rgba(0,0,0,0.3)', display:'inline-block', margin:10 }} >
      {
        Object.entries(obj).map((i, index) => 
          <div key={ i + '' + index } style={{ margin:5, border: typeof i[1] ==='object'? '1px solid red': '1px solid white'  }} >
          <Tag color={ '#1890ff' } > { i[0] } </Tag>
          
          {
            typeof i[1] ==='object' ? 
            <div style={{ marginLeft: 20 }} >
              <Parmas obj={ i[1]  } />
            </div> :
            <Tag color={ '#1890ff' } >{ i[1] +'' }</Tag>
          }
          
          </div>  
      )
      }
    </div>
  )
}


export default Parmas