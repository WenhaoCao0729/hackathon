import React, { useEffect } from 'react';
import {
  Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, ImageList, ImageListItem, ImageListItemBar, InputAdornment, Stack, TextField
} from '@mui/material';
import { Add, Delete, Send, PhotoCamera, LocationOn } from '@mui/icons-material';


const MAX_FIELD_LENGTH = 64;

const NewPostDialog = ({ endpoint, onNewPost }) => {
  const [open, setOpen] = React.useState(false);
  const [postTitle, setPostTitle] = React.useState('');
  const [postLocation, setPostLocation] = React.useState('');
  const [postDesc, setPostDesc] = React.useState('');
  const [postImageName, setPostImageName] = React.useState('');
  const [postImageUrl, setPostImageUrl] = React.useState('');
  const [postImageFile, setPostImageFile] = React.useState(null);
  const [isFormValid, setIsFormValid] = React.useState(false);

  // Create a a new state var that is true if all fields are valid
  // Triggered when any of the fields change
  useEffect(() => {
    setIsFormValid(postTitle && postLocation && postDesc && postImageUrl);
  }, [postTitle, postLocation, postDesc, postImageUrl]);

  const validateField = (value, successCallback, maxFieldLength = MAX_FIELD_LENGTH) => {
    if (value.length > maxFieldLength) {
      return;
    }

    successCallback(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      const formData = new FormData();

      formData.append('title', postTitle);
      formData.append('location', postLocation);
      formData.append('content', postDesc);
      formData.append('image', postImageFile);

      fetch(endpoint, {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
          onNewPost();
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      handleClose();
    }
  };

  const handleTitleChange = (event) => {
    validateField(event.target.value, setPostTitle);
  };

  const handleLocationChange = (event) => {
    validateField(event.target.value, setPostLocation);
  };

  const handleDescChange = (event) => {
    validateField(event.target.value, setPostDesc, 256);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPostImageName(file.name);
      setPostImageUrl(reader.result);
      setPostImageFile(file);
    };

    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setPostImageName(null);
    setPostImageUrl(null);
    setPostImageFile(null);
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
              <TextField id="post-title-field" label="Title" variant="outlined" margin="dense" value={postTitle} onChange={handleTitleChange} error={!postTitle} />
              <TextField id="post-location-field" label="Location" variant="outlined" value={postLocation} onChange={handleLocationChange} error={!postLocation} InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }} />
              <TextField id="post-desc-field" label="Description" variant="outlined" multiline rows={4} value={postDesc} onChange={handleDescChange} error={!postDesc} />
              <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                Upload Image
                <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
              </Button>
              {postImageUrl && <ImageList cols={1} rowHeight={200}>
                <ImageListItem>
                  <img src={postImageUrl} alt="Preview image" height="200" />
                  <ImageListItemBar
                    title={postImageName}
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
          <Button onClick={handleSubmit} startIcon={<Send />} autoFocus disabled={!isFormValid}>
            Post
          </Button>
        </DialogActions>
        {!isFormValid && <Alert severity="error">Oof! All fields are required</Alert>}
      </Dialog>
    </div>
  );
};

export default NewPostDialog;
