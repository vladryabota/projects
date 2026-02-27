<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

const favorites = ref<string[]>([]);

onMounted(() => {
  const saved = localStorage.getItem("cinema-favorites");
  if (saved) favorites.value = JSON.parse(saved);
});

const toggleFavorite = (id: string) => {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((f) => f !== id);
  } else {
    favorites.value = [...favorites.value, id];
  }
  localStorage.setItem("cinema-favorites", JSON.stringify(favorites.value));
};
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <nav
      class="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 p-5 flex justify-between"
    >
      <RouterLink to="/" class="text-xl font-black">
        CINEMA<span class="text-blue-600">HUB</span>
      </RouterLink>
      <div class="flex gap-5 text-xs font-bold uppercase">
        <RouterLink to="/" class="hover:text-blue-600">Katalog</RouterLink>
        <RouterLink to="/profile" class="hover:text-blue-600"
          >Kabinet ({{ favorites.length }})</RouterLink
        >
      </div>
    </nav>

    <RouterView :favorites="favorites" @toggle-favorite="toggleFavorite" />
  </div>
</template>
