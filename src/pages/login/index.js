import React, { useEffect } from 'react';
import './styles.scss';
import {
  auth,
} from 'services'
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core'
import { AccountCircle, LockRounded } from '@material-ui/icons'

export default () => {
  return (
    <div>
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={6}>
          <img src="https://gearheart.io/media/images/shutterstock_1523635688.original.jpg" 
               style={
                 { width: '100%', 
                 height: '100%', 
                 objectFit: 'cover'}
               } alt="" />

        </Grid>
        <Grid 
          container item xs={12} 
          sm={6} 
          alignItems="center" 
          direction="column" 
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div />
          <div style={{ display: 'flex', flexDirection: "column", madWidth: 400, minWidth: 300}}>
            <Grid container justify="center">
              <img 
                src="https://financesonline.com/uploads/2019/08/Acuity-Scheduling-logo1.png"
                width={200} 
                alt="logo" 
              />
            </Grid>
            <TextField 
              label="Username" 
              margin="normal" 
              InputProps={{ 
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment> 
                ),
              }} 
            />
            <TextField 
              type="password"
              label="Password" 
              margin="normal" 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRounded />
                  </InputAdornment> 
                ),
              }}
            />
            <div style={{ height: 20}} />
            <Button color="primary" variant="contained" 
            {...{
              onClick: () => auth.login(),
              type: 'submit'
            }}>
              Log in
            </Button>
            <div style={{ height: 20}} />
            <Button>Sign up</Button>
          </div>
          <Grid container justify="center" spaceing={2}>
            <Grid item>
              <Button color="primary">Go to our GitHub Repos</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Forgot pasword?</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}