import React, {useEffect} from 'react';


const About = () => {
    useEffect(() => {
        document.title = "About | PixelPen"
    })
    return (
        <>
            About
        </>
    );
}


export default About;