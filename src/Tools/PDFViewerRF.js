import React from 'react';
import ReactPDF, { PDFDownloadLink, ReactPD, PDFViewer } from '@react-pdf/renderer';
import GenerateStudentRF from '../Component/Registrar/Modal/Enlistment/EnlistmentChild/generateStudentRF';

const PDFViewerRF = () => (
  ReactPDF.render(<GenerateStudentRF />)
);

export default PDFViewerRF;
