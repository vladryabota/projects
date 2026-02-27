<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BASE_URL } from "../types";

const props = defineProps<{ favorites: string[] }>();
const emit = defineEmits(["toggleFavorite"]);

const route = useRoute();
const router = useRouter();
const movie = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  const res = await fetch(`${BASE_URL}&i=${route.params.id}&plot=full`);
  movie.value = await res.json();
  loading.value = false;
});
</script>

<template>
  <div
    v-if="loading"
    class="pt-40 text-center text-gray-500 uppercase tracking-widest"
  >
    Loading...
  </div>
  <div v-else-if="!movie" class="pt-40 text-center text-white">Not found</div>
  <div v-else class="pt-24 pb-20 px-8 max-w-6xl mx-auto">
    <button
      @click="router.back()"
      class="text-blue-500 mb-8 font-bold text-sm uppercase"
    >
      ← Back
    </button>
    <div class="flex flex-col md:flex-row gap-12">
      <img
        :src="
          movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://via.placeholder.com/400x600'
        "
        class="w-full md:w-80 rounded-2xl shadow-2xl border border-gray-800"
      />
      <div class="flex-1">
        <h1 class="text-6xl font-black mb-4 text-white">{{ movie.Title }}</h1>
        <p class="text-blue-500 font-bold mb-6 italic">
          {{ movie.Genre }} • {{ movie.Year }} • {{ movie.Runtime }}
        </p>
        <p class="text-gray-300 text-lg leading-relaxed mb-8">
          {{ movie.Plot }}
        </p>
        <button
          @click="emit('toggleFavorite', movie.imdbID)"
          :class="[
            'px-12 py-4 rounded-xl font-black transition-all',
            favorites.includes(movie.imdbID)
              ? 'bg-red-600 text-white'
              : 'bg-white text-black hover:bg-blue-500 hover:text-white',
          ]"
        >
          {{
            favorites.includes(movie.imdbID)
              ? "❤️ In Cabinet"
              : "🤍 Save to Cabinet"
          }}
        </button>
      </div>
    </div>
  </div>
</template>
