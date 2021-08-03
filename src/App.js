import React from "react";
import axios from 'axios';
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{
  state = {
    isLoading : true,
    movies : []
  }
  getMovies = async() => {
    const { 
      data : {
        data : {movies }
      }
    } =await axios.get("https://yts.mx/api/v2/list_movies.json");
    this.setState( {movies, isLoading:false}) //movies:movies 인데 짧게쓴거. 앞에거는 setState의 moview고 뒤에건 axios에서 온 movies 
  }
  async componentDidMount(){
    this.getMovies();
  }
  render(){
    const { isLoading, movies } =this.state;
    return (
      <section className = "container">
        {isLoading ? (
          <div className = "loader">
            <span className = "loader__test">Loading...</span>
          </div>
          ) : (
            <div className = "movies"> 
              {movies.map(movie => (
                <Movie 
                  key = {movie.id}
                  id={movie.id} 
                  year={movie.year} 
                  title={movie.title} 
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres = {movie.genres}
                />
              ))}
            </div>
          )}
        </section>
    );
  }
}

export default App;