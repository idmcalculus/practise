import React, {useState, useEffect} from 'react';
import noteService from './services/notes';
import Note from './Note';
import Notification from './Notification';
import './index.css';
import Footer from './Footer';

const App = () => {
	
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		noteService
		.getAll()
		.then(initialNotes => {
			setNotes(initialNotes);
		});
	}, []);

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
		  content: newNote,
		  date: new Date(),
		  important: Math.random() < 0.5,
		};

		noteService
		.create(noteObject)
		.then(createdNote => {
			setNotes(notes.concat(createdNote));
			setNewNote('');
		});
	};

	const notesToShow = showAll ? notes : notes.filter(note => note.important);

	const deleteNote = (id) => {
		noteService
		.deleteNote(id)
		.then(response => {
			if (response) {
				setNotes(notes.filter(note => id !== note.id));
			}
		})
		.catch(error => {
			setErrorMessage(
				`This note does not exist on the server, removing it from view`
			  );
			  setTimeout(() => {
				setErrorMessage(null);
			  }, 5000);
			setNotes(notes.filter(n => n.id !== id));
		});
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id);
		const changedNote = { ...note, important: !note.important };
	  
		noteService
		.update(id, changedNote)
		.then(updatedNote => {
		  setNotes(notes.map(note => note.id !== id ? note : updatedNote));
		})
		.catch(error => {
			setErrorMessage(
				`Note '${note.content}' was already removed from server`
			  );
			  setTimeout(() => {
				setErrorMessage(null);
			  }, 5000);
			setNotes(notes.filter(n => n.id !== id));
		});
	};
	

	return (
	  <div>
		<h1>Notes</h1>
		<Notification message={errorMessage} />
		<div>
			<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all' }
			</button>
      	</div>
		<ul>
		  {notesToShow.map((note) => 
		  	<div key={note.id}>
				<Note note={note} deleteNote={deleteNote} toggleImportance={()=>toggleImportanceOf(note.id)} />
			</div>
		  )}
		</ul>
		<form onSubmit={addNote}>
			<input value={newNote}
				onChange={handleNoteChange}
			/>
			<button type="submit">save</button>
      	</form> 
		<Footer />
	  </div>
	)
}

export default App;