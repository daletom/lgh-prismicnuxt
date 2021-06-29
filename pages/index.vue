<template>
  <div class="lg:pl-24 lg:pr-24 pt-4">
    <Hero />
      <!-- <div class="blog-avatar" :style="{ backgroundImage: 'url(' + image + ')' }" ></div>-->
      <div class="text-center">
        <h1 class="blog-title">
           {{ $prismic.asText(teaser.title) }}
          </h1>
      <div class="py-8 px-8 mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 md:py-4 md:flex md:items-center md:space-y-0 md:space-x-6">
        <ix-img
        class="lg:w-3/5 md:w-1/3 w-full"
        :src="teaserSrc(teaser)"
        :imgixParams="{ fit: 'crop', ar: '1.8:1', crop: 'faces,edges', ch: 'dpr,width' }"
        loading="lazy"
        sizes="(min-width: 1024px) calc(60vw - 192px), 75vw"
        />
        <div class="text-center space-y-2">
          <div class="space-y-0.5">
          <p class="blog-description inline">{{ $prismic.asText(teaser.content) }}</p> 
          </div>
        </div>
      </div>
      </div>
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
      <div class="p-4 pt-16 lg:w-1/3 md:w-1/2 sm:w-full">
      <video loading="lazy" muted playsinline autoplay src="https://tom.imgix.net/nissan_stormtrooper.mp4"></video>
      <p>Mock Video Ad from Nissan</p>
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
      const teaser = (await $prismic.api.getSingle('teaser')).data
      // Query to get posts content to preview
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "post")
        //{ orderings : '[my.post.date desc]' }
      )

      // Returns data to be used in template
      return {
        teaser,
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
    },
     teaserSrc(teaser) {
      return (new URL(teaser.heroimage.url)).pathname
    }
  }
}
</script>
