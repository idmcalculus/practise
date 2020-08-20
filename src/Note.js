import React from 'react';

const Note = ({ note, deleteNote, toggleImportance }) => {
	const label = note.important ? 'make not important' : 'make important';

	return (
		<>
			<li className='note'>
				{note.content} &nbsp;
				<button onClick={()=>{deleteNote(note.id)}}>delete</button> &nbsp;
				<button onClick={toggleImportance}>{label}</button>
			</li>
		</>
	)
}

export default Note;