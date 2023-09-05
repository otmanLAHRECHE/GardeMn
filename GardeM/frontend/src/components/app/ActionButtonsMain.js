import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PrintIcon from '@mui/icons-material/Print';



export default function ActionButtonsMain(props) {


    const editEvent = () =>{
        props.childToParent({ id: props.month_id,  operation: "edit"});
    };

    const deleteEvent = () =>{
        props.childToParent({ id: props.month_id,  operation: "delete"});
    };

    const gardeEvent = () =>{
        props.childToParent({ id: props.month_id,  operation: "gardes"});
    };

    const printEvent = () =>{
        props.childToParent({ id: props.month_id,  operation: "print"});
    };

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
           

    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button startIcon={<EditCalendarIcon />} onClick={gardeEvent}>Gardes</Button>
        <Button startIcon={<PrintIcon />} onClick={printEvent}>Imprimer</Button>
        <Button color="success" startIcon={<ChecklistIcon />} onClick={editEvent}>Modifier</Button>
        <Button color="error" startIcon={<DeleteIcon />} onClick={deleteEvent}>Supprimer</Button>
      </ButtonGroup>
        </Container>

    );




}