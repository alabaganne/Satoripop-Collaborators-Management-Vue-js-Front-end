<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th v-for="(field, index) in fields" :key="index">{{ field | clean }}</th>
            </tr>
        </thead>
        <tbody>
            <template v-if="dataTable.length > 0">
                <tr v-for="row in dataTable" :key="row.id">
                    <td v-for="(field, index) in fields" :key="index">{{ row[field] }}</td>
                </tr>
            </template>
            <tr v-else>
                <th :colspan="fields.length + 1" class="text-center text-danger">This collaborator has no {{ name }}s.</th>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        name: String,
        fields: Array,
        dataTable: Array,
    },
    mounted() {
        setTimeout(() => {
            // console.log(this.dataTable);
        }, 1000);
    }
}
</script>

<style>

</style>