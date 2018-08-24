
//虽然可以获取信息，并且校验格式，但是当其提交之后，编辑器中的信息将会重置，因此失败，放弃本组件



import React, { Component } from 'react'
import { Form, Input, Button  } from 'antd'


import Editor from '../Editor'

interface props{
  form ?: {
    getFieldDecorator: (id: string, options: object) => any
    validateFields: (any:any) => void
    validateFieldsAndScroll: (any: any) => any
    setFieldsValue: (any:any) => any
  }
}

interface state{

}

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  }
}

const FormItem =  Form.Item

const array = [
  { text:'路径', value: 'path', type: 'input' },
  { text:'描述', value: 'description', type: 'input' },
  { text:'标签', value: 'tag', type: 'input' },
  { text:'方法', value: 'method', type: 'input' },
  { text:'req', value: 'req', type: 'input' },
  { text:'res', value: 'res', type: 'input' },
]

const initRes = `{
  "status":1,
  "message":"获取信息成功",
  "payload":2
}`

class FormApi extends Component<props, state>{
  constructor(props){
    super(props)
    this.state={
      res: initRes
    }
  }
  componentDidMount(){
  }

  ref=null

  //     const model = this.refs.monaco.editor.getModel();
// const value = model.getValue();

  submit = e => {
    e.preventDefault()

    let value = this.ref.refs.monaco.editor.getModel().getValue()
    this.props.form.setFieldsValue({ path: value })
    this.props.form.validateFieldsAndScroll((err, values) =>{
      console.log('ref',this.ref.refs.monaco.editor.getModel().getValue())
      if (!err) {
        console.log('Received values of form: ', values, );
      }
    })
  }

  validateToRes = (rule, value, callback) => {
    // console.log( value)
    try{
      JSON.parse(value)
      callback()
    }
    catch (err){

      callback('json格式不正确！！！')
    }
  }

  setEditorValue = key => {
    let value = this.ref.refs.monaco.editor.getModel().getValue()
    this.props.form.setFieldsValue({ [key]: value })
    return value
  }


  render(){
    const { getFieldDecorator } = this.props.form
    return(
      <div style={{ width:1000 }} >
      
        <Form layout='horizontal' onSubmit={ this.submit } >
          
          <FormItem label={ '路径' } { ...formLayout }  >
              {
                getFieldDecorator( 'path' , {
                  rules: [
                    { required:  true, message:' '  },
                    { validator: this.validateToRes },
                    // { transform: () => {
                    //   return  this.setEditorValue('path')
                    // } }
                  ],
                  // initialValue: initRes
                } )( <Editor ref={ ref=> this.ref = ref } initValue={ this.state.res }  />  )
              }
            </FormItem>
            <FormItem>
            <div style={{ display:'flex', flexDirection:'row-reverse' }} >
              <Button type='primary' htmlType='submit'  >提交</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(FormApi)
