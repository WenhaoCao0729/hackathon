import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Container from '@mui/material/Container';

export default function CardPost({ postObj }) {
  const [selected, setSelected] = React.useState(false);
  const [likes, setLikes] = React.useState(postObj.likes);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={postObj.imageUrl}
        title={postObj.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {postObj.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {postObj.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {postObj.content}
        </Typography>
        <Container>
          <ToggleButton
            value={false}
            selected={selected}
            onChange={() => {
              setSelected(!selected);
              setLikes(!selected ? (likes => likes + 1) : (likes => likes - 1));
            }}>
            <FavoriteIcon />
          </ToggleButton>
          <Typography> {likes} </Typography>
        </Container>
      </CardContent>
    </Card>
  );
}
