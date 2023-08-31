import * as React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';



export default function ActionButtons(props) {

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
    >

    <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button color="success" startIcon={<ChecklistIcon />}>Details/Modifier</Button>
        <Button color="error" startIcon={<DeleteIcon />}>Supprimer</Button>
      </ButtonGroup>

    </Paper>
        </Container>

    );




}