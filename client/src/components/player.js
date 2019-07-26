import React, {Component} from 'react';



 class PlayerDash extends Component {

	constructor(props) {
		super(props);

		this.props = props;
	}

	render() {
		return this.props.animals.map((animal, index) => {
			return <div key={index}>{animal}</div>;
		});
	}
}

export default PlayerDash;