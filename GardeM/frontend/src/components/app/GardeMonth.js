import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Slide from '@mui/material/Slide';
import Alt from '../layouts/alert';
import Link from '@mui/material/Link';

import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import ActionButtonsMain from './ActionButtonsMain';

import Container from '@mui/material/Container';

import { getAllMonthsOfYear, addNewMonth, updateMonth, deleteMonth, getSelectedMonth } from '../../actions/monthActions'



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function GardeMonth(){
    const theme = useTheme;
    const navigate = useNavigate(); 
    
    const [date, setDate] = React.useState("");
    const [dateError, setDateError] = React.useState([false, ""]);
    const [openLoading, setOpenLoading] = React.useState(false);
    
    const [dateFilter, setDateFilter] = React.useState(dayjs());
    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    const [dateFilterError, setDateFilterError] = React.useState("");
    const [data, setData] = React.useState([]);
    const [rowData, setRowData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [responseAlreadySignal, setResponseAlreadySignal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");

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
      };

      const [st, setSt] = React.useState({ id: "",  operation: ""});

   const childToParent = async(childdata) => {
    setSt(childdata);
    if(childdata.operation == "edit"){
      navigate("/Solde",{
          state: {
            id: childdata.id
          }
        });
    }else if(childdata.operation == "delete"){
      setOpenDelete(true);
    }else if(childdata.operation == "gardes"){
      navigate("/GardeDetails",{
        state: {
          id: childdata.id
        }
      });

    }else{
      
    }
  };

      const columns = [
        { field: 'id', headerName: 'Id', width: 60, hide: true },
        { field: 'label', headerName: "MOIS", width: 160},
        { field: 'year', headerName: "ANNEE", width: 160},
        { field: 'tes_exm', headerName: "Actions", width: 550 , renderCell: (params) => (
          <ActionButtonsMain month_id={params.row.id} childToParent={childToParent} />
        ),
       },
      ];

      const handleAddRow = () =>{
        addMonthOpen();
      };


      const handleChangeFilterDate = (newValue) =>{
        setDateFilter(newValue);
      };

      const handleChangeDate = (newValue) =>{
        setDate(newValue);
      };

      const addMonthOpen = () =>{
        setOpen(true);
        setDate("");
        setDateError([false, ""]);
      };

      const addMonthClose = () =>{
        setOpen(false);
      };

      const addMonthSave = async() =>{
        var test = true;
        setOpenLoading(true);
        if(date == null || date == ""){
          test = false;
          setDateError([true, "probleme sur le champ"]);
        };

        if(test){
        const d = {
          "month" : date.get('month') + 1,
          "year" : date.get('year')
        }

        const token = localStorage.getItem("auth_token");
        
        setResponse(await addNewMonth(token, JSON.stringify(d)));

        }else{
          setLoadError(true);
          setOpenLoading(false);
        }
      };

      const updateMonthClose = () =>{
        setOpen(false);
      };

      const updateMonthSave = async() =>{

      };

      const deleteMonthClose = () =>{
        setOpenDelete(false);
      };

      const deleteConfirmation = async() =>{
        setOpenDelete(false);
        const token = localStorage.getItem("auth_token");
        setResponse(await deleteMonth(token, st.id)); 
      };


      React.useEffect(() => {

        
        setOpenLoading(false);
  
        if (response == "error"){
          setResponseErrorSignal(true);
        } else if(response == "exist") {
          setResponseAlreadySignal(true);
        }else if(response != "") {
          setResponseSuccesSignal(true);
        }
  
      }, [response]);


      React.useEffect(() => {

        setLoading(true);
        setOpenLoading(false);
        setDateFilterError([false, ""]);

        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            var year = dateFilter.get('year');
            setData(await getAllMonthsOfYear(token, year));
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };

        if (dateFilter.isValid() == false || dateFilter ==""){
          setDateFilterError([true, "une erreur sur le champ de date"]);
          setDateFilterNotErr(true);
        }else{
          fetchData();
        }

        setOpen(false);
        setOpenUpdate(false);
      }, [response, dateFilter]);

      return(

        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                  <DesktopDatePicker
                                                          views={['year']}
                                                          label="Selectioner l'anné"
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
              <Box sx={{ width: '100%' }}>
                <Stack direction="row" spacing={1}>
                <Button size="small" onClick={handleAddRow}>
                    Ajouter mois de garde
                </Button>
              </Stack>

              <Box sx={{ height: 1200, mt: 1 }}>
                 <DataGrid 
                 components={{
                  Toolbar: GridToolbar,
                }}
                 rows={data} 
                 columns={columns}
                 rowHeight={50}
                 pageSize={15}
                 disableRowSelectionOnClick  />
              </Box>

            </Box>

              </Grid>
            </Grid>


              <Copyright sx={{ pt: 4 }} />

              <Dialog open={open} onClose={addMonthClose}>
                  <DialogTitle>Ajouter mois de garde</DialogTitle>
                    <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        views={['year','month']}
                                                        label="choisir le mois"
                                                        onChange={handleChangeDate}
                                                        renderInput={(params) => <TextField {...params} error={dateError[0]}
                                                          helperText={dateError[1]} 
                                                          required/>}
                                                        
                                                        
                                                />

                                            </LocalizationProvider>
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addMonthClose}>Anuller</Button>
                                <Button onClick={addMonthSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>


            <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteMonthClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"Confirmer la suppression d'un examen"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description">
                                      Êtes-vous sûr de la décision de supprimer le mois avec les garde ?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteMonthClose}>Anuller</Button>
                                      <Button onClick={deleteConfirmation}>Supprimer</Button>
                                    </DialogActions>
                      </Dialog>

            </Container>


        {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
        {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
        {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
        {responseAlreadySignal ? <Alt type='error' message='mois already exist' onClose={()=> setResponseAlreadySignal(false)}/> : null}
        


        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

        </React.Fragment>




      );


}