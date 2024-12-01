import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjhkNWZjOGMxODg4NjMzNzViOGUxNmQyYjJmNWRlZSIsIm5iZiI6MTcyOTMzODc0MC43MDQ4MzQsInN1YiI6IjY3MTM1OTMxYzZlMzA0MDk2MTk1YmUzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jvUu9LcPJLzCOi4XJoDVTssNdI1xxiwKGNAB1ZpUxi8'
  }
});


export default instance;
