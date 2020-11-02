import React from 'react';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './styles.scss';
import { user } from '../../controllers';
import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  username: {
    marginLeft: '5px',
    marginBottom: 0,
    fontSize: '14px',
  },
}));

export default (props) => {
  const classes = useStyles();
  const { username, avatar } = JSON.parse(localStorage.user);

  return (
    <div className='navbar'>
      <div className='navbar links__navbar'>
        <a href='#' src='' className='navbar logo__navbar'>
          <img src='images/ori.png' alt='' className='logo_img__navbar'></img>
        </a>
        <div className='navbar right_links__navbar'>
          <a href='#' src='' className='navbar link__navbar'>
            <Avatar alt={username} src={avatar} className={classes.small} />
            <p className={classes.username}>{username}</p>
          </a>
          <a
            href='#'
            src=''
            className='navbar link__navbar'
            {...{
              onClick: () => user.logout(),
              type: 'submit',
            }}
          >
            <LockOutlinedIcon className='icon icon__navbar' />
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};
