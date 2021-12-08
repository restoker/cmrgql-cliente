import React from 'react'

const Loading = () => {
    return (
        <>
            <div className="flex justify-center items-center absolute z-30 h-full w-full backdrop-blur-xl overflow-hidden bg-white opacity-50 backdrop-filter">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600 relative">
                </div>
                {/* <p className='absolute top-0 text-black'>Loading...</p> */}
            </div>
        </>
    )
}

export default Loading
