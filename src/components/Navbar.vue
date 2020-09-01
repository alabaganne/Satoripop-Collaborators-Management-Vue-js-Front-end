<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom py-1">
    <div class="container">
      <a class="navbar-brand d-flex" href="#">
        <img
          src="../assets/logo.svg"
          height="55px"
          width="55px"
          class="mr-2"
          alt="satoripop logo"
        />
        <div class="mt-auto">
          <p class="mb-0 font-weight-bold" style="line-height: .5;">
            Satoripop
          </p>
          <small class="font-weight-normal text-secondary"
            >Shine clever !</small
          >
        </div>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <!-- <li>
            <a class="nav-link" href="#">
              <i class="fas fa-clock"></i>
            </a>
          </li>
          <li>
            <a class="nav-link" href="#"><i class="fas fa-bell"></i></a>
          </li>
          <li>
            <a class="nav-link" href="#"> <i class="fas fa-cog"></i></a>
          </li> -->
          <li class="nav-item dropdown">
            <a
              class="nav-link"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              John Doe <i class="fas fa-caret-down"></i>
            </a>
            <div class="dropdown-menu small" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Manage Account</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style></style>
