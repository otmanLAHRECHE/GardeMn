import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Alt from '../layouts/alert';
import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { getSelectedMonth } from '../../actions/monthActions';
import { getAllSoldesOfMonth } from '../../actions/soldeActions'

export default function Solde(){

    
    const { state } = useLocation();

    
    const theme = useTheme;
    const [month, setMonth] = React.useState();
    const [data, setData] = React.useState([]);
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);


    const columns = [
        { field: 'id', headerName: 'Id', width: 60, hide: true },
        { field: 'work', headerName: "العامل", width: 160},
        { field: 'net', headerName: "الخام", width: 120},
        { field: 'assurance', headerName: 'إقتطاع الضمان %9', width: 140},
        { field: 'm_assurance', headerName: 'إقتطاع الضريبة %5', width: 140},
        { field: 'taxes', headerName: 'مجموع الإقتطاعات', width: 140},
        { field: 'sld', headerName: 'صافي الدفع', width: 140},
      ];

    React.useEffect(() => {

        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            setMonth(await getSelectedMonth(token, state.id));
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
      }, []);

      React.useEffect(() => {

        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            setData(await getAllSoldesOfMonth(token, state.id));
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
      }, []);


    return(
        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Raport des gardes : mois {month ? month.label +" "+ month.year : null}
            </Typography>
            <Box sx={{ width: '100%' }}>

              <Box sx={{ height: 1200, mt: 1 }}>
              
              <DataGrid
                 rows={data} 
                 columns={columns}
                 loading={loading}
                 rowHeight={50}
                 hideFooterPagination
                 disableRowSelectionOnClick  />

              </Box>

            </Box>


            </Container>



            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            
            



        </React.Fragment>

    );
}