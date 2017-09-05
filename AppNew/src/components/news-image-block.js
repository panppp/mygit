import React,{Component,PropTypes} from "react"
import {Card} from "antd"
import axios from "axios"
import {Link} from "react-router"

class NewsImageBlock extends Component{
  static propTypes ={
    cardTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    cardWidth: PropTypes.string.isRequired,
    imageWidth:PropTypes.string.isRequired
  }
  state = {
    newsArr: null
  }
  componentDidMount(){
    //
    const {type,count} = this.props
    const url =   `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        const newsArr = response.data.map((item, index) => (
            {
              uniquekey: item.uniquekey,
              title: item.title,
              author_name: item.author_name,
              thumbnail_pic_s: item.thumbnail_pic_s
            })
        )
        this.setState({newsArr})
      })
  }
  render (){
    const {cardTitle,cardWidth,imageWidth,type} = this.props
    const {newsArr} =this.state
    const newsList = !newsArr
     ?'没有新闻'
      :(
        newsArr.map((item,index) =>(
          <div key={index} className="imageblock">
            <Link to={`/news_detail/${item.uniquekey}/${type}`}>
              <div>
                <img src={item.thumbnail_pic_s} style={{width:imageWidth,height: '90px',display:'block'}}/>
              </div>
              <div className="custom-card">
                <h3 style={{width: imageWidth,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{item.title}</h3>
                <p>{item.author_name}</p>
              </div>
            </Link>
          </div>
        ))

      )
    return(
      <Card title={cardTitle} style={{width: cardWidth}} className="topNewsList">
        {newsList}
      </Card>
    )
  }
}
export default NewsImageBlock
