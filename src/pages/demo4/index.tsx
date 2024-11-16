



import React, { Component } from 'react'
import Counter from './components/Counter'
import mitt from '../../kit/mitt'

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      key: 1,
      text: 'Hello'
    }
    // console.log('constructor')
  }
  UNSAFE_componentWillMount(): void {
    // console.log('componentWillMount')
  }

  shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean {
    // console.log('shouldComponentUpdate')
    return true
  }
  componentWillUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void {
    // console.log('componentWillUpdate')
  }
  render() {
    // console.log('render')
    return (
      <div>
        <h1>Counter: {this.state.counter}</h1>
        <button onClick={
          () => {
            mitt.emit('app-tip', 'hello')
            this.setState({
              counter: this.state.counter + 1
            })
          }
        }>
          Click
        </button>
        <button onClick={
          () => {
            this.setState({
              text: 'world'
            })
          }
        }>
          world
        </button>
        <button onClick={
          () => {
            this.setState({
              key: Math.random()
            })
          }
        }>
          setkey
        </button>


        <Counter text={this.state.text} />
      </div>
    )
  }
  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    // console.log('componentDidUpdate')
  }
  componentDidMount() {
    // console.log('componentDidMount')
  }

}

