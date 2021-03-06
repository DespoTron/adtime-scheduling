import React, { useState } from 'react';
import './employeeGrid.scss';
import { Dialog, DialogActions, DialogTitle, Button, TextField, Avatar } from '@material-ui/core';
import { HOURS_DICT, ERROR_MESSAGES_DICT } from '../../../helpers/dictionary';
import TransferShiftMenuButton from './TransferShiftMenuButton';
import CategoryButton from './CategoryButton';
import useStyles from './styles/formStyles';
import useVisualMode from '../../../hooks/useVisualMode';
import Transfer from '../../Schedule/components/confirm/Confirmtransfer';
import Delete from '../../Schedule/components/confirm/Confirmdelete';
import { user } from '../../../controllers';
import classNames from 'classnames';

const EmployeeGrid = (props) => {
  const role = user.getRole();
  const { user_id } = JSON.parse(localStorage.user);
  const classes = useStyles();
  const { shift_id, users, date, categories, groupCategorySlotMap } = props;
  const event_date = date;
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [categorySelected, setCategorySelected] = useState(categories[0] || {});
  const [warning, setWarning] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const clickGrid = (e) => {
    setOpen(true);
    const grid_id = parseInt(e.target.attributes[1].value) + 1;
    const start_time = HOURS_DICT[grid_id];
    setStartTime(start_time);
    if (shift_id && shift_id.includes(grid_id)) {
      setError(`${ERROR_MESSAGES_DICT['DOUBLE_BOOKED']} at ${grid_id + 8}:00`);
      return;
    }
  };

  const reset = () => {
    setError('');
    setSelected('');
    setCategorySelected({});
    setOpen(false);
  };

  const validate = (e) => {
    const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])?$/;
    if (!endTime.match(timeRegex)) {
      setError(ERROR_MESSAGES_DICT['TIME_IS_STRING']);
      return;
    }

    if (!endTime) {
      setError(ERROR_MESSAGES_DICT['CANNOT_BE_BLANK']);
      return;
    }
    if (endTime > '21:01') {
      setError(ERROR_MESSAGES_DICT['AFTER_9PM']);
      return;
    }

    // // convert end_time to shift_id
    const endTimeShiftId = parseInt(endTime) - 8;
    // // FIX THIS LATER. BUG EXISTS
    if (!selected && shift_id && shift_id.includes(endTimeShiftId - 1)) {
      setError(`${ERROR_MESSAGES_DICT['DOUBLE_BOOKED']} at ${endTimeShiftId + 8}:00`);
      return;
    }

    //validate if shift transferred to employee that will be double booked
    // if(selected && selected's shift_id arrays includes endTimeShiftId){
    // setError(ERROR_MESSAGES_DICT['DOUBLE_BOOKED'])
    // }

    submit();
  };

  const submit = () => {
    const user_id = props.id;
    const start_time = startTime;
    const end_time = endTime;
    const category_id = categorySelected.id;
    const transferToUserId = selected.id;

    if (!selected) {
      props.submitShift(user_id, start_time, end_time, event_date, category_id);
    } else {
      props.transferShiftId(user_id, start_time, end_time, transferToUserId, event_date);
    }
    reset();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    remove();
  };

  const openWarningDialog = () => {
    setWarning(true);
  };

  const closeWarningDialog = () => {
    setWarning(false);
  };

  const deleteConfirmOpen = () => {
    setDeleteConfirm(true);
  };

  const deleteConfirmClose = () => {
    setDeleteConfirm(false);
  };

  const remove = () => {
    const user_id = props.id;
    const start_time = startTime;
    const end_time = endTime;
    const category_id = categorySelected.id;

    props.removeShift(user_id, start_time, end_time, event_date, category_id);

    reset();
  };

  const renderSpan = Array.from({ length: 12 }, (x, i) => {
    const gridClassNames = classNames({
      [`grid__${i + 1}`]: true || (groupCategorySlotMap && groupCategorySlotMap.workingShift),
      second_child_margin_left: i === 1,
      unavailable:
        groupCategorySlotMap && groupCategorySlotMap.unavailable && groupCategorySlotMap.unavailable.includes(i + 1),
      shifts:
        (groupCategorySlotMap && groupCategorySlotMap.interview && groupCategorySlotMap.interview.includes(i + 1)) ||
        (groupCategorySlotMap && groupCategorySlotMap.lecture && groupCategorySlotMap.lecture.includes(i + 1)) ||
        (groupCategorySlotMap && groupCategorySlotMap.breakout && groupCategorySlotMap.breakout.includes(i + 1)),
    });

    // check if availability
    if (groupCategorySlotMap) {
      if (groupCategorySlotMap.unavailable && groupCategorySlotMap.unavailable.includes(i + 1)) {
        return (
          <span
            key={i}
            className={gridClassNames}
            // className={`grid__${i + 1} unavailable`}
            data-id={i}
          >
            <p className='hide'>unavailable</p>
          </span>
        );
      } else if (
        groupCategorySlotMap &&
        groupCategorySlotMap.interview &&
        groupCategorySlotMap.interview.includes(i + 1)
      ) {
        const background = groupCategorySlotMap.interview.includes(i + 1) ? props.color : '#eeeeee';
        return (
          <span
            key={i}
            className={gridClassNames}
            // className={`grid__${i + 1} shifts`}
            data-id={i}
            onClick={clickGrid}
            style={{ backgroundColor: `${background}` }}
          >
            <span className='grid__badge'></span>
            <p className='events'>interview</p>
          </span>
        );
      } else if (groupCategorySlotMap && groupCategorySlotMap.lecture && groupCategorySlotMap.lecture.includes(i + 1)) {
        const background = groupCategorySlotMap.lecture.includes(i + 1) ? props.color : '#eeeeee';
        return (
          <span
            key={i}
            className={gridClassNames}
            // className={`grid__${i + 1} shifts`}
            data-id={i}
            onClick={clickGrid}
            style={{ backgroundColor: `${background}` }}
          >
            <span className='grid__badge'></span>
            <p className='events'>lecture</p>
          </span>
        );
      } else if (
        groupCategorySlotMap &&
        groupCategorySlotMap.breakout &&
        groupCategorySlotMap.breakout.includes(i + 1)
      ) {
        const background = groupCategorySlotMap.breakout.includes(i + 1) ? props.color : '#eeeeee';
        return (
          <span
            key={i}
            className={gridClassNames}
            // className={`grid__${i + 1} shifts`}
            data-id={i}
            onClick={clickGrid}
            style={{ backgroundColor: `${background}` }}
          >
            <span className='grid__badge'></span>
            <p className='events'>breakout</p>
          </span>
        );
      } else {
        const background =
          groupCategorySlotMap.workingShift && groupCategorySlotMap.workingShift.includes(i + 1)
            ? props.color
            : '#eeeeee';
        return (
          <span
            key={i}
            className={gridClassNames}
            // className={`grid__${i + 1}`}
            data-id={i}
            onClick={clickGrid}
            style={{ backgroundColor: `${background}` }}
          />
        );
      }
    } else {
      const background = '#eeeeee';
      return (
        <span
          key={i}
          className={gridClassNames}
          // className={`grid__${i + 1}`}
          data-id={i}
          onClick={clickGrid}
          style={{ backgroundColor: `${background}` }}
        />
      );
    }
  });

  const errorElement = <section className={classes.error}>{error}</section>;

  const transferShiftSelected = (
    <>
      <img src='images/swap.png' alt='swap' className={classes.swap_img__menu}></img>
      <div className={classes.flex}>
        <Avatar alt={selected.name} src={selected.avatar} />
        <p className={classes.name}>{selected.name}</p>
      </div>
    </>
  );

  return (
    <div className='entire_employee__grid'>
      <div className='employee_grid'>{renderSpan}</div>
      <Dialog open={open} onClose={handleClose} maxWidth='lg'>
        <DialogTitle className={classes.title__dialog}>Add / Transfer Shift</DialogTitle>
        <div className={classes.flex}>
          <div className={classes.flex}>
            <Avatar alt={props.name} src={props.avatar} />
            <p className={classes.name}>{props.name}</p>
          </div>
          {selected && transferShiftSelected}
        </div>
        {error && errorElement}
        {/* <section className={classes.error}>{error && errorElement}</section> */}
        {/* <section>{date}</section> */}

        <div className={classes.root}>
          <TextField autoFocus margin='dense' id='start_time' label='Start Time' value={startTime} type='time' />
          <TextField
            autoFocus
            margin='dense'
            id='end_time'
            label='End Time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            type='text'
            placeholder={parseInt(startTime) + 1 + ':00'}
          />
        </div>

        <DialogActions>
          <CategoryButton
            categories={categories}
            setCategorySelected={setCategorySelected}
            categorySelected={categorySelected}
          />
          {((error && props.id === user_id) || role === 'admin') && (
            <TransferShiftMenuButton
              users={users}
              setSelected={setSelected}
              setCategorySelected={categorySelected.id}
            />
          )}

          <Button onClick={reset} variant='contained'>
            Back
          </Button>
          {role === 'admin' && (
            <Button onClick={deleteConfirmOpen} color='secondary' variant='contained'>
              Delete
            </Button>
          )}
          <Dialog open={deleteConfirm}>
            <Delete
              onConfirm={handleDelete}
              message={'Are you sure you want to delete these shift(s)?'}
              onCancel={deleteConfirmClose}
            />
          </Dialog>
          {!error && role === 'admin' && (
            <Button onClick={validate} color='primary' variant='contained'>
              Submit
            </Button>
          )}
          {selected && (
            <>
              <Button onClick={openWarningDialog} color='primary' variant='contained'>
                Transfer
              </Button>
              <div className={classes.warning}>
                <Dialog variant='filled' open={warning}>
                  <Transfer
                    onConfirm={validate}
                    message={'Are you sure you want to transfer the shift(s)?'}
                    onCancel={closeWarningDialog}
                  />
                </Dialog>
              </div>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeGrid;
