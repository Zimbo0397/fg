import React, {Component} from 'react';




function gameListItem(props, onConnect) {
	return (
		<div>
			<div>game id : {props.id}</div>
			<div>players : {props.state.playersList.length}</div>
			{props.state.playersList && props.state.playersList.map(pl => <div><div>id : {pl.id}</div><div>name : {pl.name}</div></div>)}
			<button onClick={onConnect}>connect</button>
		</div>
	);
}

export default gameListItem;