import React, {Component} from 'react';




function gameListItem(props, onConnect) {
	return (
		<div>
			<div>name : {props.id}</div>
			<div>players : {props.state.playersList.length}</div>
			<button onClick={onConnect}>connect</button>
		</div>
	);
}

export default gameListItem;