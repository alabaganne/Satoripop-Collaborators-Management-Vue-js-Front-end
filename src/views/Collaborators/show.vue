<template>
    <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <div class="bg-dark text-warning light-linear-gradient p-4 text-center">
            <h1 class="text-shadow mb-0">{{ collaborator.name }}</h1>
            <router-link v-if="user.permissions.includes('edit collaborators')" class="text-light small" :to="{ name: 'edit collaborator' }">Edit this collaborator</router-link>
        </div>
        <div class="p-5">
            <!-- content -->
            <div class="row mb-4">
                <div class="col-6">
                    <div class="d-flex align-items-center mb-2">
                        <img src="@/assets/me.jpg" class="rect rounded-circle shadow-sm mr-3" :alt="collaborator.name">
                        <div>
                            <h1 class="text-primary font-weight-light mb-1">{{ collaborator.name }}</h1>
                            <h4 class="font-weight-light mb-1">{{ collaborator.department_name }} Department</h4>
                            <h6 class="text-secondary mb-0">{{ collaborator.position }}</h6>    
                        </div>
                    </div>
                </div>
                <div class="col-6 text-secondary text-right">
                    <div class="info">
                        <div class="mb-2" v-if="collaborator.id_card_number">
                            <span class="mr-3">{{ collaborator.id_card_number }}</span>
                            <i class="fas fa-id-card"></i>
                        </div>
                        <div class="mb-2">
                            <span class="mr-3">{{ collaborator.email }}</span>
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="mb-2">
                            <span class="mr-3">{{ collaborator.phone_number }}</span>
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="mb-2" v-if="collaborator.address">
                            <span class="mr-3">{{ collaborator.address }}</span>
                            <i class="fas fa-home"></i>
                        </div>
                        <div class="mb-2" v-if="collaborator.date_of_birth">
                            <span class="mr-3">{{ collaborator.date_of_birth }}</span>
                            <i class="fas fa-birthday-cake"></i>
                        </div>
                        <div class="mb-2" v-if="collaborator.university">
                            <span class="mr-3">{{ collaborator.university }}</span>
                            <i class="fas fa-school"></i>
                        </div>
                        <div class="mb-2">
                            <span class="mr-3 text-capitalize">{{ collaborator.civil_status }}</span>
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="mb-2">
                            <span class="mr-3 text-capitalize">{{ collaborator.gender }}</span>
                            <i class="fas fa-venus-mars"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="mb-4">
                    <h4>Leaves</h4>
                    <data-table name="leave" :dataTable="leaves" :fields="['type', 'days']" />
                </div>
                <div class="mb-4">
                    <h4>Skills</h4>
                    <data-table name="skill" :dataTable="skills" :fields="['name', 'note']" />
                </div>
                <div class="mb-4">
                    <h4>Trainings</h4>
                    <data-table name="training" :dataTable="trainings" :fields="['entitled', 'start_date', 'duration', 'note']" />
                </div>
                <div>
                    <h4>Evaluations</h4>
                    <data-table name="evaluation" :dataTable="evaluations" :fields="['type', 'manager', 'date', 'status']" />
                </div>
            </div>
            <!-- end content -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    components: {
        'data-table': () => { return import('@/components/collaborator/ShowDataTable') },
    },
    data() {
        return {
            collaborator: {},
            profileImageHeight: 0,
            leaves: [],
            skills: [],
            trainings: [],
            evaluations: [],
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    mounted() {
        let collaboratorId = this.$route.params.id
        axios.get(`/collaborators/${collaboratorId}`).then(response => {
            this.collaborator = response.data;
            this.getTableData('leaves');
            this.getTableData('skills');
            this.getTableData('trainings');
            this.getTableData('evaluations');
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        getTableData(tableName) {
            axios.get(`/collaborators/${this.collaborator.id}/${tableName}`).then(response => {
                this[tableName] = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .info i {
        color: var(--primary);
    }
    a {
        text-decoration: underline !important;
    }
</style>