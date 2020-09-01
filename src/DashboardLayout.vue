<template>
  <div class="bg-light vh-100 d-flex">
    <div id="sidebar" class="bg-dark text-white active">
      <div class="sidebar-header text-center px-2 py-5">
        <h1 class="text-warning mb-0">satoripop</h1>
      </div>
      <div class="sidebar-content">
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
      </div>
    </div>
    <div class="right w-100">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3"
      >
        <!-- <a class="navbar-brand" href="#">Navbar</a> -->
        <button id="sidebar-toggler">
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            class="bi bi-arrow-left-right"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
        </button>
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
            <!-- <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li> -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                johndoe
              </a>
              <div
                class="dropdown-menu rounded-0 small"
                aria-labelledby="navbarDropdown"
                style="transform: translateX(-50%); font-size: 10pt;"
              >
                <a class="dropdown-item" href="#">Manage your account</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Logout</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div class="p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
window.onload = () => {
  const sidebarToggler = document.getElementById("sidebar-toggler");
  var sidebar = document.getElementById("sidebar");
  var navbarActive = true;

  sidebarToggler.addEventListener("click", () => {
    if (navbarActive) {
      sidebar.classList.remove("active");
      navbarActive = false;
    } else {
      sidebar.classList.add("active");
      navbarActive = true;
    }
  });
};
</script>

<style lang="scss" scoped>
#sidebar {
  width: 290px;
  height: 100%;
  position: absolute;
  left: -290px;
  display: block;
  top: 0;
  .sidebar-header {
    background-color: rgba($color: #000, $alpha: 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.325);
  }
  .sidebar-content {
    a {
      display: block;
      color: rgba($color: #fff, $alpha: 0.6);
      border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
      padding: 20px;
      text-decoration: none;
      border-left: 6px solid transparent;
      transition: 0.25s;
      &:hover {
        color: #fce525;
        background-color: rgba($color: #000000, $alpha: 0.2);
        border-left-color: #fce525;
      }
    }
  }
  &.active {
    left: 0;
  }
  &.active + .right {
    margin-left: 290px;
  }
}
#sidebar,
.right {
  transition: 0.5s;
}
#sidebar-toggler {
  background-color: transparent;
  border: none;
  outline: none;
  color: rgba($color: #000, $alpha: 0.6);
  &:hover {
    color: rgba($color: #000000, $alpha: 1);
  }
}
</style>
