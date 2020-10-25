import React, { useState } from 'react';
import useStyles from './styles/formStyles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import HOURS_DICT from '../../../helpers/dictionary';

const Form = (props) => {
  const classes = useStyles();
  const [endTime, setEndTime] = useState('');
  const [spanId, setSpanId] = useState(0);

  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleTransfer = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogTitle id='form-dialog-title'>
        <div className='form__title'>
          <Avatar alt={props.name} src={props.avatar} />
          {props.name}
        </div>
      </DialogTitle>
      <form>
        <div className={classes.root}>
          <TextField autoFocus margin='dense' id='start_time' label='Start Time' value={spanId} type='time' size='sm' />
          <TextField
            autoFocus
            margin='dense'
            id='end_time'
            label='End Time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            type='text'
            size='sm'
            placeholder='09:00'
          />
        </div>
      </form>
      <DialogActions>
        <Button onClick={handleTransfer} color='primary'>
          Transfer
        </Button>
        <Button onClick={handleSubmit} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </div>
  );
};

export default Form;
