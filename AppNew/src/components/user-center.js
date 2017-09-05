//用户中心
import React,{Component} from "react"
import {Card,Tabs,Row,Col,Upload,Icon,Modal} from "antd"
import axios from "axios"

//定义页签项
const TabPane = Tabs.TabPane

class UserCenter extends Component {
  state ={
    userCollections: [],
    userComments: [],
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  }
  componentDidMount(){
    const userId = localStorage.getItem("userId")
    //发送ajax请求收藏列表
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(response => {
        const userCollections = response.data

        this.setState({userCollections})
      })
    //发送ajax请求评论列表
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(response =>{
        const userComments =response.data
        this.setState({userComments})
      })
  }
  //图像列表
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })



  render (){
    const {userCollections,userComments} = this.state
    const userCollectionsList = !userCollections.length
    ? '您还没有收藏任何的新闻，快去收藏一些新闻吧。'
      :userCollections.map((item,index)=>(
        <Card key={index} title={item.uniquekey}
          extra ={<a href={ `#/news_detail/${item.uniquekey}/top`}>查看</a>}>
          <p>{item.Title}</p>
        </Card>
        )
      )





    const userCommentsList = !userComments.length
    ?'您还没有发表过任何评论。'
      :userComments.map((item,index)=>(
        <Card key={index}  title={`于${item.datetime}发表评论`}
            extra = {<a href={ `#/news_detail/${item.uniquekey}`}>查看</a>}>
          <p>{item.Comments}</p>
        </Card>
        )
      )

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="我的收藏列表" key="1">
                {userCollectionsList}
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                {userCommentsList}
              </TabPane>
              <TabPane tab="图像列表" key="3">
                <div className="clearfix">
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>

              </TabPane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>


      </div>
    )
  }
}
export default UserCenter
