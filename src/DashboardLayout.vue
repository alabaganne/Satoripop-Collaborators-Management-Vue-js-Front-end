<template>
  <div class="min-vh-100 d-flex flex-column">
    <nav class="navbar navbar-expand navbar-light bg-white border-bottom">
      <a class="navbar-brand" href="#">
        <img src="./assets/logo.svg" height="50px" alt />
        satoripop
      </a>
      <button id="sidebar-toggler" class="border p-2" @click="toggleSidebar">
        sidebar
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
          </li>-->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >{{ user ? user.name : "John Doe" }}</a
            >
            <div
              class="dropdown-menu rounded-0 small"
              aria-labelledby="navbarDropdown"
              style="transform: translateX(-35%); font-size: 10pt;"
            >
              <a class="dropdown-item" href="#">
                <!-- <i class="fas fa-cog fa-lg mr-2"></i> -->
                Account
              </a>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" @click="logout">
                <!-- <i class="fas fa-sign-out-alt fa-lg mr-2"></i> -->
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div id="container" class="bg-light flex-fill d-flex">
      <BackgroundLogo />
      <div
        id="sidebar"
        class="bg-dark text-white shadow border-right border-secondary"
        :class="{ active: sidebarActive }"
      >
        <div class="sidebar-links">
          <a href="#">Collaborators</a>
          <a href="#">Recruitments</a>
          <a href="#">Training</a>
          <a href="#">Evaluations & Careers</a>
          <a href="#">Leave & Absences</a>
          <a href="#">Time & activities</a>
          <a href="#">HR monitoring & reporting</a>
        </div>
      </div>
      <div class="right w-100">
        <div class="p-4">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    BackgroundLogo: () => {
      return import("./components/BackgroundLogo");
    },
  },
  data() {
    return {
      sidebarActive: true,
    };
  },
  created() {
    if (window.innerWidth < 750) {
      this.sidebarActive = false;
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive;
    },
    ...mapActions({
      logoutAction: "auth/logout",
    }),
    logout() {
      this.logoutAction().then(() => {
        this.$router.replace({
          name: "login",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  .navbar-brand {
    font-size: 24pt;
    font-weight: bold;
    color: var(--dark);
  }
  #sidebar-toggler {
    background-color: transparent;
    border: none;
    outline: none;
    color: rgba($color: #000, $alpha: 0.4);
    transition: 0.25s;
    &:focus {
      // background-color: #f8f9fa !important;
    }
    &:hover {
      background-color: var(--light);
      color: var(--dark);
      border-color: var(--dark) !important;
    }
  }
}
#container {
  position: relative;
}
#sidebar {
  width: 305px;
  height: 100%;
  position: absolute;
  left: -305px;
  display: block;
  top: 0;
  .sidebar-links {
    a {
      display: block;
      color: rgba($color: #fff, $alpha: 0.6);
      border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
      padding: 1.5em;
      text-decoration: none;
      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.2);
        color: var(--warning);
        border-color: var(--warning);
      }
    }
  }
  &.active {
    left: 0;
  }
  &.active + .right {
    margin-left: 305px;
  }
}
#sidebar,
// .sidebar-links a,
.right {
  transition: 0.5s;
}
@media screen and (max-width: 750px) {
  // bootstrap md breakpoint: 768px
  #sidebar {
    &.avtive {
      left: 0;
    }
    &.active + .right {
      margin-left: 0;
    }
  }
}
.dropdown-menu {
  padding: 0;
  .dropdown-divider {
    margin: 0;
  }
  .dropdown-item {
    padding: 10px 15px;
  }
}

@media screen and (max-width: 550px) {
  #sidebar {
    width: 100%;
    left: -100%;
  }
  nav {
    font-size: 10pt;
    .navbar-brand {
      font-size: 18pt;
    }
    .dropdown-menu {
      margin-top: 10px;
    }
  }
}
</style>
