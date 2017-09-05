//文本新闻列表组件

import React,{Component,PropTypes} from "react"
import axios from "axios"
import {Card} from "antd"

import {Link} from "react-router"

class NewsBlock extends Component{

  state = {
    newsArr: null
  }
  static propTypes ={
    type: PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }
  componentDidMount(){
    const {type,count} = this.props
    const url =   `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    //发送ajax请求
    axios.get(url)
      .then(response => {
        const newsArr = response.data.map(news =>{
          return {
            uniquekey: news.uniquekey,
            title: news.title
          }
        })
        //
        this.setState({newsArr})
      })
      .catch()
  }
  render (){
    const {newsArr} = this.state
    const {type} =this.props
    const newsList = !newsArr
      ? '没有新闻' :( newsArr.map((item,index) =>(
        <li key={index}>
          <Link to={ `/newsDetail/${item.uniquekey}/${type}`}>{item.title}</Link>
        </li>
      )))
    return(
      <Card className="topNewsList">
        <ul>
          {newsList}
        </ul>
      </Card>
    )
  }
}
export default NewsBlock