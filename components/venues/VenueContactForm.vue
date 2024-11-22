<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-4">{{ $t('contactForm.title') }}</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('contactForm.name') }}</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('contactForm.email') }}</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('contactForm.phone') }}</label>
        <input
          v-model="form.phone"
          type="tel"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('contactForm.date') }}</label>
        <input
          v-model="form.date"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('contactForm.message') }}</label>
        <textarea
          v-model="form.message"
          rows="4"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
        :disabled="isSubmitting"
      >
        {{ $t('contactForm.submit') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

const props = defineProps<{
  venueId: number
  venueName: string
}>()

const form = ref({
  name: '',
  email: '',
  phone: '',
  date: '',
  message: ''
})

const isSubmitting = ref(false)

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  message: z.string().min(10)
})

const submitForm = async () => {
  try {
    isSubmitting.value = true
    const validatedData = formSchema.parse(form.value)
    
    // Here you would typically send the data to your API
    console.log('Form submitted:', {
      ...validatedData,
      venueId: props.venueId,
      venueName: props.venueName
    })
    
    // Reset form after successful submission
    form.value = {
      name: '',
      email: '',
      phone: '',
      date: '',
      message: ''
    }
  } catch (error) {
    console.error('Validation error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>