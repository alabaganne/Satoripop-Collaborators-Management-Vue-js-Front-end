<template>
  <div
    class="vh-100 d-flex bg-warning justify-content-center align-items-center"
  >
    <div
      class="d-flex justify-content-center bg-white shadow p-0"
      style="min-width: 400px; max-width: 880px;"
    >
      <div class="col-6 text-light left d-none d-lg-block">
        <div class="d-flex h-100 justify-content-center align-items-center">
          <div class="text-center p-5">
            <h1 class="display-4 text-warning">
              satoripop
            </h1>
            <h5 class="text-white-75">Shine clever</h5>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 bg-light text-dark p-5">
        <h1 class="display-4 font-weight-normal mb-5">Login</h1>
        <form
          autocomplete="off"
          @submit.prevent="onSubmit()"
          @keyup="form.errors.clear(event.target.name)"
        >
          <div class="form-group">
            <label for="email" class="text-muted">Email Address</label>
            <input
              type="email"
              name="email"
              class="form-control form-control-lg rounded-0 bg-white"
              placeholder="johndoe@example.com"
              v-model="form.email"
            />
          </div>
          <div class="form-group">
            <label for="password" class="text-muted">Password</label>
            <input
              type="password"
              name="password"
              class="form-control form-control-lg rounded-0 bg-white"
              v-model="form.password"
            />
          </div>
          <a href="#" class="d-block text-right small text-muted"
            >Forget Password?</a
          >
          <button class="btn btn-block btn-lg btn-dark rounded-0">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../core/Form";
export default {
  data() {
    return {
      form: new Form({
        email: "",
        password: "",
      }),
    };
  },
  methods: {
    onSubmit() {
      this.form
        .post("/login")
        .then((data) => {
          console.log(data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
};
</script>

<style>
a {
  font-family: "Comfortaa", "Roboto", sans-serif;
}
.left {
  background-image: linear-gradient(rgba(0, 0, 0, 0.9) 0 100%),
    url("../assets/1.jpg");
  background-position: center;
  background-size: cover;
}
</style>
