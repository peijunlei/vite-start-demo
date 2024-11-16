


import React, { useContext } from 'react';


interface CounterProps {
  text: string;
}

interface CounterState {

}

class Counter extends React.PureComponent<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      stateText: '111'
    }
  }
  static getDerivedStateFromProps(nextProps: Readonly<CounterProps>, prevState: Readonly<CounterState>): CounterState {

    console.log('getDerivedStateFromProps',nextProps)
    return {
      stateText: nextProps.text + 'pjl'
    }
  }
  componentWillReceiveProps(nextProps: Readonly<CounterProps>, nextContext: any): void {
    
  }
  render() {
    console.log('child render', this.state)
    return (
      <div>
        <h1>Counter</h1>
        {this.state.stateText}
      </div>
    );
  }
   getSnapshotBeforeUpdate(prevProps: Readonly<CounterProps>, prevState: Readonly<CounterState>) {
    console.log('getSnapshotBeforeUpdate')
    return {
      a:12121
    }
  }
  componentDidUpdate = (prevProps: Readonly<CounterProps>, prevState: Readonly<CounterState>, snapshot?: any) => {
    console.log('componentDidUpdate')
    console.log(snapshot)  
  }
  componentWillUnmount(): void {
    console.log('componentWillUnmount')
  }
}

export default Counter;