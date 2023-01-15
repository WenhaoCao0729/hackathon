import * as React from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Stack, TextField } from '@mui/material';
import { Add, Send, PhotoCamera, LocationOn } from '@mui/icons-material';


const MAX_FIELD_LENGTH = 64;

const NewPostDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [postTitle, setPostTitle] = React.useState('');
  const [postLocation, setPostLocation] = React.useState('');
  const [postDesc, setPostDesc] = React.useState('');

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
    // TODO: Check if image has been uploaded here. This line exists in other places too
    if (postTitle && postLocation && postDesc) {
      handleClose();
      // TODO: Call endpoint to add post to database
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
                <input id="post-image-field" hidden accept="image/*" multiple type="file" />
              </Button>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} startIcon={<Send />} autoFocus disabled={!(postTitle && postLocation && postDesc)}>
            Post
          </Button>
        </DialogActions>
        {!(postTitle && postLocation && postDesc) && <Alert severity="error">Oof! All fields are required</Alert>}
      </Dialog>
    </div>
  );
};

export default NewPostDialog;
