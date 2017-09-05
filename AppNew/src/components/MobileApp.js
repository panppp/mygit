import React, {Component} from 'react'
import MobileHeader from './MobileHeader'
import NewsFooter from './news-footer'
import '../componentscss/mobile.css'

export default class MobileApp extends Component {
  render () {
    return (
      <div>
        <MobileHeader />
        {this.props.children}
        <NewsFooter />
      </div>
    )
  }
}
