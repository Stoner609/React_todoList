import React from "react";

class List extends React.Component {
	constructor(props) {
		console.log('List - constructor');
		super(props);
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
		this.props.handleDelete(text);
	}

	render() {
		console.log('List - render');
		return (
			<ul>
				{
					this.props.items.map((x, index) =>
						<li
							key={index}
						>
							<div>內容： {x.text}</div>
							<div>時間： {x.date.toLocaleTimeString()}</div>
							<span className='delete' onClick={this.remove.bind(this, x.text)}>x</span>
						</li>
					)
				}
			</ul>
		)
	}
}

export default List;