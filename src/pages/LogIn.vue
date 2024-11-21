<template>
  <div class="full-screen-container flex flex-center">
    <div class="q-pa-md form-container">
      <q-card>
        <q-card-section class="q-pt-none text-center">
          <img
            src="../assets/logInPopCorn.png"
            alt="Logo de inicio de sesión"
            class="login-logo"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-h6">Iniciar sesión</div>
        </q-card-section>
        <form @submit.prevent="logIn">
          <q-card-section>
            <q-input
              v-model="email"
              label="Nombre de usuario"
              type="text"
              placeholder="Ingresa tu usuario"
              autocomplete="username"
              filled
            />
            <q-input
              v-model="password"
              type="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              autocomplete="current-password"
              filled
            />
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              type="submit"
              label="Iniciar sesión"
              color="primary"
              class="login-button"
            />
          </q-card-actions>
        </form>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LogIn } from "../services/logInService.js";

export default {
  name: "LoginView",

  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const logIn = async () => {
      if (!email.value.trim() || !password.value.trim()) {
        alert("Usuario y contraseña son requeridos.");
        return;
      }
      const datos = {
        email: email.value,
        password: password.value,
      };
      try {
        console.log(datos);
        const response = await LogIn(datos);
        if (response) {
          navigateToMovies();
        }
      } catch (error) {
        alert("Usuario y contraseña incorrecta.");
      }
    };

    const navigateToMovies = () => {
      router.push("/movies");
    };

    return {
      email,
      password,
      logIn,
      navigateToMovies,
    };
  },
};
</script>

<style scoped>
.full-screen-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/fondoLogin.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form-container {
  max-width: 400px;
  width: 100%;
  margin: auto;
  background-color: rgba(245, 146, 146, 0.459);
  padding: 20px;
  border-radius: 10px;
}

.login-button {
  width: 70%;
}

.login-logo {
  width: 30%;
  margin-top: 20px;
}
</style>
