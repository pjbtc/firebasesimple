import React,{Component} from 'react';


class NoteForm extends Component{
	constructor(props){
		super(props);
		this.state={
			newNoteContent: '',
		};

		this.handleUserInput= this.handleUserInput.bind(this);

	}
	// when the user input changes, it set newNoteContent to the value of what's in input box

	handleUserInput(e){
		console.log(this)
		this.setState({
			newNoteContent: e.target.value //the value of text input
		})
	}
	render(){
		return(
			<div className="formWrapper">
				<input className="noteInput"
				 placeholder="write a new note"
				 value={this.state.newNoteContent}
				 onChange={this.handleUserInput}/>
				 <button className="noteButton">Add note </button>
			</div>
		)
	}
}
export default NoteForm;