import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import clsx from 'clsx';
import { DataGrid, GridToolbar, useGridApiRef} from '@mui/x-data-grid';
import Alt from '../layouts/alert';
import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Solde(){



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




            



        </React.Fragment>

    );
}