import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const s1 = {
        "name": "vaibhav",
        "div": "5A2_CSE"
    }

    const [state, setState] = useState(s1)

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "mishu",
                "div": "5A21_CSE"
            })
        }, 1000);
    }



    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;