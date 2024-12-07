<template>
  <div class="contenedor">
    <div class="fondo-estatico"></div>
    <div class="xd">
      <div class="zona-principal">
        <div class="filtros">
          <q-btn
            icon="refresh"
            color="primary"
            flat
            class="filtros-reset"
            @click="resetFilters"
          />
          <div class="titulo">Filtros</div>
          <q-item class="filtros-item">
            <q-item-section>
              <q-input
                class="filtros-input"
                v-model="searchQuery"
                label="Buscar películas"
                outlined
                dense
                @input="getMovies"
              />
            </q-item-section>
            <q-item-section>
              <q-btn
                class="filtros-btn"
                label="Buscar"
                color="primary"
                @click="getMovies"
              />
            </q-item-section>
          </q-item>

          <q-item class="filtros-item">
            <q-item-section>
              <q-toggle
                v-if="!this.searchQuery"
                class="filtros-toggle"
                v-model="popularity"
                label="Ordenar por popularidad"
              />
            </q-item-section>

            <q-item-section>
              <q-input
                class="filtros-input"
                v-model="releaseDateFilter"
                label="Año de lanzamiento"
                type="number"
                min="1900"
                max="2024"
                outlined
                dense
                debounce="300"
              />
            </q-item-section>
          </q-item>
        </div>

        <div class="peliculas">
          <div class="titulo">Listado de Películas</div>
          <q-list class="peliculas-list">
            <q-item
              v-for="movie in movies"
              :key="movie.id"
              class="peliculas-item"
            >
              <q-item-section avatar>
                <img
                  :src="'http://image.tmdb.org/t/p/w500' + movie.poster_path"
                  alt="Poster"
                  class="poster"
                />
              </q-item-section>
              <q-item-section class="peliculas-detail">
                <q-item-label class="peliculas-titulo">
                  <strong>{{ movie.title }}</strong>
                </q-item-label>
                <q-item-label caption class="peliculas-info">
                  Votos: {{ movie.vote_count }}
                </q-item-label>
                <q-item-label caption class="peliculas-info">
                  Calificación: {{ movie.vote_average }}
                </q-item-label>
              </q-item-section>
              <q-item-section side class="peliculas-overview">
                <q-item-label caption>{{ movie.overview }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchMovies } from "../services/moviesService";

export default {
  setup() {
    const movies = ref([]);
    const searchQuery = ref("");
    const releaseDateFilter = ref("");
    const popularity = ref(true);

    const getMovies = async () => {
      try {
        const movieData = await fetchMovies(
          searchQuery.value,
          popularity.value,
          releaseDateFilter.value
        );
        movies.value = movieData;
      } catch (error) {
        console.error("Error fetching movies in component:", error);
      }
    };

    const resetFilters = () => {
      searchQuery.value = "";
      releaseDateFilter.value = "";
      popularity.value = true;
      getMovies();
    };

    onMounted(() => {
      getMovies();
    });

    return {
      movies,
      searchQuery,
      releaseDateFilter,
      popularity,
      getMovies,
      resetFilters,
    };
  },
};
</script>

<style scoped>
.contenedor {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
}

.fondo-estatico {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../assets/fondoLogin.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: -1;
}

.xd {
  margin: 20px auto;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  z-index: 1; /* Asegura que el contenido esté por encima del fondo */
}

.zona-principal {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filtros {
  flex: 1 1 300px;
  background: rgba(255, 219, 219, 0.753);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(240, 64, 64);
  position: relative;
}

.filtros-reset {
  position: absolute;
  top: 10px;
  right: 10px;
}

.filtros-item {
  margin-bottom: 16px;
}

.filtros-input {
  width: 100%;
}

.filtros-btn {
  width: 100%;
}

.filtros-toggle {
  width: 100%;
}

.peliculas {
  flex: 3 1 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 219, 219, 0.753);
  box-shadow: 0 4px 8px rgb(240, 64, 64);
}

.peliculas-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.peliculas-item {
  background-color: rgba(243, 158, 89, 0.863);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(250, 141, 52);
  display: flex;
  gap: 50px;
}

.poster {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.titulo {
  font-size: 1.25rem;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}

.peliculas-titulo {
  font-size: 1.1rem;
  font-weight: bold;
}

.peliculas-info {
  font-size: 0.9rem;
  color: #424040;
  width: 80%;
}

.peliculas-detail {
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.peliculas-overview {
  flex: 1 1 140%;
  font-size: 0.9rem;
  color: #333;
  text-align: justify;
  padding-left: 20px;
}
</style>
