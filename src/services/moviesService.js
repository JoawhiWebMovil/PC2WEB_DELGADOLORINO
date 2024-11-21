import axios from "axios";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjZmZGM1ZWE2MGM2NmNiZjY2NDljNzk3OTZmNzRmYyIsIm5iZiI6MTczMjE3NDQyNC40ODY3ODUsInN1YiI6IjY3M2VjNWY3YWRlOTMxMGYzZmRmOTljNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FnosQB73C_H4JqNRNMJbTGZESE-fjyljx-0GXmnidVk";

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
