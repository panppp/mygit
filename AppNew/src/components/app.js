//根路由组件
import React,{Component} from "react"
import NewsHeader from "./news-header"
import NewsFooter from "./news-footer"
import "../componentscss/pc.css"
class App extends Component{
  render (){
    return (
      <div>
        <NewsHeader/>
        {this.props.children}
        <NewsFooter/>
      </div>
    )
  }
}
export default App
