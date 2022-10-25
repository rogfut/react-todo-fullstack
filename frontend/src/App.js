import './styles/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './styles/CreateForm.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTasks from './pages/MyTasks';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AppBar from './components/AppBar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#fff"
    }
  },
});

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = "GET, POST, PATCH, PUT, DELETE, OPTIONS";
axios.defaults.headers.post['Content-Type'] = 'application/json'

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Router>
      <Box height="100vh">
      <AppBar></AppBar>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/tasks" element={<MyTasks/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App;