import React from 'react'

const Noteitem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card  my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="container d-flex justify-content-between">
                        <i className="fas fa-trash-alt" style={{ cursor: "pointer" }}></i>
                        <i className="far fa-edit" style={{ cursor: "pointer" }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
