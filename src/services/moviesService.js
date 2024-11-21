import axios from "axios";

const apiKey = "126fdc5ea60c66cbf6649c79796f74fc";

export const fetchMovies = async (search, popularity, releaseDateFilter) => {
  const url = search
    ? `https://api.themoviedb.org/3/search/movie`
    : `https://api.themoviedb.org/3/discover/movie`;

  const sortBy = popularity ? "popularity.desc" : "release_date.desc";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      params: {
        query: search || undefined,
        language: "es-PE",
        page: 1,
        sort_by: sortBy,
        primary_release_year: releaseDateFilter || undefined,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
