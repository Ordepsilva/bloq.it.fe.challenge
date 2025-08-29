import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/PokemonsView.vue'),
    },
    { path: '/pokedex', name: 'pokedex', component: () => import('@/views/PokedexView.vue') },
    {
      path: '/pokemon/:id',
      name: 'pokemon-detail',
      component: () => import('@/views/PokemonDetailsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;
