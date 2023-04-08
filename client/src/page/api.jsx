import React, {useEffect} from "react";

const Api = () => {
    useEffect(() => {
        document.title = "Api Documentation | PixelPen"
    })

    return (
        <>
            <h1 className='flex justify-center items-end px-3 py-2 text-[22px]'>API Documentation</h1>
        </>
    );
}

export default Api