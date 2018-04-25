import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ListTest from './list';

class List extends React.Component {
	constructor(props) {
		console.log('List - constructor');
		super(props);
		this.createTask = this.createTask.bind(this);
	}
	componentWillMount() {
		console.log('List - componentWillMount');
	}

	componentDidMount() {
		console.log('List - componentDidMount');
	}

	componentWillReceiveProps(nextProps) {
		console.log('List - componentWillReceiveProps');
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('List - shouldComponentUpdate');
		if (nextProps.items.length === this.props.items.length) {
			console.log('List - 不渲染');
			return false;
		}
		console.log('List - 渲染');
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('List - componentWillUpdate');
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('List - componentDidUpdate');
	}

	componentWillUnmount() {
		console.log('List - componentWillUnmount');
	}

	remove(text) {
		console.warn('list-delete');
		this.props.handleDelete(text);
	}

	createTask(x) {
		return (
			<li 
				key={x.text}
			>
				{x.text + x.date.toLocaleTimeString()}
				<span className='close' onClick={() => this.remove(x.text)}>x</span>
				{/* <span className='close' onClick={this.props.handleDelete.bind(this, x.text)}>x</span> */}
			</li>
		)
	}

	render() {
		console.log('List - render');
		return (
			<ul>
				{
					this.props.items.map(x => this.createTask(x))
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
			errorMsg: '',
			errorClass: 'error hide',
			btnDisabled: true
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.preventPop = this.preventPop.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount() {
		console.log('App - componentWillMount')
	}

	componentDidMount() {
		console.log('App - componentDidMount ----------------------');
		this.timeID = setInterval(() => this.tick(), 1000);
	}

	componentWillReceiveProps(nextProps) {
		console.log('App - componentWillReceiveProps');
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('App - shouldComponentUpdate');
		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('App - componentWillUpdate');
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('App - componentDidUpdate ---------------------');
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
		var availableText = this.state.items.some(x => x.text === event.target.value);
		if (availableText) {
			this.setState({
				errorMsg: '資料內已有該筆資料',
				errorClass: 'error show',
				btnDisabled: false
			})
		} else {
			this.setState({
				errorMsg: '',
				errorClass: 'error hide',
				btnDisabled: true
			})
		}

		this.setState({ 
			text: event.target.value,
		});
	}

	onSubmit = (event) => {
		event.preventDefault();
		// this.setState({
		//   term: '',
		//   items: [...this.state.items, this.state.term]
		// });
		
		if (this.state.text === '') {
			this.setState({
				errorMsg: '不可為空白',
				errorClass: 'error show'
			});
			return;
		};	
		
		this.setState((prevState, props) => {
			return {
				text: '',
				items: prevState.items.concat({
					text: this.state.text,
					date: this.state.date
				})
			}
		});
	}

	handleClick = (e) => {
		//console.log('this is:', this);
		this.setState({
			test: '123'
		})
	}

	handleDelete(name) {
		var filteredItems = this.state.items.filter(function (item) {
			return (item.text !== name);
		  });
		 
		  this.setState({
			items: filteredItems
		  });
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
		console.log('App - render');
		return (
			<div>
				<form className="App" onSubmit={this.onSubmit}>
					<h2>{this.state.date.toLocaleTimeString()}</h2>
					<input className='text' value={this.state.text} onChange={this.onChange} />
					<button className='btnSubmit' disabled={!this.state.btnDisabled}>Add</button>
					<div>
					<label className={this.state.errorClass}>{this.state.errorMsg}</label>
					</div>
				</form>
				<List items={this.state.items} handleDelete={this.handleDelete} />
				{/* <button onClick={this.handleClick}>{this.state.test}</button> */}
				{/* <button onClick={this.preventPop}>click</button> */}
				{/* <ListTest items={[1, 2, 3]} /> */}
			</div>
		);
	}
}

ReactDOM.render(
	<App hello={'hello'} />,
	document.getElementById('root')
);