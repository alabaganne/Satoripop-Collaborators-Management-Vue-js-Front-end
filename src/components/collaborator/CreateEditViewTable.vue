<template>
    <div>
        <!-- Title -->
        <div class="d-flex mb-4">
            <div class="mr-auto">
                <h4 class="text-capitalize mb-0">{{ `${name}s` }}</h4>
                <h6 v-if="false"></h6> <!-- Remaining days: 15 -->
            </div>
            <button type="button" class="btn btn-sm clickable font-weight-bold" data-toggle="modal" :data-target="`#add-${name}-modal`">
                <i class="fas fa-plus fa-sm mr-1 text-primary"></i>
                <span>Add new {{ name }}</span>
            </button>
        </div>
        <!-- Modal -->
        <div class="modal fade" :id="`add-${name}-modal`" style="padding-left: 17px;" tabindex="-1" role="dialog" :aria-labelledby="`Add new ${name}`" aria-hidden="true">
            <form autocomplete="off" @keydown="form.errors.clear($event.target.name)">
                <div class="modal-dialog" role="document">
                    <div class="modal-content border-0 shadow-lg">
                        <div class="modal-header bg-primary light-linear-gradient border-bottom-0">
                            <h3 class="modal-title text-light text-shadow text-uppercase font-weight-bold">add new {{ name }}</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="p-3">
                                <slot name="modal-body"></slot>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="ml-auto">
                                <button type="button" class="btn rounded-sm btn-sm px-3 py-2 mr-1 btn-dark" data-dismiss="modal">Close</button>
                                <button type="button" class="btn rounded-sm btn-sm px-3 py-2 btn-primary" @click="validateThenAdd" :disabled="form.errors.any()">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <!-- /Modal -->
        <!-- Table -->
        <table class="table table-bordered">
            <thead>
                <th v-for="(field, index) in fields" :key="index">{{ field | clean }}</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="fetchedData.length > 0 || pendingData.length > 0"> <!-- Fetched Data -->
                    <tr v-for="(row, rowIndex) in fetchedData" :key="row.id">
                        <td v-for="(field, fieldIndex) in fields" :key="fieldIndex">{{ row[field] }}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-secondary mr-1">Edit</button>
                            <button type="button" class="btn btn-sm btn-danger" @click="deleteFromFetched(fetchedData, rowIndex)">Delete</button>
                        </td>
                    </tr>
                    <tr class="bg-light" v-for="(row, rowIndex) in pendingData" :key="rowIndex"> <!-- Pending Data -->
                        <td v-for="(field, fieldIndex) in fields" :key="fieldIndex">{{ row[field] }}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-secondary mr-1">Edit</button>
                            <button type="button" class="btn btn-sm btn-danger" @click="deleteFromPending(pendingData, index)">Delete</button>
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td class="text-danger text-center font-weight-bold" :colspan="fields.length + 1">No {{ name }}s are available for this collaborator</td>
                </tr>
            </tbody>
        </table>
        <!-- /Table -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        name: String,
        form: Object,
    },
    data() {
        return {
            fetchedData: [],
            pendingData: [],
            pendingUpdates: [],
            pendingDeletes: [], // contains the id of the elements that will be deleted
            collaboratorId: null
        }
    },
    computed: {
        fields() {
            let keys = Object.keys(this.form);
            keys.splice(keys.indexOf('errors'), 1);
            keys.splice(keys.indexOf('originalData'), 1);
            return keys;
        }
    },
    mounted() {
        this.collaboratorId = this.$route.params.id || null;
        // fetch data if a user id is present on the URL
        if(this.collaboratorId) {
            axios.get(`/collaborators/${this.collaboratorId}/${this.name}s`).then(response => {
                this.fetchedData = response.data;
            })
        }
    },
    methods: {
        validateThenAdd() {
            this.form.post(`/validate/${this.name}`).then(() => {
                this.pendingData.push(this.form.data());
                this.form.clear();
            }).catch(error => {
                if(error.status !== 422) {
                    console.error(error);
                }
            });
        },
        submit(collaboratorId) {
            // send requests to add pendingData Array Data to the collaborator
            for(let row in this.pendingData) {
                axios.post(`/collaborators/${collaboratorId}/${this.name}s`, this.pendingData[row]).catch(error => {
                    console.error(error.response);
                });
                // Send requests to update and delete data from table
                // Delete
                this.pendingDeletes.forEach(value => {
                    axios.delete(`/collaborators/${this.collaboratorId}/${this.name}s/${value}`).catch(error => console.log(error));
                });
            }
        },
        // editPending(table, index) {},
        // editFetched(table, index) {},
        deleteFromPending(table, index) { // table: pending data Array
            table.splice(index, 1);
        },
        deleteFromFetched(table, index) { // table: fetched data Array
            this.pendingDeletes.push(table[index].id);
            table.splice(index, 1)
        }
    },
}
</script>

<style scoped>
    .form-control, .custom-select {
        border-radius: 0;
    }
</style>