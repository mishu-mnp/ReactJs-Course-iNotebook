import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MzBhNDNmOWY3YmU2MWQ4Nzg5Y2I2In0sImlhdCI6MTYzMTg2MDkwN30.6uZQBugCsuQRsxh4O0hVE3O9S7CZSWAzU7cBgaBN9Aw'
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }




    // Add Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MzBhNDNmOWY3YmU2MWQ4Nzg5Y2I2In0sImlhdCI6MTYzMTgxMTE4Nn0.Md_730u_jgCZMSfABhjeYf9c3Kre0TWtKKeVGcDax54'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = {
            "_id": "61443db10a772b6c6423fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "1631862193944",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    // Delete Note
    const deleteNote = (id) => {
        console.log("Deleting node with ID : ", id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Edit or Update Note
    const updateNote = async (id, title, description, tag) => {

        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MzBhNDNmOWY3YmU2MWQ4Nzg5Y2I2In0sImlhdCI6MTYzMTgxMTE4Nn0.Md_730u_jgCZMSfABhjeYf9c3Kre0TWtKKeVGcDax54'
            },
            body: JSON.stringify({ title, description, tag })
        });

        // Logic to edit at client side
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;