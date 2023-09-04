import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';



export default function ActionButtons(props) {


    const editEvent = () =>{
        props.childToParent({ id: props.worker_id,  operation: "edit"});
    };

    const deleteEvent = () =>{
        props.childToParent({ id: props.worker_id,  operation: "delete"});
    };

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
           

    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button color="success" startIcon={<ChecklistIcon />} onClick={editEvent}>Details</Button>
        <Button color="error" startIcon={<DeleteIcon />} onClick={deleteEvent}>Supprimer</Button>
      </ButtonGroup>
        </Container>

    );




}