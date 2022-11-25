import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from './components/MovieCard/MovieCard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';





function App() {
  const [movies, setMovies] = useState([]);
  const [isFav, setIsFav]=useState(false);
  // const [value, setValue]=useState('');

  const getMovie = async (type) => {
    var url;
    switch (type) {
      case "movies-coming":
        url = `http://localhost:3000/movies-coming`;
        break;
      
      case "movies-in-theaters":
        url = `http://localhost:3000/movies-in-theaters`;
        break;
        
      case "top-rated-india":
        url = `http://localhost:3000/top-rated-india`;
        break;
      case "top-rated-movies":
        url = `http://localhost:3000/top-rated-movies`;
        break;
      case "favourite":
        url = `http://localhost:3000/favourite`;
        break;
      default:
        break;
    }
		const response = await fetch(url);
		const responseJson = await response.json();
    if (responseJson) {
			setMovies(responseJson);
		}
	};

  const search = (value)=>{
var results = [];
var searchField = "title";
var searchVal = value;
for (var i=0 ; i < movies.length ; i++)
{
    if (movies[i][searchField].toLowerCase().indexOf(searchVal) != -1) {
        results.push(movies[i]);
    }
}

setMovies(results);

   
}

  const handlefav =(movie)=>{
    const url =`http://localhost:3000/favourite`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(movie),
    })
      .then(res => res.json())
      .then(
        data => setMovies(prevState => [...prevState, data]),
        error => console.log(error.message)
      );
      toast.success("Added to favourite");
      setIsFav(true);
  }

	useEffect(() => {
		getMovie("movies-coming");
	}, []);
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{getMovie("movies-coming")}} >Movies in Theater</Nav.Link>
          
            <Nav.Link onClick={()=>{getMovie("movies-in-theaters")}} >Coming Soon</Nav.Link>
            <Nav.Link  onClick={()=>{getMovie("top-rated-india")}}>Top rated Indian</Nav.Link>
            <Nav.Link  onClick={()=>{getMovie("top-rated-movies")}}>Top rated movies</Nav.Link>
            <Nav.Link  onClick={()=>{getMovie("favourite")}}>Favourites</Nav.Link>
          </Nav>
          <Form style={{marginRight:'10px'}}>
      <Form.Group className="mr-5">
        
        <Form.Control onChange={(e)=>search(e.target.value)} type="email" placeholder="Search Movie" />
        
      </Form.Group>
    </Form>
    <SearchIcon color="primary"/>
        </Container>
      </Navbar>
      <ToastContainer />
      <MovieCard movies={movies} handlefav={handlefav} isFav={isFav}/>
      

    </div>
  );
}

export default App;
