<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import MovieCard from "../components/MovieCard.vue";
import SearchBar from "../components/SearchBar.vue";
import { BASE_URL } from "../types";

const props = defineProps<{
  favorites: string[];
}>();
const emit = defineEmits(["toggleFavorite"]);

const movies = ref<any[]>([]);
const loading = ref(false);
const query = ref("Marvel");
const lastSearch = ref("Marvel");
const page = ref(1);
const type = ref("");
const totalResults = ref(0);

const fetchMovies = async (
  term: string,
  pageNum: number,
  filterType: string,
) => {
  if (!term.trim()) return;
  loading.value = true;
  try {
    const typeParam = filterType ? `&type=${filterType}` : "";
    const res = await fetch(
      `${BASE_URL}&s=${term}&page=${pageNum}${typeParam}`,
    );
    const data = await res.json();

    if (data.Search) {
      movies.value = data.Search.map((m: any) => ({
        id: m.imdbID,
        title: m.Title,
        genre: m.Year,
        rating: "N/A",
        poster:
          m.Poster !== "N/A"
            ? m.Poster
            : "https://via.placeholder.com/400x600?text=No+Poster",
      }));
      totalResults.value = parseInt(data.totalResults);
      lastSearch.value = term;
    } else {
      movies.value = [];
      totalResults.value = 0;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchMovies(lastSearch.value, page.value, type.value));

// Replaces React useEffect [page, type]
watch([page, type], () => {
  fetchMovies(lastSearch.value, page.value, type.value);
});

const handleNewSearch = () => {
  page.value = 1;
  fetchMovies(query.value, 1, type.value);
};
</script>

<template>
  <div class="pt-24 pb-12 px-8 max-w-7xl mx-auto min-h-screen bg-black">
    <header class="mb-12 text-center">
      <h1
        class="text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600"
      >
        Cinema Hub
      </h1>

      <SearchBar v-model="query" @search="handleNewSearch" />

      <div class="flex flex-wrap justify-center gap-2 mt-6">
        <button
          v-for="f in [
            { label: 'All', val: '' },
            { label: 'Movies', val: 'movie' },
            { label: 'Series', val: 'series' },
          ]"
          :key="f.label"
          @click="
            type = f.val;
            page = 1;
          "
          :class="[
            'px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all',
            type === f.val
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-800 text-gray-500 hover:border-gray-600',
          ]"
        >
          {{ f.label }}
        </button>
      </div>
    </header>

    <div
      class="flex justify-between items-center mb-8 text-sm text-gray-500 font-mono"
    >
      <div>Results: {{ totalResults }}</div>
      <div class="flex items-center gap-4">
        <button
          :disabled="page <= 1"
          @click="page--"
          class="hover:text-white disabled:opacity-20 transition-colors"
        >
          PREV
        </button>
        <span class="text-blue-500 font-bold bg-gray-900 px-3 py-1 rounded">
          {{ page }} / {{ Math.ceil(totalResults / 10) || 1 }}
        </span>
        <button
          :disabled="page >= Math.ceil(totalResults / 10)"
          @click="page++"
          class="hover:text-white disabled:opacity-20 transition-colors"
        >
          NEXT
        </button>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-5 gap-8">
      <div
        v-for="i in 10"
        :key="i"
        class="bg-gray-900 aspect-[2/3] rounded-xl animate-pulse"
      ></div>
    </div>
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
    >
      <MovieCard
        v-for="m in movies"
        :key="m.id"
        :movie="m"
        :is-favorite="favorites.includes(m.id)"
        @toggle-favorite="(id) => emit('toggleFavorite', id)"
      />
    </div>
  </div>
</template>
