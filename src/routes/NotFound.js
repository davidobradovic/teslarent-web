import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen flex items-center justify-center flex-col'>
            <h1 className='text-3xl font-bold'>Page not found</h1>
            <button onClick={() => navigate(-1)} className='py-1.5 px-4 bg-gray-100 hover:bg-gray-200 rounded mt-10'>Go back</button>
        </div>
    )
}

export default NotFound