import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext);

    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2>This is About Page of {a.state.name} from class {a.state.div} </h2>
        </div>
    )
}

export default About
