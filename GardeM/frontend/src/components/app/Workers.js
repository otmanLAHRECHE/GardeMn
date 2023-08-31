import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import ActionButtons from './ActionsButtons';

import { getAllWorkers, addNewWorker, updateWorker, deleteWorker, getSelectedWorker } from '../../actions/workerActions';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'name', headerName: "NOM", width: 100},
    { field: 'prename', headerName: "PRENOM", width: 100},
    { field: 'service', headerName: "SERVICE", width: 100},
    { field: 'grade', headerName: "GRADE", width: 160},
    { field: 'ccp', headerName: "COMPTE CCP", width: 160 },
    { field: 'tes_exm', headerName: "Actions", width: 180 , renderCell: (params) => (
      <ActionButtons worker_id={params.row.id} />
    ),

   },
  ];
  const theme = useTheme


export default function Workers(){
    const theme = useTheme;

    const [dateFilter, setDateFilter] = React.useState(dayjs());
    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    const [dateFilterError, setDateFilterError] = React.useState("");

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/otmanLAHRECHE">
            EPSP Djanet Garde app
            </Link>{' '}
            -- created by otman LAHRECHE
            {'.'}
          </Typography>
        );
      }


      const handleChangeFilterDate = () =>{
        setDateFilter(newValue);
      }


      return(

        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={2}>

              <Grid item xs={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                  <DesktopDatePicker
                                                          views={['year']}
                                                          label="Selectioner l'annés"
                                                          value={dateFilter}
                                                          onChange={handleChangeFilterDate}
                                                          renderInput={(params) => <TextField {...params} error={dateFilterError[0]}
                                                          helperText={dateFilterError[1]} 
                                                          required/>}
                                                  />

                </LocalizationProvider>

            </Paper>

              </Grid>


              <Grid item xs={12}>

              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
                
              </Paper>
              </Grid>

              

              </Grid>

            </Container>


        </React.Fragment>




      );


}