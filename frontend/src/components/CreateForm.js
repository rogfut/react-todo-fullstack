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
import InputTags from './InputTags';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Fade from '@mui/material/Fade';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default function CreateForm({ addTask }) {
  const [name, setName] = useState('');
  const [details, setdetails] = useState('');
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState('');
  // const taskTagRef = useRef();

  // clears form after submission, might be a Formik way to do this
  const resetState = () => {
    setName('');
    setdetails('');
    setTags([]);
    setPriority('normal');
  };

  // tag state handlers
  const handleTagsInput = e => {
    setTags(e.target.value);
  };
  const handleTagsDelete = (value) => {
    const newTags = tags.filter((val) => val !== value);
    setTags(newTags)
    console.log(tags)
  };
  const handleTagsKeyPress = (e) => {
    console.log(e.target.value)
    // backspace or delete key removes the previous tag
    if (e.keyCode === 8 && e.target.value === "") {
      const tagsMinusOne = tags.slice(0, -1);
      setTags([...tagsMinusOne])
    }
    // disable enter key to avoid having linebreaks in tag
    if (e.keyCode === 13) {
      e.preventDefault()
    }
    // decorate input value as tag on spacebar if tag doesnt already exist
    if (e.keyCode === 32) {
      e.preventDefault()
      const value = e.target.value.trim();
      if(tags.indexOf(value) === -1) {
        console.log(value)
        console.log(tags.indexOf(value))
        setTags([...tags, value])
        e.target.value = ""
      } else {
        e.target.value = ""
      }
    }
  }

  const form = useRef();

  // formik validation
  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length < 3) {
      errors.name = 'Must be 3 characters or more';
    }
  
    return errors;
  };
  

  const formik = useFormik({
    initialValues: {
      name: '',
      details: '',
      tags: [],
      priority: 'normal'
    },
    validate,
    onSubmit: (values, clearTags) => {
      // alert(JSON.stringify(values, null, 2));
      const formData = new FormData();
      formData.append("name", values.name)
      formData.append("details", values.details)
      formData.append("priority", values.priority)
      formData.append("tags", tags)
      axios.post('http://localhost:5000/data/create',  formData)
      .then(res => {
        console.log(res);
        formik.setSubmitting(false);
        formik.resetForm();
        setTags([]);
        formik.setStatus('success');
        return new Promise(resolve => setTimeout(() => resolve(formik.setStatus('')), 3000));
      })
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
            Create New Task
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
                name='details'
                required
                id='details'
                label='Task details'
                type='text'
                variant='outlined'
                autoComplete='new-task-details'
                fullWidth
                multiline
                rows={2}
                error={Boolean(formik.touched.details && formik.errors.details)}
                helperText={
                  formik.errors.details &&
                  formik.touched.details &&
                  String(formik.errors.details)
                }
                value={formik.values.details}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid container item>
              <InputTags
              handleTagsInput={handleTagsInput}
              handleTagsDelete={handleTagsDelete}
              handleTagsKeyPress={handleTagsKeyPress}
              tags={tags}
              >
              </InputTags>
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
                  // onClick={resetState}
                  onClick={formik.resetForm}
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
                  disabled={Boolean(formik.isSubmitting)}
                  onClick={formik.handleSubmit}
                  endIcon={<SendIcon />}
                >
                Submit
                </Button> 
              </Grid>
              <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                xs={6}>
                <Fade
                  in={formik.status === 'success'}
                  timeout={1000}>{
                    <Alert
                    severity="success"
                    icon={<CheckIcon fontSize="inherit"/>}
                    >Task Created!</Alert> 
                }</Fade>
              </Grid>
            </Grid>
        </form>
      </Box>
)};