import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class List extends React.Component {
	constructor(props){
		super(props);
		console.log('List - constructor')
	}
	componentWillMount() {
		console.log('List - componentWillMount');
	}

  componentDidMount() {
		console.log('List - componentDidMount');
  }

	componentWillUpdate() {
		console.log('List - componentWillUpdate');
	}
	componentDidUpdate() {
		console.log('List - componentDidUpdate')
	}

  componentWillUnmount() {
		console.log('List - componentWillUnmount');
	}

	render() {
		console.log('List - render')
		return (
			<ul>
			{
				this.props.items.map(x => {
					return <li key={x.text}>{x.text + x.date.toLocaleTimeString()}</li>
				})
			}
			</ul>
		)
	}
}

class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
			text: '',
			items: [],
			date: new Date(),
			test: '',
			test2: []
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.preventPop = this.preventPop.bind(this);
	}

	componentWillMount() {
		console.log('App - componentWillMount')
	}

  componentDidMount() {
		console.log('App - componentDidMount ----------------------');
		this.timeID = setInterval(() => this.tick(), 1000);
  }

	componentWillUpdate() {
		console.log('App - componentWillUpdate');
	}
	componentDidUpdate() {
		console.log('App - componentDidUpdate ---------------------')
	}

  componentWillUnmount() {
		console.log('App - componentWillUnmount');
		clearInterval(this.timeID);
	}
	
	tick() {
		this.setState({
			date: new Date()
		})
	}

	onChange = (event) => {
		// console.log(event.currentTarget.value)
		// console.log(event.target.value);
		this.setState({text: event.target.value});
	}

	onSubmit = (event) => {
		event.preventDefault()
		// this.setState({
		//   term: '',
		//   items: [...this.state.items, this.state.term]
		// });
		this.setState((prevState, props) => {
			// console.log(prevState)
			// console.log(props)
			 return {
				text: '',
				// items: prevState.items.concat(this.state.text),
				items: prevState.items.concat({
					text: this.state.text,
					date: this.state.date
				})
			 }
		});
	}


	handleClick = (e) => {
		console.log('this is:', this);
		this.setState({
			test: '123'
		})
  }

	// preventPop = (e) => {
	// 	e.preventDefault();
	// 	let name = this.state.test;
	// 	alert(name);
	// }
	
	preventPop(e) {
		e.preventDefault();
		let name = this.state.test;
		alert(name);
	}

	render() {
		console.log('App - render')
	  return (
		<div>
			<h2>{this.state.date.toLocaleTimeString()}</h2>
			<form className="App" onSubmit={this.onSubmit}>
				<input value={this.state.text} onChange={this.onChange} />
				<button>Submit</button>
			</form>
			<List items={this.state.items} />
			<button onClick={this.handleClick}>{this.state.test}</button>
			<button onClick={this.preventPop}>click</button>
		</div>
	  );
	}
}

ReactDOM.render(
	<App hello={'hello'} />,
	document.getElementById('root')
);