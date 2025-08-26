<script setup lang="ts">
import NavigationMenu from '../navigation-menu/NavigationMenu.vue';
import NavigationMenuItem from '../navigation-menu/NavigationMenuItem.vue';
import NavigationMenuList from '../navigation-menu/NavigationMenuList.vue';
import NavLink from '../navigation-menu/NavLink.vue';
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
