<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button
        class="focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label="Open navigation menu"
      >
        <!-- Hamburger Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M6 12h12M6 17h12" />
        </svg>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col space-y-2 p-4">
      <NavLink to="/">Pokémon</NavLink>
      <NavLink to="/pokedex">My Pokédex</NavLink>
    </SheetContent>
  </Sheet>
</template>
