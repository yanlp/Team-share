import React , {Component}from 'react';

import ReactDOM from 'react-dom';
// import tt from './tt.png';
import { Button } from './component/index.js'
// import index from'./index.css';

class App extends Component {
	state = {
			name: 'ylp'
	}
	onClick = () => {
		this.setState({
			name: 'lyp-jd___'
		})
	}
	bindButton(t, e){
		// alert('hello'+ t + e.target)
		// alert($('#app')[0].innerHTML)
		// alert($('#app').index())
		// alert(document.getElementById('app'))
		// alert(document.querySelector('#app'))
	}
	render(){
		return (
			<div id="app" style={{color: '#fff'}}>
				<Button className='btn' type="save" onClick={this.bindButton.bind(this, 'er')}>click me</Button>
				<div className="text">总算颠三倒四搞定sdsd了， 不容易呀!</div> 
				<div onClick={this.onClick} data-prop={this.state.name}>hello world</div>
			</div>
			)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

