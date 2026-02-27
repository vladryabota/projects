<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import MovieCard from "../components/MovieCard.vue";
import { BASE_URL } from "../types";

const props = defineProps<{ favorites: string[] }>();
const emit = defineEmits(["toggleFavorite"]);

const favoriteMovies = ref<any[]>([]);
const loading = ref(false);

const fetchAll = async () => {
  if (props.favorites.length === 0) {
    favoriteMovies.value = [];
    return;
  }
  loading.value = true;
  const requests = props.favorites.map((id) =>
    fetch(`${BASE_URL}&i=${id}`).then((res) => res.json()),
  );
  const results = await Promise.all(requests);
  favoriteMovies.value = results.map((m: any) => ({
    id: m.imdbID,
    title: m.Title,
    genre: m.Year,
    rating: m.imdbRating,
    poster:
      m.Poster !== "N/A"
        ? m.Poster
        : "https://via.placeholder.com/400x600?text=No+Poster",
  }));
  loading.value = false;
};

onMounted(fetchAll);
watch(() => props.favorites, fetchAll);
</script>

<template>
  <div class="pt-32 px-8 pb-20 max-w-7xl mx-auto">
    <h2
      class="text-4xl font-black mb-10 italic border-l-4 border-blue-600 pl-4 text-white uppercase"
    >
      My Cabinet
    </h2>
    <div
      v-if="favorites.length === 0"
      class="text-center py-20 bg-gray-900/50 rounded-3xl border border-gray-800"
    >
      <p class="text-gray-500 mb-4">No movies saved yet.</p>
      <RouterLink to="/" class="text-blue-500 font-bold hover:underline"
        >Explore Catalog</RouterLink
      >
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-5 gap-8">
      <MovieCard
        v-for="m in favoriteMovies"
        :key="m.id"
        :movie="m"
        :is-favorite="true"
        @toggle-favorite="(id) => emit('toggleFavorite', id)"
      />
    </div>
  </div>
</template>
