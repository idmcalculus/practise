import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './Note';

const App = () => {
	
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		console.log('effect');
		axios
		  .get('http://localhost:3005/notes')
		  .then(response => {
			console.log('promise fulfilled');
			setNotes(response.data);
		  });
	  }, []);
	  console.log('render', notes.length, 'notes');

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
		  content: newNote,
		  date: new Date().toISOString(),
		  important: Math.random() < 0.5,
		  id: notes.length + 1,
		};
		setNotes(notes.concat(noteObject));
		setNewNote('');
	};

	const notesToShow = showAll ? notes : notes.filter(note => note.important);

	const deleteNote = (id) => {
		const nowNotes = [...notes];
		const foundNote = nowNotes.find(note => id === note.id);
		const foundNoteIndex = nowNotes.indexOf(foundNote);
		nowNotes.splice(foundNoteIndex, 1);
		setNotes(nowNotes);
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	return (
	  <div>
		<h1>Notes</h1>
		<div>
			<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all' }
			</button>
      	</div>
		<ul>
		  {notesToShow.map((note) => 
		  	<div key={note.id}>
				<Note note={note} deleteNote={deleteNote} />
			</div>
		  )}
		</ul>
		<form onSubmit={addNote}>
			<input value={newNote}
				onChange={handleNoteChange}
			/>
			<button type="submit">save</button>
      	</form> 
	  </div>
	)
}

export default App;