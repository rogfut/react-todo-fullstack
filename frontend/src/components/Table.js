import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';


export default function BasicTable() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  const isChecked = (rowId) => {
    return checkedItems.includes(rowId);
  }

  const handleDeleteChecked = () => {
    setTasks(
      tasks.filter(task => !checkedItems.includes(task.id))
    );
  }

  const handleOnCheck = (task, e) => {
    setCount(count + 1)
    if(e.target.checked) {
      console.log("box is checked")
      console.log("task id is: " + task.id)
      setCheckedItems(current => [...current, task.id])
    } else {
      console.log("box is not checked")
      setCheckedItems(checkedItems.filter(id => id !== task.id))
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/data')
      .then(response => setTasks(response.data.filter(data => data.status !== 'completed')))
  }, []);

  useEffect(() => {
    setCheckedItems([]);
  }, []);

  useEffect(() => {
    if(count > 0) {
      const timeout = setTimeout(() => {
        console.log('This will run 3 seconds!');
        console.log(checkedItems);
        handleDeleteChecked();
        console.log(JSON.stringify(checkedItems));
        axios
          .post('http://localhost:5000/data/complete', { ids: checkedItems})
          .then(response => console.log(response));
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [checkedItems]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Details</TableCell>
            <TableCell align="left">Priorty</TableCell>
            <TableCell align="left">Tags</TableCell>
            <TableCell align="left">Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((row) => (
            <TableRow
              key={row.id}
              sx={[
                {
                  '&:last-child td, &:last-child th': { border: 0 }
                },
                {...(isChecked(row.id) === true && {
                  '&:last-child td, &:last-child th': { border: 0 },
                  visibility: "hidden",
                  opacity: 0,
                  transition: "visibility 0s 3s, opacity 3s linear",
                })},
              ]}
            >
              <TableCell>
                <IconButton aria-label="complete" color="primary" onClick={e => handleOnCheck(row, e)}>
                  <Checkbox />
                </IconButton>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.details}</TableCell>
              <TableCell align="left">{row.priority}</TableCell>
              <TableCell align="left">{row.tags}</TableCell>
              <TableCell align="left">{row.created_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
