# Pokédex App – bloq-it-fe-challenge

An advanced Pokédex web app built with Vue 3, Vite, Pinia, TanStack Query, Tailwind CSS, and ChadCN UI components. Features offline support, persistent state, filtering, sorting, pagination, CSV export, and a fun Pokémon-themed UI. Includes native share API integration and a modular API layer.

## Features

- Browse, search, and filter Pokémon
- Catch and release Pokémon (persistent across reloads)
- Add notes to caught Pokémon
- View Pokémon details, stats, and evolutions
- Switch between table and card/grid view modes
- Pagination and filter state synced with URL
- Export caught Pokémon to CSV
- Offline support (PWA)
- Toast notifications for actions and errors
- Responsive, mobile-friendly design
- Native share API for sharing Pokémon details

## Tech Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [TanStack Query](https://tanstack.com/query/latest) for data fetching/caching
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [ChadCN UI](https://ui.shadcn.com/) for reusable UI primitives
- [Vitest](https://vitest.dev/) for unit tests
- [pokeapi-js-wrapper](https://github.com/PokeAPI/pokeapi-js-wrapper) for Pokémon data
- [vue-sonner](https://github.com/emilkowalski/vue-sonner) for toasts
- PWA via [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/)
- Native Web Share API

## Getting Started

### Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Type-Check, Build, and Preview

```sh
npm run type-check
npm run build
npm run preview
```

### Testing

- **Unit tests:**
  ```sh
  npm run test:unit
  ```

### Linting, Formatting & Coverage

```sh
npm run lint
npm run format
npm run coverage
```

Code coverage is powered by [Istanbul](https://istanbul.js.org/) via Vitest. Run `npm run coverage` to generate a coverage report.

## Folder Structure

- `src/components/` – UI and feature components (PokeballButton, PokemonTable, ChadCN atoms, etc.)
- `src/views/` – Main app views (PokedexView, PokemonDetailsView, etc.)
- `src/stores/` – Pinia stores
- `src/composables/` – Custom composables (pagination, filters, etc.)
- `src/lib/models/` – TypeScript models and utilities
- `src/lib/queries/` – TanStack Query composables
- `src/lib/api/` – Modular API layer for data fetching
- `public/` – Static assets (SVGs, icons)

## License

MIT
