<template>
  <div class="wrapper min-vh-100">
    <div id="sidebar" class="text-light active">
      <div class="sidebar-brand text-center py-4">
        <h1 class="text-warning mb-0">satoripop</h1>
        <p class="text-white lead mb-0">Shine clever !</p>
      </div>
      <div class="sidebar-content">
        <a href="#">Collaborators</a>
        <a href="#">Recruitments</a>
        <a href="#">Training</a>
        <a href="#">Assessments and careers</a>
        <a href="#">Leaves and absences</a>
        <a href="#">Time and activities</a>
        <a href="#">HR monitoring and reporting</a>
      </div>
    </div>
    <div class="right">
      <nav
        class="navbar navbar-expand-sm navbar-dark"
        style="background-color: #202020;"
      >
        <button id="sidebar-toggler">
          <!-- <i class="fas fa-bars fa-lg"></i> -->
          toggle
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
                class="dropdown-menu rounded-0"
                aria-labelledby="navbarDropdown"
                style="transform: translateX(-50%)"
              >
                <a class="dropdown-item" href="#">Manage account</a>
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
window.onload = function() {
  const sidebarToggler = document.getElementById("sidebar-toggler");
  var sidebar = document.getElementById("sidebar");
  var sidebarActive = true;

  sidebarToggler.addEventListener("click", () => {
    if (sidebarActive) {
      sidebar.classList.remove("active");
      sidebarActive = false;
    } else {
      sidebar.classList.add("active");
      sidebarActive = true;
    }
  });
};
</script>

<style lang="scss" scoped>
#sidebar {
  width: 275px;
  min-height: 100%;
  background-color: #2e2e2e;
  position: absolute;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  left: -275px;
  transition: 0.5s;
  .sidebar-brand {
    background-color: rgba(0, 0, 0, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .sidebar-content a {
    padding: 15px;
    display: block;
    color: rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba($color: #fff, $alpha: 0.1);
    text-decoration: none;
    transition: 0.5s;
    font-size: 10pt;
    &:hover {
      color: white;
      background-color: rgba(0, 0, 0, 0.225);
    }
  }
  &.active {
    left: 0;
  }
}
#sidebar.active + .right {
  margin-left: 275px;
}
#sidebar-toggler {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14pt;
  padding-top: 9px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 4px;
  color: rgba($color: #fff, $alpha: 0.6);
  background-color: transparent;
  &:hover {
    color: #fff;
  }
}
.right {
  transition: 0.5s;
}
.dropdown-menu {
  font-size: 10pt;
}
</style>
