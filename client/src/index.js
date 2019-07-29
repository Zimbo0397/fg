import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import  PlayerDash from "./components/player";

class App extends Component {

	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			games: []
		}

		this.animals = [1, 2, 3, 4, 5, 6];
	}

	componentWillMount() {
		var socket = io.connect();

		socket.on('update', (data) =>{
			this.setState({games: data});
		});
		
	}

	renderGames() {
		return this.state.games.map((user, index) => {
			return <PlayerDash animals={this.animals} />;
		});
	}

	greateGame() {
		socket.emit('newGame');
		console.log('newGame');
	}

	render() {
		return <div>
			<button onclick={this.greateGame}>add Game</button>
			{this.renderGames()}
		</div>
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();