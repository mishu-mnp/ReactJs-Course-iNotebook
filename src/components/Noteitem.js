import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note, updateNote, showAlert } = props;
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const handleDelete = () => {
        deleteNote(note._id);
        showAlert("Notes Deleted Successfully", "success");
    }

    return (
        <div className="col-md-3">
            <div className="card  my-3">
                <div className="card-body text-center">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <div className="container d-flex justify-content-between">
                        <i className="fas fa-trash-alt" style={{ cursor: "pointer" }} onClick={() => { handleDelete() }}></i>
                        <i className="far fa-edit" onClick={() => { updateNote(note) }} style={{ cursor: "pointer" }}></i>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Noteitem
