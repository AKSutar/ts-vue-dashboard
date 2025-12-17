/**
 * Router configuration:
 * - "/" shows the dashboard.
 * - "/shows/:id" shows details.
 */
import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../pages/DashboardPage.vue";
import ShowDetailPage from "../pages/ShowDetailPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "dashboard", component: DashboardPage },
    { path: "/shows/:id", name: "show-detail", component: ShowDetailPage, props: true },
    { path: "/:pathMatch(.*)*", name: "not-found", component: NotFoundPage }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});
