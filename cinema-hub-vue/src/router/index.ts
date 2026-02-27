import { createRouter, createWebHistory } from "vue-router";
// Použití @ místo .. je ve Vite projektech bezpečnější
import Catalog from "../pages/Catalog.vue";
import MovieDetail from "../pages/MovieDetail.vue";
import Profile from "../pages/Profile.vue";

const routes = [
  { path: "/", component: Catalog },
  { path: "/movie/:id", component: MovieDetail },
  { path: "/profile", component: Profile },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
