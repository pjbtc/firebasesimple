import React, { Component } from 'react';
import Note from './Note/Note';

import NoteForm from './Noteform/NoteForm';
import './App.css';
import DB_config from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
class App extends Component {

    constructor(props){
      super(props);

      this.addNote= this.addNote.bind(this);
      this.app =firebase.initializeApp(DB_config);
      this.db =this.app.database().ref().child ('notes');
      this.state={
        notes:[],
      }
    }

    //ref is the reference for the location in database that generate this datasnaphot

    componentWillMount(){
        const previousNotes=this.state.note;

        //Datasnapshot
        //child_added is used when retreiving  a list of items from database
        //push method adds new items at the end of the array and returns new array length
        //you can extract the contents of snapshot as javascript object by calling the val() method
        // A Datasnapshot is passed to event callbacks you attach with on() and once().

        this.database.on('child_added', snap=>{
          previousNotes.push({
            id:snap.key,
            noteContent: snap.val().noteContent,
          })
          this.setState({
            notes:previousNotes
          })
        })
        this.database.on('child_removed', snap =>{
          for(i=0; i< previousNotes.length; i++){
            if(previousNotes[i].id===snap.key){
              previousNotes.splice(i, 1);
            }
          }

          this.setState({
            notes: previousNotes
          })
        })

    }

    addNote(note){
        this.database.push().set({noteContent:note});
     
    }

    removeNote(noteId){
      this.database.child(noteId).remove(); 
    }
  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">

      <div className="Heading">React and firebase todo app</div>
      </div>
      <div className="notesBody">
        {
          this.state.notes.map((note)=>{
            return(
            <Note noteContent={note.noteContent} 
            noteId={note.id} 
            key={note.id} 
            removeNote={this.removeNote}/>
            )
          })
        }
      </div>
      <div className="notesfooter">
        <NoteForm addNote={this.addNote}/>
      </div>
        
      </div>
      
    );
  }
}

export default App;
