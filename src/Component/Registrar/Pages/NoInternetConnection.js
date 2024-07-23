
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';

const NoInternetConnection = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) {
    return null; 
  }

  return (
    <>
        <Modal
            show={!online}
            centered
        >
            <ModalHeader className='bg-warning'>
                <div className='container-fluid'>
                    <h6>Warning!!!</h6>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className='container-fluid'>
                    <h4>No Internet Connection!</h4>
                </div>
            </ModalBody>
        </Modal>
    </>
  );
};

export default NoInternetConnection;
