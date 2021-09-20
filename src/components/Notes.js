import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag })
    }

    const [note, setNote] = useState({ utitle: "", udescription: "", utag: "" })
    const handleAddClick = (e) => {
        e.preventDefault();
        console.log("Updating note...", note)
    }

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            {/* Button trigger modal */}
            <button ref={ref} style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="utitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="utitle" name="utitle" value={note.utitle} aria-describedby="emailHelp" onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="udescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="udescription" name="udescription" value={note.udescription} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="utag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="utag" name="utag" value={note.utag} onChange={handleOnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-2">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
