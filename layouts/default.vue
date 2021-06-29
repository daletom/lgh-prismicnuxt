<template>
  <div>
    <nuxt />
    <footerLGH/>
  </div>
</template>

<script>
import FooterLGH from '~/components/FooterLGH.vue'

export default {
  components: {
    FooterLGH
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Blog',
    }
  }
}
</script>