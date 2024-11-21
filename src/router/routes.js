const routes = [
  {
    path: "/",
    component: () => import("src/pages/LogIn.vue"),
  },

  {
    path: "/movies",
    component: () => import("src/pages/MoviesPage.vue"),
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
