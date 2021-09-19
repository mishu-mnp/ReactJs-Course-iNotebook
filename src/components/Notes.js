import React, { useContext } from 'react';
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, setNotes } = context;

    return (
        <>
            <div className="row my-2">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
