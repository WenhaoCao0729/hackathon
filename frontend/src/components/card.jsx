import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Card = () =>{
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/mykonos"
            title="Mykonos"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Mykonos has been known as the island of the winds, 
            and it's located in the heart of the Cyclades group. 
            Its fame has spread across the world, as a cosmopolitan and luxurious holiday destination.
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      );
}   