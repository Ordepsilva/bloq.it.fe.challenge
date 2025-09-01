import { createRouter, createWebHistory } from 'vue-router';
import PokemonDetailsPage from '@/views/PokemonDetailsView.vue';
import PokedexView from '@/views/PokedexView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/PokemonsView.vue'),
    },
    { path: '/pokedex', name: 'pokedex', component: PokedexView },
    {
      path: '/pokemon/:id',
      name: 'pokemon-detail',
      component: PokemonDetailsPage,
    },
    {
      /* Redirect for GitHub Pages */
      path: '/index.html',
      redirect: '/',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
