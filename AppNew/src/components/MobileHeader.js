import React,{Component} from "react"


import logo from '../images/logo.png'
class MobileHeader extends Component{
  render (){
    return (
      <header>
        <div id="header">
          <a href="#/">
            <img src={logo} alt="logo"/>
            <span>ReactNews</span>
          </a>
        </div>
      </header>
    )
  }
}
export  default MobileHeader