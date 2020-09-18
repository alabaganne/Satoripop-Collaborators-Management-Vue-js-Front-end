<template>
    <div class="card bg-primary light-linear-gradient clickable border-0 rounded-lg px-5 py-4 flex-center flex-column text-center shadow-sm">
        <img :src="require('@/assets/' + photoSrc)" alt="" class="rect-sm rounded-circle shadow mb-3">
        <div class="text-shadow text-light">
            <h4 class="text-warning mb-1">{{ name }}</h4>
            <h6 class="mb-3">{{ department }} Department</h6>
            <p class="small">Lorem ipsum dolor, sit amet consectetur adipisicing.</p> <!-- Hard coded paragraph -->
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        department: String,
        photoSrc: String
    }
}
</script>