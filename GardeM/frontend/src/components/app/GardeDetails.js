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

import clsx from 'clsx';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Slide from '@mui/material/Slide';
import Alt from '../layouts/alert';
import Link from '@mui/material/Link';
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import ActionButtonsMain from './ActionButtonsMain';

import Container from '@mui/material/Container';

import { getAllGardesOfMonth, syncWorkers } from '../../actions/gardeDetailsActions';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function GardeDetails(){

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

      const columns = [
        { field: 'id', headerName: 'Id', width: 60, hide: true },
        { field: 'worker', headerName: "Nom et prenom", width: 300, valueGetter: (params) =>
        `${params.row.worker.name || ''} ${params.row.worker.prename || ''}`},
        { field: 'jn', headerName: "JN", width: 100, editable: true},
        { field: 'jw', headerName: "JW", width: 100, editable: true},
        { field: 'jf', headerName: "JF", width: 100, editable: true},
        { field: 'total', headerName: "Total", width: 100, valueGetter: (params) =>
        `${parseInt(params.row.jn) + parseInt(params.row.jw) + parseInt(params.row.jf)}`, cellClassName: (params) => {
            if (params.value == null) {
              return '';
            }
            return clsx('super-app', {
              negative: params.value < 11,
              positive: params.value > 10,
            });
          },},
      ];

      const { state } = useLocation();

    const theme = useTheme;
    const navigate = useNavigate(); 

    const [data, setData] = React.useState([]);
    
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    
    
    const [openLoading, setOpenLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loadingPage, setLoadingPage] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);




    const handleSave = async() =>{

    }

    const handleResete = () =>{

    }

    const handleSync = async() =>{
      setLoadingPage(true);
      const token = localStorage.getItem("auth_token");
      setResponse(await syncWorkers(token, state.id));
    }


    React.useEffect(() => {
      setLoadingPage(false);
      if (response == "error"){
        setResponseErrorSignal(true);
      } else if(response != "") {
        setResponseSuccesSignal(true);
      }

    }, [response]);

    React.useEffect(() => {
      setLoading(true);
      setLoadingPage(false);
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("auth_token");
          setData(await getAllGardesOfMonth(token, state.id));
          setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }, [response]);


    return(
        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ width: '100%' }}>
                <Stack direction="row" spacing={1}>
                <Button size="small" onClick={handleSave}>
                    Sauvgarder
                </Button>
                <Button size="small" onClick={handleResete}>
                    Resete la liste
                </Button>
                <Button size="small" onClick={handleSync}>
                    Sync les données
                </Button>
              </Stack>

              <Box sx={{ height: 1200, mt: 1 }}>
                 <DataGrid 
                 components={{
                  Toolbar: GridToolbar,
                }}
                 rows={data} 
                 columns={columns}
                 loading={loading}
                 rowHeight={50}
                 pageSize={15}
                 disableRowSelectionOnClick  />
              </Box>

            </Box>


            </Container>

            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingPage}
            >
                <CircularProgress color="inherit" />
            </Backdrop>



        </React.Fragment>

    );
}

