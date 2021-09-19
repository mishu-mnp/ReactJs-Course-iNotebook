import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note } = props;
    const context = useContext(noteContext)
    const { deleteNote } = context;

    return (
        <div className="col-md-3">
            <div className="card  my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="container d-flex justify-content-between">
                        <i className="fas fa-trash-alt" style={{ cursor: "pointer" }} onClick={() => { deleteNote(note._id) }}></i>
                        <i className="far fa-edit" style={{ cursor: "pointer" }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
