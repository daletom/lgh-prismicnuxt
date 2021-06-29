<template>
  <div class="p-4">
    <Hero />
      <!-- <div class="blog-avatar" :style="{ backgroundImage: 'url(' + image + ')' }" ></div>
      <h1 class="blog-title">
        {{ $prismic.asText(homepageContent.headline) }}
      </h1>
      <p class="blog-description">{{ $prismic.asText(homepageContent.description) }}</p> -->
      
      <!-- Check blog posts exist -->
    <div v-if="posts.length !== 0" class="flex flex-wrap">
        <!-- Template for blog posts -->
      <div v-for="post in posts" :key="post.id" v-bind:post="post" class="p-4 lg:w-1/3 md:w-1/2 sm:w-full">
        <h2>{{ $prismic.asText(post.data.title) }}</h2>
        <ix-img
        :src="imageSrc(post)"
        :imgixParams="{ fit: 'crop', ar: '1.8:1', crop: 'faces,edges', ch: 'dpr,width' }"
        sizes="(min-width: 1024px) calc(33vw - 60px), (min-width: 768px) calc(50vw - 100px), calc(100vw - 70px)"
        loading="lazy"
        />
        <p>{{ $prismic.asText(post.data.content) }}</p>
      </div>
    </div>
      <!-- If no blog posts return message -->
    <div v-else class="blog-main">
        <p>No Posts published at this time.</p>
    </div>
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
export default {
  name: 'Home',
  components: {
    Hero
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Blog',
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get blog home content
      //const homepageContent = (await $prismic.api.getSingle('blog_home')).data

      // Query to get posts content to preview
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "post")
        //{ orderings : '[my.post.date desc]' }
      )

      // Returns data to be used in template
      return {
        //homepageContent,
        posts: blogPosts.results,
        //image: homepageContent.image.url,
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    imageSrc(post) {
      return (new URL(post.data.heroimage.url)).pathname
    }
  }
}
</script>
