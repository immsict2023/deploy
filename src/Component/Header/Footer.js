import React from 'react'

function Footer() {
    const date = new Date();
    return (
        <>
        { 
            // Default  className='text-center text-white p-3 footer'
        }
            <div className='text-center text-white p-3' style={{backgroundColor: '#143E69'}}>
                <label><b>IMMS</b> Digital Solutions &copy; 2023 - {date.getFullYear()}</label>
            </div>
        </>
    )
}

export default Footer
