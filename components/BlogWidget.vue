<template>
    <div class="flex flex-wrap">
        <!-- Template for blog posts -->
      <div v-for="post in posts" :key="post.id" v-bind:post="post" class="p-4 lg:w-1/3 md:w-1/2 sm:w-full">
        <h2>{{ $prismic.asText(post.data.title) }}</h2>
        <ix-img
        :src="post.data.heroimage.url"
        :imgixParams="{ fit: 'crop', ar: '1.8:1', crop: 'faces,edges', ch: 'dpr,width' }"
        sizes="(min-width: 1024px) calc(33vw - 60px), (min-width: 768px) calc(50vw - 100px), calc(100vw - 70px)"
        loading="lazy"
        />
        <p>{{ $prismic.asText(post.data.content) }}</p>
      </div>
    </div>
</template>

<script>
//import LinkResolver from "~/plugins/link-resolver.js"

export default {
  props: {
    imgobject: {
      type: Object,
      default: null
    },
    imgixParams: {
      type: String,
      default: null
    }
  },
  name: 'blog-widget',
  methods: {
    imageSrc() {
      return (new URL(this.post.data.heroimage.url)).pathname
    }
  }
}
</script>

<style lang="sass" scoped>
.blog-post
  color: #353535

h2
  margin: 0
</style>