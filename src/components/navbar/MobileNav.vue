<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NavLink from '@/components/ui/navigation-menu/NavLink.vue';
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        class="focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-100 active:bg-blue-200 transition"
        aria-label="Open navigation menu"
      >
        <!-- Hamburger Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="!h-10 !w-10 text-gray-700"
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
