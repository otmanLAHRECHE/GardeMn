import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import clsx from 'clsx';
import { DataGrid, GridToolbar, useGridApiRef} from '@mui/x-data-grid';
import Alt from '../layouts/alert';
import Link from '@mui/material/Link';
import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { getAllGardesOfMonth, syncWorkers, saveGardes } from '../../actions/gardeDetailsActions';
import { getSelectedMonth } from '../../actions/monthActions';



export default function GardeDetails(){

      const columns = [
        { field: 'id', headerName: 'Id', width: 60, hide: true },
        { field: 'worker', headerName: "NOM ET PRENOM", width: 230, valueGetter: (params) =>
        `${params.row.worker.name || ''} ${params.row.worker.prename || ''}`},
        { field: 'service', headerName: 'SERVICE', width: 150, valueGetter: (params) =>
        `${params.row.worker.service || ''}` },
        { field: 'jn', headerName: "JN", width: 100, editable: true},
        { field: 'jw', headerName: "JW", width: 100, editable: true},
        { field: 'jf', headerName: "JF", width: 100, editable: true},
        { field: 'total', headerName: "Total", width: 100, valueGetter: (params) =>
        `${parseInt(params.row.jn) + parseInt(params.row.jw) + parseInt(params.row.jf)}`, cellClassName: (params) => {
            if (params.value == null) {
              return '';
            }
            return clsx('super-app', {
              negative: parseInt(params.value) < 11,
              positive: parseInt(params.value) > 10,
            });
          },},
      ];

      const { state } = useLocation();

      const [name, setName] = React.useState("saving...");

      
  const apiRef = useGridApiRef();

    const theme = useTheme;
    const [month, setMonth] = React.useState();
    const [openDialogSaving, setOpenDialogSaving] = React.useState(false);


    const [data, setData] = React.useState([]);
    
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [loadingButton, setLoadingButton] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loadingPage, setLoadingPage] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseLite, setResponseLite] = React.useState("");
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);


    const handleSave = async() =>{
      let test = true;
      for(let i= 0; i< data.length; i++){
        const r = apiRef.current.getRow(data[i].id);
        const total = parseInt(r.jn)+parseInt(r.jw)+parseInt(r.jf);
        if(String(total) == "NaN" || total > 10){
          test = false;
        }
      }

      if(test){
      setOpenDialogSaving(true);
        const token = localStorage.getItem("auth_token");
        let last = false;

        for(let i= 0; i< data.length; i++){
          const r2 = apiRef.current.getRow(data[i].id);
          if(i == data.length - 1){
            last = true;
          }
          

          const d = {
            "jn":parseInt(r2.jn),
            "jw":parseInt(r2.jw),
            "jf":parseInt(r2.jf),
            "last":last
          }

          //console.log(d);

          setResponseLite(await saveGardes(token, JSON.stringify(d), r2.id));
        }
      }else{
        setResponseErrorSignal(true);
      }
    }

    const handleDialogSavingClose = () =>{
      setOpenDialogSaving(false);
      setName("saving...");
      setLoadingButton(true);

    }

    const handleSync = async() =>{
      setLoadingPage(true);
      const token = localStorage.getItem("auth_token");
      setResponse(await syncWorkers(token, state.id));
    }

    React.useEffect(() => {
      if (responseLite == "error"){
        setResponseErrorSignal(true);
      } else if(responseLite == "end") {
        setLoadingButton(false);
        setName("saving succesfully.");
        setResponse("success");
      }

    }, [responseLite]);

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


    return(
        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Liste des gardes : mois {month ? month.label +" "+ month.year : null}
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Stack direction="row" spacing={1}>
                <Button size="small" onClick={handleSave}>
                    Sauvgarder
                </Button>
                <Button size="small" onClick={handleSync}>
                    Sync les données
                </Button>
              </Stack>

              <Box sx={{ height: 1200, mt: 1 }}>
              <Box
      sx={{
        height: 2000,
        width: '100%',
        '& .cold': {
          backgroundColor: '#b9d5ff91',
          color: '#1a3e72',
        },
        '& .hot': {
          backgroundColor: '#ff943975',
          color: '#1a3e72',
        },
      }}
    >
              <DataGrid 
                 components={{
                  Toolbar: GridToolbar,
                }}
                 rows={data} 
                 columns={columns}
                 loading={loading}
                 rowHeight={50}
                 hideFooterPagination
                 apiRef={apiRef}
                 getCellClassName={(params) => {
                  if (params.field === 'total') {
                    return parseInt(params.value) >= 11 ? 'hot' : 'cold';
                  }
                }}
                 disableRowSelectionOnClick  />

      </Box>
              </Box>

            </Box>


            </Container>

            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            


            <Dialog 
              open={openDialogSaving}
              onClose={handleDialogSavingClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                    {"Sauvgarder les garde"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   {name ? name : null}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                        <LoadingButton
                            onClick={handleDialogSavingClose}
                            loading={loadingButton}
                            loadingPosition="start"
                            startIcon={<CloseIcon />}
                            variant="contained"
                          >
                           <span>Fermer</span>
                        </LoadingButton>
              </DialogActions>


              </Dialog>

            



        </React.Fragment>

    );
}

