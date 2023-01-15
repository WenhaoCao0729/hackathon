import { CssBaseline, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import NewPostDialog from './components/new-post-popup';
import CardPost from './components/cardpost';
import { Box, Container, useScrollTrigger, Fade, AppBar } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';


const APP_NAME = 'Instaspam - Trip Poster';
const POSTS_ENDPOINT = 'http://127.0.0.1:8000/api/posts/';
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
  const [postObjs, setPostObjs] = useState([]);

  const fetchAllPosts = () => {
    // GET request using fetch inside useEffect React hook
    fetch(POSTS_ENDPOINT, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setPostObjs(data);
      }).catch((error) => {
        console.error('Error:', error);
      });
  };

  // No deps specified, so this will run on every render
  useEffect(() => {
    fetchAllPosts();
  }, []);


  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">{APP_NAME}</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar id='#back-to-top-anchor' />
        <NewPostDialog endpoint={POSTS_ENDPOINT} onNewPost={fetchAllPosts} />
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
  );
}

export default App;
