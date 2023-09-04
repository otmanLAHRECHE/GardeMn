import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


import { DataGrid, GridToolbar } from '@mui/x-data-grid';


import Link from '@mui/material/Link';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import ActionButtons from './ActionsButtons';

import { getAllWorkers, addNewWorker, updateWorker, deleteWorker, getSelectedWorker } from '../../actions/workerActions';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


  
  const theme = useTheme

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


export default function Workers(){
    const theme = useTheme;

    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState([false, ""]);

    const [prename, setPrename] = React.useState("");
    const [prenameError, setPrenameError] = React.useState([false, ""]);

    const [service, setService] = React.useState("");
    const [serviceError, setServiceError] = React.useState([false, ""]);

    const [grade, setGrade] = React.useState("");
    const [gradeError, setGradeError] = React.useState([false, ""]);

    const [ccp, setCcp] = React.useState("");
    const [ccpError, setCcpError] = React.useState([false, ""]);


    const [data, setData] = React.useState([]);
    const [rowData, setRowData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [loadError, setLoadError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const [serviceValue, setServiceValue] = React.useState();

    const [st, setSt] = React.useState({ id: "",  operation: ""});

   const childToParent = async(childdata) => {
    setSt(childdata);
    console.log(childdata);
    if(childdata.operation == "edit"){
      setName("");
      setPrename("");
      setGrade("");
      setService(null);
      setCcp("");

      setNameError([false, ""]);
      setPrenameError([false, ""]);
      setGradeError([false, ""]);
      setServiceError([false, ""]);
      setCcpError([false, ""]);

      const token = localStorage.getItem("auth_token");

      setRowData(await getSelectedWorker(token, childdata.id));
    
    }else{

    }
  }

    const columns = [
      { field: 'id', headerName: 'Id', width: 60, hide: true },
      { field: 'name', headerName: "NOM", width: 120},
      { field: 'prename', headerName: "PRENOM", width: 120},
      { field: 'service', headerName: "SERVICE", width: 150},
      { field: 'grade', headerName: "GRADE", width: 160},
      { field: 'ccp', headerName: "COMPTE CCP", width: 170 },
      { field: 'tes_exm', headerName: "Actions", width: 340 , renderCell: (params) => (
        <ActionButtons worker_id={params.row.id} childToParent={childToParent} />
      ),
     },
    ];

      const handleAddRow = () =>{
        addWorkerOpen();
      };

      const changeService = (event) => {
        if (event.target.value == 1){
          setService("Administration");
          setServiceValue(1);

        }else if (event.target.value == 2){
          setService("Urgences");
          setServiceValue(2);
        }else if (event.target.value == 3){
          setService("Pharmacie");
          setServiceValue(3);
        }else if (event.target.value == 0){
          setService("");
          setServiceValue(0);
        }else if (event.target.value == 4){
          setService("Laboratoire");
          setServiceValue(4);
        }else if (event.target.value == 5){
          setService("Radiographie");
          setServiceValue(5);
        }else if (event.target.value == 6){
          setService("Autre");
          setServiceValue(6);
        }
      };


      const addWorkerOpen = () =>{
      setOpen(true);
      setName("");
      setPrename("");
      setGrade("");
      setService(null);
      setCcp("");

      setNameError([false, ""]);
      setPrenameError([false, ""]);
      setGradeError([false, ""]);
      setServiceError([false, ""]);
      setCcpError([false, ""]);

        };


      const addWorkerSave = async() =>{
        setNameError([false, ""]);
        setPrenameError([false, ""]);
        setGradeError([false, ""]);
        setServiceError([false, ""]);
        setCcpError([false, ""]);

        var test = true;

        if(name == "" || name == null){
          test = false;
          setNameError([true, "erreur sur ce champ"]);
        }
        if(prename =="" || prename == null){
          test = false;
          setPrenameError([true, "champ est obligatoire"]);
        }

        if(grade =="" || grade == null){
          test = false;
          setGradeError([true, "champ est obligatoire"]);
        }

        if(service == "" || service ==null){
          test = false;
          setServiceError([true, "champ est obligatoire"]);
        }


        if(ccp == "" || ccp == null){
          test = false;
          setCcpError([true, "champ est obligatoire"]);
        }


        if(test){
          const data = {
            "name": name,
            "prename": prename,
            "service": service,
            "grade": grade,
            "ccp": ccp
          };

          const token = localStorage.getItem("auth_token");
          setResponse(await addNewWorker(token, JSON.stringify(data)));
        }else{
          console.log("error");
          setLoadError(true);
        }



      };

      const addWorkerClose = () =>{
        setOpen(false);
      };


      const updateWorkerClose = () =>{
        setOpenUpdate(false);
      };

      const updateWorkerSave = async() =>{
        setNameError([false, ""]);
        setPrenameError([false, ""]);
        setGradeError([false, ""]);
        setServiceError([false, ""]);
        setCcpError([false, ""]);

        var test = true;


        if(name == "" || name == null){
          test = false;
          setNameError([true, "erreur sur ce champ"]);
        }
        if(prename =="" || prename == null){
          test = false;
          setPrenameError([true, "champ est obligatoire"]);
        }

        if(grade =="" || grade == null){
          test = false;
          setGradeError([true, "champ est obligatoire"]);
        }

        if(service == "" || service ==null){
          test = false;
          setServiceError([true, "champ est obligatoire"]);
        }


        if(ccp == "" || ccp == null){
          test = false;
          setCcpError([true, "champ est obligatoire"]);
        }

        if(test){
          const data = {
            "name": name,
            "prename": prename,
            "service": service,
            "grade": grade,
            "ccp": ccp
          };

          const token = localStorage.getItem("auth_token");
          setResponse(await updateWorker(token, JSON.stringify(data)), st.id);
        }else{
          console.log("error");
          setLoadError(true);
        }
        
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
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            setData(await getAllWorkers(token));
            setLoading(false);
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
        setOpen(false);
        setOpenUpdate(false);
      }, [response]);

      React.useEffect(() => {
        try{
          if (rowData == "no data"){
            setResponseErrorSignal(true);
          } else if(rowData != "") {

          setOpenUpdate(true);

          setName(rowData.name);
          setPrename(rowData.prename);
          setCcp(rowData.ccp);
          setGrade(rowData.grade);
          setService(rowData.service);
          if(rowData.service == "Administarion"){
            setServiceValue(1);
          }else if(rowData.service == "Urgences"){
            setServiceValue(2);
          }else if(rowData.service == "Pharmacie"){
            setServiceValue(3);
          }else if(rowData.service == "Laboratoire"){
            setServiceValue(4);
          }else if(rowData.service == "Radiographie"){
            setServiceValue(5);
          }else if(rowData.service == "Autre"){
            setServiceValue(6);
          }else{
            setServiceValue(0);
          }

          setNameError([false, ""]);
          setPrenameError([false, ""]);
          setGradeError([false, ""]);
          setServiceError([false, ""]);
          setCcpError([false, ""]);
          }
        }catch(e){
          console.log(e)
        }
  
      }, [rowData]);


      return(

        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

            <Box sx={{ width: '100%' }}>
                <Stack direction="row" spacing={1}>
                <Button size="small" onClick={handleAddRow}>
                    Ajouter un travailleur
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
            
            <Copyright sx={{ pt: 4 }} />


            <Dialog open={open} onClose={addWorkerClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>Ajouter un travailleur</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <TextField
                                                  error={nameError[0]}
                                                  helperText={nameError[1]}
                                                  margin="dense"
                                                  id="Nom_de_malade"
                                                  label="Nom de Travailleur"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setName(event.target.value)}}
                                                  required
                                          />
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={prenameError[0]}
                                                  helperText={prenameError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Prenom de travailleur"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setPrename(event.target.value)}}
                                                  required
                                          />
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={gradeError[0]}
                                                  helperText={gradeError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Grade"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setGrade(event.target.value)}}
                                                  required
                                          />
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HIV Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={serviceError[0]}
                                            onChange={changeService}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Administration</MenuItem>
                                              <MenuItem value={2}>Urgences</MenuItem>
                                              <MenuItem value={3}>Pharmacie</MenuItem>
                                              <MenuItem value={4}>Laboratoire</MenuItem>
                                              <MenuItem value={5}>Radiographie</MenuItem>
                                              <MenuItem value={6}>Autre</MenuItem>
                                            

                                            </Select>
                                       </FormControl>  
                                        </Grid>

                                        <Grid item xs={4}>  
                                        <TextField
                                                  error={ccpError[0]}
                                                  helperText={ccpError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="CCP"
                                                  fullWidth
                                                  variant="standard"
                                                  onChange={(event) => {setCcp(event.target.value)}}
                                                  required
                                          />  
                                        
                                        </Grid>

                        
                      </Grid>
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addWorkerClose}>Anuller</Button>
                                <Button onClick={addWorkerSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>


            <Dialog open={openUpdate} onClose={updateWorkerClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>update un travailleur</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <TextField
                                                  error={nameError[0]}
                                                  helperText={nameError[1]}
                                                  margin="dense"
                                                  id="Nom_de_malade"
                                                  label="Nom de Travailleur"
                                                  fullWidth
                                                  variant="standard"
                                                  value={name}
                                                  onChange={(event) => {setName(event.target.value)}}
                                                  required
                                          />
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={prenameError[0]}
                                                  helperText={prenameError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Prenom de travailleur"
                                                  fullWidth
                                                  value={prename}
                                                  variant="standard"
                                                  onChange={(event) => {setPrename(event.target.value)}}
                                                  required
                                          />
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                  error={gradeError[0]}
                                                  helperText={gradeError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="Grade"
                                                  fullWidth
                                                  value={grade}
                                                  variant="standard"
                                                  onChange={(event) => {setGrade(event.target.value)}}
                                                  required
                                          />
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                          <InputLabel required htmlFor="grouped-select">HIV Test</InputLabel>
                                            <Select defaultValue="" id="grouped-select" label="Genre" error={serviceError[0]}
                                            onChange={changeService}
                                            value={serviceValue}>
                                              <MenuItem value={0}>
                                                None
                                              </MenuItem>
                                              <MenuItem value={1}>Administration</MenuItem>
                                              <MenuItem value={2}>Urgences</MenuItem>
                                              <MenuItem value={3}>Pharmacie</MenuItem>
                                              <MenuItem value={4}>Laboratoire</MenuItem>
                                              <MenuItem value={5}>Radiographie</MenuItem>
                                              <MenuItem value={6}>Autre</MenuItem>
                                            

                                            </Select>
                                       </FormControl>  
                                        </Grid>

                                        <Grid item xs={4}>  
                                        <TextField
                                                  error={ccpError[0]}
                                                  helperText={ccpError[1]}
                                                  margin="dense"
                                                  id="No_d_enregistrement"
                                                  label="CCP"
                                                  fullWidth
                                                  value={ccp}
                                                  variant="standard"
                                                  onChange={(event) => {setCcp(event.target.value)}}
                                                  required
                                          />  
                                        
                                        </Grid>

                        
                      </Grid>
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={updateWorkerClose}>Anuller</Button>
                                <Button onClick={updateWorkerSave}>Sauvgarder</Button>
                              </DialogActions>   

                    
            </Dialog>
            
            </Container>


        </React.Fragment>

      );


}