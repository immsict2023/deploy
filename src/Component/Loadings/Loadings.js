import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'

function Loadings(props) {
    const { loadingStatus } = props
    const [loadingText, setLoadingText] = useState('Loading')

    useEffect(() => {
        const texts = ['Loading', 'Loading.', 'Loading..', 'Loading...']
        let index = 0

        const interval = setInterval(() => {
            index = (index + 1) % texts.length
            setLoadingText(texts[index])
        }, 500) // Change text every 500 milliseconds

        return () => clearInterval(interval)
    }, [])

    return (
        <Modal show={loadingStatus} centered>
            <ModalHeader className='text-white text-center' style={{backgroundColor: '#031B5B'}}>
                <h6>{loadingText}</h6>
            </ModalHeader>
            <ModalBody>
                <div className='d-flex justify-content-center align-items-center' style={{ height: '150px' }}>
                    <div className='spinner-border text-primary' role='status' style={{ width: '3rem', height: '3rem' }}>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                    <h6>Please Wait!!!</h6>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default Loadings
