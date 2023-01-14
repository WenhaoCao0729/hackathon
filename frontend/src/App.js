// import logo from './logo.svg';
import './App.css';
import Post from './components/card';

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
        {postObjs.map((postObj) => (
          <Post key={postObj.id} postObj={postObj} />
        ))}
      </section>
      <footer>
        Made by Fil, Hank, & John
      </footer>
    </div>
  );
}

export default App;
