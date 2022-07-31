<template>
  <iframe width="1000" height="3000" :src="ihtml"></iframe>
</template>

<script>
export default {
  props: {
    ihtml: {
      type: String
    }
  }
}
</script>
