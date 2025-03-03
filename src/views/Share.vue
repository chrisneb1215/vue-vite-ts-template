<template>
    <div>
        <h1>{{ articleTitle }}</h1>
        <p>{{ articleContent }}</p>
        <img :src="ogImageUrl" alt="Article Image" />
        asdasdsadasd
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'

// ✅ Get article ID from the route
const route = useRoute()
const from = route.query.from || '1'

// ✅ Simulate fetching article data
const articleTitle = ref(`Article ${from}`)
const articleContent = ref(`This is the content for article ${from}.`)

const ogImageUrl = `/magic-number.png`

useHead({
    title: articleTitle,
    meta: [
        { property: 'og:title', content: articleTitle.value },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: `Read more about ${articleTitle.value}` },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: ogImageUrl }
    ]
})
</script>
