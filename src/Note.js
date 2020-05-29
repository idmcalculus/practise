import React from 'react';

const Note = ({ note, deleteNote }) => {
	return (
		<>
			<li>
				{note.content} &nbsp;
				<button onClick={()=>{deleteNote(note.id)}}>delete</button>
			</li>
		</>
	)
}

export default Note;