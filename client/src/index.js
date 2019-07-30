import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import  PlayerDash from "./components/player";
import  gameListItem from "./components/games-list-item";
import './less/main.less';

let socket = null;

class App extends Component {

	constructor(props) {
		super(props);

		this.props = props;
		this.state = {
			games: [],
			id: null,
			name: null
		}

		this.animals = [1, 2, 3, 4, 5, 6];

		this.greateGame = this.greateGame.bind(this);
		this.connectUserToGame = this.connectUserToGame.bind(this);
		this.renderGamesList = this.renderGamesList.bind(this);
		this.setName = this.setName.bind(this);
	}

	componentWillMount() {
		socket = io.connect({'forceNew': true});


		socket.on('userCreated', (userId) => {
			this.setState({id: userId});
		});

		socket.on('update', (data) => {
			console.log(data);
			this.setState({games: data});
		});
		
	}

	setName(e) {
		socket.emit('setName', e.target.value);
		this.setState({name: e.target.value});
	}

	renderGamesList() {
		return this.state.games.map((game) => {return gameListItem({...game}, () => {this.connectUserToGame(game.id)})});
	}

	greateGame() {
		socket.emit('newGame');
	}

	connectUserToGame(id) {
		socket.emit('connectToGame', id);
	}

	render() {
		return <div className="container">
			<h2>{this.state.name && this.state.name + "-" }<span>{this.state.id}</span></h2>
			
			<input onChange={this.setName} />
			<button onClick={this.greateGame}>add Game</button>
			{this.renderGamesList()}
		</div>
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();