import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class Airport extends React.Component {
    constructor(props) {
        super(props)
        this.getairports()
    }

    state = {
        open: false,
        airports: ['jfk', 'nyc', 'dal', 'dfw'],
        searchString: ''
    };

    getairports = () => {
        // fetch.getEntries({
        //     content_type: 'airport',
        //     query: this.state.searchString
        // })
        // .then((response) => {
        this.setState({ airports: [this.state.searchString] })
        //     console.log(this.state.airports)
        // })
        // .catch((error) => {
        //   console.log("Error occurred while fetching Entries")
        //   console.error(error)
        // })
    }

    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getairports()
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.airport ? (
                    <Card >
                        <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                            image={this.props.airport.fields}
                            title={this.props.airport}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {this.props.airport}
                            </Typography>
                            <Typography component="p">
                                {this.props.airport.fields}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" href={this.props.airport.fields} onClick={this.handleOpen} target="_blank">
                                Airport Details
                        </Button>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                            >
                                <div style={getModalStyle()} className={classes.paper}>
                                    <TextField style={{ padding: 24 }}
                                        id="searchInput"
                                        placeholder="Search for airports"
                                        margin="normal"
                                        onChange={this.onSearchInputChange}
                                    />
                                    <Typography variant="h6" id="modal-title">
                                        Text in a modal
                                </Typography>
                                    <Typography variant="subtitle1" id="simple-modal-description">
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                                    <AirportlWrapped />
                                </div>
                            </Modal>
                        </CardActions>
                    </Card>
                ) : null}
            </div>
        )
    }
}

Airport.propTypes = {
    classes: PropTypes.object.isRequired,
};

const AirportlWrapped = withStyles(styles)(Airport);

export default AirportlWrapped