import './App.css';
import { useFetch } from './hooks';
import Card from './components/Card/Card';

function App(props) {

  const jokeApiUrl = 'https://api.chucknorris.io/jokes/categories';
  const categoriesList = useFetch(jokeApiUrl, {});

  return (
    <div className='main'>
      <h1>Chuck Norries</h1>
      <Card categories={categoriesList}/>
    </div>
  );
}

export default App;
