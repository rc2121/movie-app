import axios from "axios";

const API = process.env.REACT_APP_API_KEY;

export const getMovieList = async () => {
  try {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API}`
    );
    const { results } = movies.data;
    return results.map((item) => ({
      ...item,
      watched: false,
    }));
  } catch (error) {
    console.log("Error:", error);
  }
};
