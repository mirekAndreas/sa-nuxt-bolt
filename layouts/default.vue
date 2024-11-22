<template>
  <div>
    <header class="bg-white shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center">
              <span class="text-xl font-bold text-primary">WeddingPortal</span>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="bg-white mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500">&copy; {{ new Date().getFullYear() }} WeddingPortal</p>
      </div>
    </footer>
  </div>
</template>