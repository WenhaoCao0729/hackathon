// import logo from './logo.svg';
import './App.css';
import NewPostDialog from './components/new-post-popup';
// import Post from './components/card';

function App() {
  const postObjs = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Post 1 content',
      location: 'Edmonton',
      imageUrls: [
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/200',
      ]
    },
  ];


  return (
    <div className="App">
      <header className="App-header">
        Header goes here
      </header>
      <section>
        {/* Add a button that opens a popup that lets a user create a new post */}
        <NewPostDialog></NewPostDialog>
      </section>
      <section>
        {/* {postObjs.map((postObj) => (
          <PostCard key={postObj.id} postObj={postObj} />
        ))} */}
      </section>
      <footer>
        Made by Fil, Hank, & John
      </footer>
    </div>
  );
}

export default App;
