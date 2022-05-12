import React, { useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import { Modal, Box, Button, TextField } from "@mui/material";
import '../BookDetail/bookdetail.css'

import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";


export default function Calendar( {events, setEvents} ) {
  const [eventTime, setEventTime] = useState(new Date());
  const [eventTopic, setEventTopic] = useState('')
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = () => {


   const data = {
      bookclubName: 'Read With Haley (Official)',
      eventTime: moment(eventTime),
      eventTopic
    };
    const allEvents = events.concat(data);
    setEvents(allEvents);

    axios.post('http://localhost:3030/events/create', data)
    .then(res => {
      console.log('Your event is posted: ', res.data)
    })
    .catch(err => {
      console.error(err);
    })

    handleClose();
  }

  const handleAddTopic = (e) => {
    setEventTopic(e.target.value)
  }



  return (
    <>
      <button type='button' onClick={handleOpen}>CREATE AN EVENT</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box  className='calendarModalBox'>
           {/* <h3>Bookclub:</h3>
           <p>Harry Potter</p> */}
           <div className='calendarModalDate' >
            Pick event time:
           <DateTimePicker value={eventTime} onChange={(time) => setEventTime(time)}  />
           </div>

           <div className='modalTopic'>
             Group meeting topic:
             <TextField id="filled-basic" label="Entre topic here..." variant="filled" onChange={handleAddTopic}/>
           </div>

           <div className='modalcancelbtn'>
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
          </div>
          <div className='modalsubmitbtn'>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </div>
        </Box>
      </Modal>
    </>


  )
}

