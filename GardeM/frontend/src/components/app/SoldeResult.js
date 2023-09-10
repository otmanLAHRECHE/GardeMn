import React from "react"
import { PDFViewer } from '@react-pdf/renderer';
import SoldeReport from "../common/PdfResult";
import SoldeReportAdm from "../common/PdfResultAdm";
import SoldeReportPara from "../common/PdfResultPara";
import { useLocation } from "react-router-dom";

export default function Resultat(){
    
    const { state } = useLocation();


  return (
    <div>
    <PDFViewer width="410" height="800">
      <SoldeReport id={state.id}/>
    </PDFViewer>

    
        <PDFViewer width="410" height="800">
        <SoldeReportPara id={state.id}/>
        </PDFViewer>

        <PDFViewer width="410" height="800">
        <SoldeReportAdm id={state.id}/>
        </PDFViewer>

    </div>

    
  );
}