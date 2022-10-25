import React, { Component, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Typography } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default function CreateForm({ addTask }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  // const taskTagRef = useRef();

  let REACT_APP_EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
  let REACT_APP_EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
  let REACT_APP_EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY

  const resetState = () => {
    setName('');
    setEmail('');
    setMessage('');
  };

  const form = useRef();

  const sendEmail = (e) => {
    // e.preventDefault();

    emailjs.sendForm(REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, form.current, REACT_APP_EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          alert("Sent email!")
      }, (error) => {
          console.log(error.text);
      });
  }

  // formik validation
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length < 3) {
      errors.name = 'Must be 3 characters or more';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.message) {
      errors.message = 'Required';
    } else if (values.message.length < 20) {
      errors.message = 'Must be 20 characters or more';
    }
  
    return errors;
  };
  

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate,
    onSubmit: (values, {resetState}) => {
      // alert(JSON.stringify(values, null, 2));

      resetState();
    },
  });

  return(
      <Box
        marginX="30%"
        justifyContent="center"
        sx={{
          flexGrow: 1
        }}>
          <Typography
            marginTop="6vh"
            variant='h3'
            textAlign='center'>
            Contact Me
            </Typography>
        <br />
        <br />
        <form ref={form} onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            rowSpacing={4}
          >
            <Grid container item>
              <TextField
                name='name'
                required
                id='name'
                label='Name'
                variant='outlined'
                autoComplete='new-name'
                fullWidth
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={
                  formik.errors.name &&
                  formik.touched.name &&
                  String(formik.errors.name)
                }
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}/>
            </Grid>
            <Grid container item>
              <TextField
                name='email'
                required
                id='email'
                label='Email'
                type='email'
                variant='outlined'
                autoComplete='new-email'
                fullWidth
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={
                  formik.errors.email &&
                  formik.touched.email &&
                  String(formik.errors.email)
                }
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid container item>
              <TextField
                required
                id='message'
                label='Message'
                fullWidth
                multiline
                rows={5}
                error={Boolean(formik.touched.message && formik.errors.message)}
                helperText={
                  formik.errors.message &&
                  formik.touched.message &&
                  String(formik.errors.message)
                }
                value={formik.values.message}
                variant='outlined'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
              <Grid 
                container
                item
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                xs={6}>
                <Button
                  size="large"
                  variant='contained'
                  color='primary'
                  onClick={resetState}
                  endIcon={<DeleteIcon />}
                >
                Clear
                </Button>    
              </Grid>
              <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                xs={6}>
                <Button
                  size="large"
                  variant='contained'
                  color='primary'
                  onClick={formik.handleSubmit}
                  endIcon={<SendIcon />}
                >
                Submit
                </Button> 
              </Grid>
            </Grid>
        </form>
      </Box>
)};