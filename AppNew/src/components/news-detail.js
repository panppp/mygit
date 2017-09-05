//新闻详情
import React,{Component} from "react"
import axios from "axios"
import {Row,BackTop,Col} from "antd"
import NewsImageBlock from "./news-image-block"
import NewsComments from "./news-comments"


class NewsDetail extends Component{
  state = {
    news: {}
  }
  componentDidMount(){
    //
    const {uniquekey} = this.props.params
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response=>{
        const news = response.data
        this.setState({news})
      })
  }
  componentWillReceiveProps (newProps){
      // console.log(newProps)
      const {uniquekey} = newProps.params
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response=>{
        const news = response.data
        this.setState({news})

        //更新页面的标题
        document.title = news.title
      })
  }
  render (){
    const {news} = this.state
    const {type,uniquekey} = this.props.params
    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className="container">
            <div dangerouslySetInnerHTML={{__html: news.pagecontent}}></div>
            <NewsComments uniquekey={uniquekey}></NewsComments>
          </Col>
          <Col span={6}>
            <NewsImageBlock type={type} count={40} cardWidth='100%' imageWidth='150px' cardTitle='相关新闻'></NewsImageBlock>
          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop></BackTop>

      </div>
    )
  }
}
export default NewsDetail
