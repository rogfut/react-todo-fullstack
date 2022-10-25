import React, { Component, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia, TextField, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { borderRadius, maxHeight } from '@mui/system';
import megamind from '../static/images/cards/megamind.png';

export default function LoginForm () {

  const form = useRef();

  return (
    <Box
    marginX="35%"
    justifyContent="center"
    sx={{
      flexGrow: 1
    }}>
      <Typography
        marginTop="6vh"
        variant='h3'
        textAlign='center'>
        Login
      </Typography>
      <br />
      <br />
      <form noValidate='' ref={form}>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          rowSpacing={4}
        >
          <Grid container item>
              <TextField
                fullWidth
                justifyContent="center"
                required
                type='text'
                color="primary"
                placeholder='Username'/>
            </Grid>
            <Grid container item>
              <TextField
                fullWidth
                justifyContent="center"
                required
                type='password'
                placeholder='Password'/>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              xs={6}>
              <Button
                variant="contained">
                Login
              </Button>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              flexDirection="row">
              <Card sx={{ 
                minWidth: 345, 
                borderRadius: 2}}>
                <CardActionArea component={Link} to="/signup">
                  <CardMedia
                  component="img"
                  height="180"
                  image={megamind}
                  />
                  <CardContent>
                    <Typography variant='h6'>No Account?
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Box>
  )
};