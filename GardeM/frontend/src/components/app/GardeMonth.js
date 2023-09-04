import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Slide from '@mui/material/Slide';
import Alt from '../layouts/alert';
import Link from '@mui/material/Link';

import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';



export default function GardeMonth(){
    const theme = useTheme;
    const navigate = useNavigate(); 
    
    const [date, setDate] = React.useState(dayjs());
    
    const [dateFilter, setDateFilter] = React.useState(dayjs());
    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    const [dateFilterError, setDateFilterError] = React.useState("");
    const [data, setData] = React.useState([]);
    const [rowData, setRowData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
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
      }


      const handleChangeFilterDate = (newValue) =>{
        setDateFilter(newValue);
      };

      const handleChangeDate = (newValue) =>{
        setDate(newValue);
      };

      const addMonthOpen = () =>{

      };

      const addMonthClose = () =>{
        setOpen(false);
      };

      const addMonthSave = async() =>{

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

      };


      React.useEffect(() => {
  
        if (response == "error"){
          setResponseErrorSignal(true);
        } else if(response != "") {
          setResponseSuccesSignal(true);
        }
  
      }, [response]);


      React.useEffect(() => {

        setLoading(true);
        setDateFilterError([false, ""]);

        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            var year = dateFilter.get('year');
            setData(await getAllExamenOfYear(token, month, year));
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
                



              <Copyright sx={{ pt: 4 }} />
            </Container>


        </React.Fragment>




      );


}