import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
// import request from 'superagent'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export class SignIn extends Component {
    state = {
        email: "",
        password: "",
        messages: [],
        redirect: false,
        wrongCred: false,
    }
    
    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        this.setState({
            [key]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.email != "", this.state.password != "", this.state.email === "demo", this.state.password === "demo") {
          if (this.state.redirect) {
            return this.props.history.push('/home');
          }
          this.setState({
            wrongCred: false
          })
        } else {
          // alert("hi")
          this.setState({
            wrongCred: true
          })
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.main}>
                  <CssBaseline />
                  <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <form className={classes.form}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" onChange={this.handleChange} autoFocus />
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" onChange={this.handleChange} autoComplete="current-password" />
                      </FormControl>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Typography component="p" variant="subtitle1" style={{color: "red"}}>
                        {this.state.wrongCred? "Please enter correct username and password" : ""}
                      </Typography>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onSubmit={this.submitForm}
                        onClick={this.handleSubmit}
                        className={classes.submit}
                      >
                        Sign in
                      </Button>
                    </form>
                  </Paper>
                </main>
            </React.Fragment>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);