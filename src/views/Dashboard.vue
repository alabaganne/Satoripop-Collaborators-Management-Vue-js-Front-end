<template>
  <div>
    <div class="grid-container mb-2">
      <div class="grid pt-0">
        <div class="p-4 bg-white shadow-sm h-100 rounded-lg">
          <!-- Pie Chart here -->
          <div class="position-relative">
            <pie-chart 
              v-if="statisticsReady"
              :height="250" 
              :title="'Distribution of employees by gender'" 
              :chartData="collaboratorsByGender"
            />
          </div>
        </div>
      </div>
      <div class="grid pt-0">
        <div class="p-4 bg-white shadow-sm h-100 rounded-lg">
          <!-- Horizontal Bar Chart here -->
          <div class="w-100 position-relative">
            <horizontal-bar-chart 
              v-if="statisticsReady"
              :height="250" 
              :title="'Number of employees per department'"
              :labels="['Commercials', 'Project managers', 'Developpers', 'Designers']" 
              :chartData="[5, 15, 35, 25]"
            />
          </div>
        </div>
      </div>
      <div class="grid pt-0">
        <div
          class="p-5 bg-dark shadow-sm h-100 rounded-lg d-flex align-items-center text-center"
          style="background-image: linear-gradient(to right, #434343 0%, #2e2e2e 100%);"
        >
          <blockquote class="blockquote comfortaa text-shadow w-100">
            <p class="text-white">We are still masters of our fate. We are still captains of our souls.</p>
            <footer class="blockquote-footer text-warning">Winston Churchill</footer>
          </blockquote>
        </div>
      </div>
    </div>
    <div class="p-2">
      <div class="bg-white shadow-sm p-4 p-xl-5 rounded-lg">
        <h3 class="text-primary mb-3">Recent employees</h3>
        <table class="table table-bordered m-0">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Employment date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="collaborator in collaborators" :key="collaborator.id">
              <th scope="row" v-text="collaborator.id"></th>
              <td v-text="collaborator.name"></td>
              <td v-text="collaborator.department_name">Mobile</td>
              <td v-text="collaborator.hiring_date">December 16, 2020</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import collaboratorMixin from '@/mixins/collaboratorMixin';

export default {
  mixins: [collaboratorMixin],
  components: {
    'pie-chart': () => { return import('@/components/charts/PieChart') },
    'horizontal-bar-chart': () => { return import('@/components/charts/HorizontalBarChart') },
  },
  data() {
    return {
      collaborators: [],
      departments: [],
      collaboratorsByGender: {},
      collaboratorsByDepartment: {},
      statisticsReady: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created() {
    this.fetchCollaborators(6).then(response => {
      this.collaborators = response.data.data;
    });

    const getCollaboratorsByGenderRequest = axios.get('/collaborators/gender');
    const getCollaboratorsByDepartmentRequest = axios.get('/collaborators/gender');

    axios.all([getCollaboratorsByGenderRequest, getCollaboratorsByDepartmentRequest]).then(axios.spread((...responses) => {
      this.collaboratorsByGender = responses[0].data;
      this.collaboratorsByDepartment = responses[1].data;
    })).catch(errors => {
      console.log(errors);
    }).finally(() => {
      this.statisticsReady = true;
    })
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 1199.98px) {
  table {
    font-size: 10pt;
  }
}
</style>
