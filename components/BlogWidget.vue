<template>
    <div>
        <!-- Template for blog posts -->
      <h2>{{ $prismic.asText(post.data.title) }}</h2>
        <ix-img
        :src="imageSrc(post)"
        :imgixParams="{ fit: 'crop', ar: '1.8:1', crop: 'faces,edges', ch: 'dpr,width' }"
        sizes="(min-width: 1024px) calc(33vw - 60px), (min-width: 768px) calc(50vw - 100px), calc(100vw - 70px)"
        loading="lazy"
        />
        <p>{{ $prismic.asText(post.data.content) }}</p>
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
    imageSrc(post) {
      return (new URL(post.data.heroimage.url)).pathname
    }
  }
}
</script>
