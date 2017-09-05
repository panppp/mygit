import React,{Component,PropTypes} from "react"
import {Form,Card,notification,Input,Button} from "antd"
import axios from "axios"
// import Button from "antd/lib/button/button.d";

const FormItem = Form.Item
class NewsComments extends Component {
  static propTypes ={
    uniquekey: PropTypes.string.isRequired
  }
  state = {
    comments: []
  }
  componentDidMount(){
    //获取传递过来的值
    const {uniquekey} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response =>{
        const comments = response.data
        this.setState({comments})
      })
  }
  //刷新评论列表，与文章对应
   componentWillReceiveProps(newProps){
    // console.log(newProps)
     const {uniquekey} = newProps
     const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
     axios.get(url)
       .then(response =>{
         const comments = response.data
         this.setState({comments})
       })
   }
  //提交评论
  handleSubmit = () =>{
    const userId = localStorage.getItem('userId')
    if(!userId){
      alert('请先登录')
      return
    }
    const {uniquekey} =this.props
    const commnet =this.props.form.getFieldsValue().content
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${commnet}`
    axios.get(url)
      .then(response=>{
        //更新评论列表，就是在获取依次数据
        this.componentDidMount()
        //提示，message也可以
        notification.success({
          message: '提交评论成功'
        })
        //清除输入数据
        this.props.form.resetFields()
      })



  }
  //收藏文章
  handleClick = () => {
    const userId = localStorage.getItem('userId')
    if(!userId){
      alert('请先登录')
      return
    }
    const {uniquekey} =this.props
    // const commnet =this.props.form.getFieldsValue().content
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response=>{
        //更新评论列表，就是在获取依次数据
        // this.componentDidMount()
        //提示，message也可以
        notification.success({
          message: '收藏成功'
        })
        //清除输入数据
        // this.props.form.resetFields()
      })
  }
  render (){
    const commentList = this.state.comments.map((item,index) => (
      <Card key={index} title={item.UserName} extra={`发布于${item.datetime}`}>
        <p >{item.Comments}</p>
      </Card>
    ))
    const {getFieldDecorator} =this.props.form
    return (
      <div style={{padding:'10px'}}>
        {commentList}
        <Form onSubmit={this.handleSubmit}>
            <FormItem label="您的评论">
              {getFieldDecorator('content')(
                <Input type="textarea" placeholder="请输入评论内容" />
              )}

            </FormItem>
            <Button type="primary" htmlType="submit">提交评论</Button>
            <Button type="primary" onClick={this.handleClick}>收藏文章</Button>
        </Form>
      </div>
    )
  }
}
export default  Form.create()(NewsComments)