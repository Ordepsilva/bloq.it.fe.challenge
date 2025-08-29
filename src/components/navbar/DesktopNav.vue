<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu/index';
import NavLink from '@/components/ui/navigation-menu/NavLink.vue';
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList class="space-x-8">
      <NavigationMenuItem>
        <NavLink to="/">Pokémons</NavLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavLink to="/pokedex">My Pokédex</NavLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
