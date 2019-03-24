import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Airport = (props) => {
    console.log(props)
    return(
        <div>
            { props.airport ? (
                <Card >
                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={props.airport.fields}
                    title={props.airport}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.airport}
                    </Typography>
                    <Typography component="p">
                        {props.airport.fields}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" color="primary" href={props.airport.fields} target="_blank">
                        Airport Details
                    </Button>
                    </CardActions>
                </Card>
            ) : null}
        </div>
    )
}
export default Airport