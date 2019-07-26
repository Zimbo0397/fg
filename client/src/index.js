import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import  PlayerDash from "./components/player";

class App extends Component {

	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			users: []
		}

		this.animals = [1, 2, 3, 4, 5, 6];
	}

	componentWillMount() {
		var socket = io.connect();

		socket.on('login', (data) =>{
			console.log(data);
		});
		
	}

	render() {
		return this.state.users.map((user, index) => {
			return <PlayerDash animals={this.animals} />;
		});
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();