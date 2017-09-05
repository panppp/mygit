//头部组件
import React,{Component} from "react"
import {Row,Col,Menu,Modal,Icon,Button,Tabs,Form,Input,message} from "antd"
import logo from  "../images/logo.png"
import {Link} from "react-router"
import axios from "axios"
//
const TabPane = Tabs.TabPane
//
const FormItem = Form.Item
const MenuItem = Menu.Item
class NewsHeader extends Component {
  state = {
      selectedKey: 'top',
      username: null,
      modalShow: false

  }
  showModal =(isShow) =>{
      this.setState({modalShow: isShow})
  }
  componentDidMount(){
    //读取保存到本地的username
    const username = localStorage.getItem('username')
    if(username){
      //
      this.setState({username})
    }
  }
  clickMenu = ({key}) =>{
    if(key === "logout"){
      this.setState({modalShow: true})
    }
    //更新状态
    this.setState({selectedKey: key})
  }
  logout = () => {
    //更新状态为无用户
    this.setState({username: null})
    //将数据移除
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }
  //
  handleSubmit =(isLogin) =>{
    //
    const {userName,password,r_userName,r_password,r_confirmPassword} = this.props.form.getFieldsValue()
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?`
    if(isLogin){
      url +=  `action=login&userName=${userName}&password=${password}`
    }else{
      url +=  `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }
    axios.get(url)
      .then(response =>{
        this.props.form.resetFields()
        const result = response.data
        if(isLogin){
          if(!result){
            //
            message.error('登录失败')
          }else{
            message.success('登录成功')
          //  读取返回的username、userId
            const username = result.NickUserName
            const userId = result.UserId
          //  更新状态
            this.setState({username})
          //  保存username、userId
            localStorage.setItem('username',username)
            localStorage.setItem('userId',userId)
          }
        }else{
          //注册成功
          message.success('注册成功')
        }
      })
    //
    this.setState({modalShow: false})
  }
  render (){
    const {selectedKey,username,modalShow} = this.state
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


    const userShow = username
      ?  (
        <MenuItem key="login" className="register">
          <Button type="primary">{username}</Button>&nbsp;&nbsp;
          <Link to="/user_center"><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
          <Button onClick={this.logout}>退出</Button>
        </MenuItem>
      )
      : (
        <MenuItem key="logout" className="register">
          <Icon type="appstore"/>登陆/注册
        </MenuItem>
      )


    return (
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="#/" className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" selectedKeys={[selectedKey]} onClick={this.clickMenu}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>

              {userShow}

            </Menu>
            <Modal title="用户中心" visible={modalShow}
                    onOk={this.showModal.bind(this,false)}
                   onCancel={() =>this.showModal(false)}
                   okText="关闭"
            >
              <Tabs typa="card" onChange={()=>this.props.form.resetFields()}>
                 <TabPane tab="登录" key="1">
                   <Form onSubmit={this.handleSubmit.bind(this,true)}>
                     <FormItem label="用户名">
                       {getFieldDecorator('userName')(
                         <Input type="text"  placeholder="请输入用户名" />
                       )}
                     </FormItem>
                     <FormItem label="密码">
                       {getFieldDecorator('password')(
                         <Input type="password" placeholder="请输入密码" />
                       )}

                     </FormItem>
                     <Button type="primary" htmlType="submit">登录</Button>
                   </Form>
                 </TabPane>
                 <TabPane tab="注册" key="2">
                   <Form onSubmit={this.handleSubmit.bind(this,false)}>
                     <FormItem label="用户名">
                       {getFieldDecorator('r_userName')(
                         <Input type="text"  placeholder="请输入用户名" />
                       )}
                     </FormItem>
                     <FormItem label="密码">
                       {getFieldDecorator('r_password')(
                         <Input type="password" placeholder="请输入密码" />
                       )}

                     </FormItem>
                     <FormItem label="确认密码">
                       {getFieldDecorator('r_confirmPassword')(
                         <Input type="password" placeholder="输入确认密码" />
                       )}

                     </FormItem>
                     <Button type="primary" htmlType="submit">注册</Button>
                   </Form>
                 </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
}
export default  Form.create()(NewsHeader)
