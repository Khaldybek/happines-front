<script setup lang="ts">
const route = useRoute()
const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

await navigateTo(
  {
    path: slug ? `/catalog/${slug}` : '/catalog',
    query: route.query,
    hash: route.hash,
  },
  {
    redirectCode: 301,
    replace: true,
  },
)
</script>
