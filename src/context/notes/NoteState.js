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
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "NodeJS",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "MongoDB",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "BootStrap",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "Github",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "Github",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "Github",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
        {
            "_id": "61443db10a772b6c6f3fde2e",
            "user": "61430a43f9f7be61d8789cb6",
            "title": "Github",
            "description": "Learning NodeJs from CWH",
            "tag": "YouTube",
            "date": "1631862193944",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(initialNotes)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;