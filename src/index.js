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
				<div>內容： {x.text}</div>
				<div>時間： {x.date.toLocaleTimeString()}</div>
				<span className='delete' onClick={() => this.remove(x.text)}>x</span>
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
			textEmpty: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.preventPop = this.preventPop.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleClear = this.handleClear.bind(this);
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
		let empty = false;
		if (event.target.value === '') {
			empty = true;
		} else {
			empty = false;
		}

		this.setState({ 
			text: event.target.value,
			textEmpty: empty
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
				textEmpty: true
			});
			return;	
		}
		
		this.setState((prevState, props) => {
			return {
				text: '',
				items: prevState.items.concat({
					text: this.state.text,
					date: this.state.date
				}),
				textEmpty: false
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

	handleClear() {
		this.setState({
			items: []
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
		console.log('App - render');

		let availableText
		let btnDisabled = true;
		let errorMsg = '';
		let errorClass = '';
		
		if (this.state.textEmpty) {
			errorMsg = this.state.textEmpty ? '不可為空白' : ''
			errorClass = this.state.textEmpty ? 'error show' : 'error hide';
		}else {
			availableText = this.state.items.some(x => x.text === this.state.text);
			btnDisabled = !availableText;
			errorMsg = '';
			errorClass = availableText ? 'error show' : 'error hide';
			errorMsg = availableText ?　'資料內已有該筆資料' : '';
		}
	
		return (
			<div className="todoListMain">
				<div className="header">
					<h2>現在時間： {this.state.date.toLocaleTimeString()}</h2>
				</div>
				<form className="App" onSubmit={this.onSubmit}>	
					<input className='text' placeholder="請輸入任何字" value={this.state.text} onChange={this.onChange} />
					<button className='btnSubmit' disabled={!btnDisabled}>Add</button>
					<div>
						<label className={errorClass}>{errorMsg}</label>
					</div>
				</form>
				<List items={this.state.items} handleDelete={this.handleDelete} />
				<div>
					<button className='btnClear' onClick={this.handleClear} >Clear</button>
				</div>
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