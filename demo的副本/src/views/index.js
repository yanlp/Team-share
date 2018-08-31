import React , {Component}from 'react'
import ReactDOM from 'react-dom';
import joy from 'Images/sprite.head.png';
import index from 'CSS/index.scss';
class App extends Component {
  state = {
      count: 1,
      status: 1
  }
  clickHandler = () => {
    console.log(this.state.count, '----')
    this.setState({
      count:  ++ this.state.count
    })
  }
  render() {
    const {clickHandler, state } = this;
    const { count } = state;
    return (
      <div>
        hello!!!
        <span>{count}</span>
        <img  src={joy}  alt="jd JOY"/>
        <a href="javascript:;" onClick={clickHandler}>button</a>
      </div>
    );
  }
}

ReactDOM.render(<div>hello webpack <App></App></div>, document.getElementById('root'))