<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Movie } from "../types";

defineProps<{
  movie: Movie;
  isFavorite: boolean;
}>();

const emit = defineEmits(["toggleFavorite"]);
</script>

<template>
  <div
    class="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
  >
    <div class="relative aspect-[2/3]">
      <img
        :src="movie.poster"
        :alt="movie.title"
        class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"
      ></div>
      <div
        class="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-yellow-400 text-xs font-bold border border-yellow-400/30"
      >
        ⭐ {{ movie.rating }}
      </div>
    </div>

    <div class="p-4 bg-gray-900">
      <h3 class="text-white font-semibold text-lg truncate mb-1">
        {{ movie.title }}
      </h3>
      <p class="text-gray-400 text-xs mb-4 uppercase tracking-wider">
        {{ movie.genre }}
      </p>

      <div class="flex gap-2">
        <button
          @click="emit('toggleFavorite', movie.id)"
          :class="[
            'flex-1 py-2 rounded-lg text-sm font-bold transition-all',
            isFavorite
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
          ]"
        >
          {{ isFavorite ? "❤️" : "🤍 Favorites" }}
        </button>

        <RouterLink
          :to="`/movie/${movie.id}`"
          class="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold transition-colors"
        >
          Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>
