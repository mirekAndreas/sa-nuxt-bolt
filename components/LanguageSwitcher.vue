<template>
  <div class="relative">
    <select
      v-model="currentLocale"
      @change="switchLanguage"
      class="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-primary focus:border-primary"
    >
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const currentLocale = ref(locale.value)
const availableLocales = computed(() => (locales.value as any[]))

const switchLanguage = () => {
  navigateTo(`/${currentLocale.value}`)
}
</script>