<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue", "search"]);

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") emit("search");
};
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto mb-12">
    <input
      type="text"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @keydown="handleKeyDown"
      placeholder="Search for movies (e.g. Inception, Matrix...)"
      class="w-full bg-gray-900 border border-gray-800 text-white rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-lg shadow-2xl"
    />
    <button
      @click="emit('search')"
      class="absolute right-3 top-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-colors"
    >
      Search
    </button>
  </div>
</template>
