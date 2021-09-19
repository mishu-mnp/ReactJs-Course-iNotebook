import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "ReactJs",
            "description": "Learning React from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c6f345fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "NodeJS",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c126f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "MongoDB",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b116c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "BootStrap",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c68924f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "Github",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772223b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "Github",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c675f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "Github",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(initialNotes)


    // Add Note
    const addNote = (title, description, tag) => {
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
    const deleteNote = () => {

    }

    // Edit or Update Note
    const updateNote = () => {

    }




    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;