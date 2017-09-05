//默认组件
import React,{Component} from "react"
import {Row,Col,Carousel,Tabs} from "antd"
// import axios from "axios"
import carousel_1 from "../images/carousel_1.jpg"
import carousel_2 from "../images/carousel_2.jpg"
import carousel_3 from "../images/carousel_3.jpg"
import carousel_4 from "../images/carousel_4.jpg"
import NewsBlock from "./news-block"
import NewsImageBlock from "./news-image-block"
import NewsProducts from "./news-products"


//定义页签项
const TabPane = Tabs.TabPane


class NewsContainer extends Component{
  render (){
    return (
      <div>
        <Row className='container'>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="leftContainer" style={{width:'35%'}}>
              <Carousel autoplay>
                <div><img src={carousel_1}/></div>
                <div><img src={carousel_2}/></div>
                <div><img src={carousel_3}/></div>
                <div><img src={carousel_4}/></div>
              </Carousel>
              <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻" cardWidth="100%" imageWidth="112px"></NewsImageBlock>
            </div>
            <Tabs defaultActiveKey="1" style={{width:'35%'}} className="tabs_news">
              <TabPane tab="头条新闻" key="1">
                <NewsBlock type="top" count={21}></NewsBlock>
              </TabPane>
              <TabPane tab="国际新闻" key="2">
                <NewsBlock type="guoji" count={21}></NewsBlock>
              </TabPane>
            </Tabs>
            <Tabs style={{width:'30%'}}>
              <TabPane key="1" tab="React News产品">
                <NewsProducts></NewsProducts>
              </TabPane>
            </Tabs>
            <div>
              <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth="125px"></NewsImageBlock>
              <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth="125px"></NewsImageBlock>
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}
export default NewsContainer