import React, { useContext, useEffect, useRef, useState } from 'react';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, updateNote } = context;

    const [note, setNote] = useState({ id: "", utitle: "", udescription: "", utag: "" })

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const handleUpdateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag })
    }

    const handleAddClick = (e) => {
        // console.log("Updating note...", note)
        updateNote(note.id, note.utitle, note.udescription, note.utag)
        refClose.current.click();
        props.showAlert("Notes Updated Successfully!", "success")
    }

    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <AddNote showAlert={props.showAlert} />
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
                                    <input type="text" className="form-control" id="utitle" name="utitle" value={note.utitle} aria-describedby="emailHelp" onChange={handleOnChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="udescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="udescription" name="udescription" value={note.udescription} onChange={handleOnChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="utag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="utag" name="utag" value={note.utag} onChange={handleOnChange} minLength={3} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.utitle.length < 5 || note.udescription.length < 5 || note.utag.length < 3} type="button" className="btn btn-primary" onClick={handleAddClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-2">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No Notes to Display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={handleUpdateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </div>
    )
}

export default Notes
