import * as React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, ImageList, ImageListItem, ImageListItemBar, InputAdornment, Stack, TextField
} from '@mui/material';
import { Add, Delete, Send, PhotoCamera, LocationOn } from '@mui/icons-material';


const NewPostDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [imageName, setImageName] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    // TODO: Call endpoint to add post to database
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // console.debug(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageName(file.name);
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setImageName(null);
    setImageUrl(null);
  };


  return (
    <div>
      <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
        Create New Post
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth={true}>
        <DialogTitle id="alert-dialog-title">
          Create New Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stack spacing={3}>
              <div></div>
              {/* <TextField id="outlined-basic" label="Username" variant="outlined" /> */}
              <TextField id="outlined-basic" label="Title" variant="outlined" />
              <TextField id="outlined-basic" label="Location" variant="outlined" InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }} />
              <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4} />

              {/* TODO: Add component that lets How to upload images here */}
              <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                Upload Image
                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
              </Button>
              {imageUrl && <ImageList cols={1} rowHeight={200}>
                <ImageListItem>
                  <img src={imageUrl} alt="Preview image" height="200" />
                  <ImageListItemBar
                    title={imageName}
                    actionIcon={
                      <IconButton aria-label="Remove image" onClick={handleImageRemove}>
                        <Delete />
                      </IconButton>
                    } />
                </ImageListItem>
              </ImageList>}
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} startIcon={<Send />} autoFocus>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewPostDialog;
