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



export default function GardeMonth(){
    const theme = useTheme;

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/otmanLAHRECHE">
              EPSP Djanet Garde calculator
            </Link>{' '}
            -- created by otman LAHRECHE
            {'.'}
          </Typography>
        );
      }


      return(

        <React.Fragment>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <h1>Garde Month</h1>
            </Container>


        </React.Fragment>




      );


}