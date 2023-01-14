import { CssBaseline, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './App.css';
import NewPostDialog from './components/new-post-popup';
import CardPost from './components/cardpost';
import { Box, Container, useScrollTrigger, Fade, AppBar } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function App(props) {
  const postObjs = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Post 1 content',
      location: 'Edmonton',
      imageUrl:
        'https://picsum.photos/200/300',
      likes: 0,
    },
  ];


  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div"> APP NAME </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar id='#back-to-top-anchor' />
        {/* Add a button that opens a popup that lets a user create a new post */}
        <NewPostDialog></NewPostDialog>
        <Container>
          {postObjs.map((postObj) => (
            <CardPost key={postObj.id} postObj={postObj} />
          ))}
        </Container>
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </React.Fragment>


    // <div className="App">
    //   <header className="App-header">
    //     Header goes here
    //   </header>

    //   <footer>
    //     Made by Fil, Hank, & John
    //   </footer>
    // </div>
  );
}

export default App;
