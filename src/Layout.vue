<template>
    <div class="min-vh-100 d-flex flex-column overflow-hidden"> <!-- OVERFLOW HIDDEN -->
        <nav class="navbar navbar-expand navbar-light bg-white shadow-sm">
            <button id="sidebar-toggler" class="btn shadow-none mr-2 text-secondary" :class="{ 'opacity-1': sidebar.active }" @click="toggleSidebar">
                <i class="fas fa-align-left fa-2x"></i>
            </button>
            <!-- <a class="navbar-brand font-weight-bold text-dark mr-4" href="#">satoripop</a> -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto font-weight-bold">
                    <li class="nav-item clickable mr-2">
                        <router-link class="nav-link" :to="{ name: 'settings' }">
                            <i class="fas fa-cog mr-1"></i>
                            <span>Settings</span>
                        </router-link>
                    </li>
                    <li class="nav-item clickable" @click="onLogout"> 
                        <a class="nav-link" href="#">
                            <i class="fas fa-sign-out-alt mr-1"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="d-flex flex-column flex-fill text-dark wrapper">
            <!-- Sidebar -->
            <div class="sidebar bg-dark" :class="{ 'active': sidebar.active }" id="sidebar">
                <div class="sidebar-header px-3 py-5 d-flex align-items-center flex-column">
                    <img src="./assets/me.jpg" class="rect rounded-circle mb-3 shadow" alt="John Doe">
                    <h4 class="text-warning mb-0">{{ user ? user.name : 'John Doe' }}</h4>
                    <span class="text-white">Manager</span>
                </div>
                <div id="accordion" class="sidebar-links">
                    <!-- DROPDOWN -->
                    <a class="d-flex justify-content-between align-items-center" href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span>Collaborators</span>
                        <i class="fas fa-chevron-down"></i>
                    </a>
                    <div id="collapseOne" class="dropdown collapse show" data-parent="#accordion">
                        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
                        <router-link :to="{ name: 'collaborators' }">Collaborators</router-link>
                        <a href="#">Archive</a>
                    </div>
                    <!-- END DROPDOPWN -->
                    <a href="#">Recruitments</a>
                    <a href="#">Training</a>
                    <a href="#">Evaluations and careers</a>
                    <a href="#">Leave and absences</a>
                    <a href="#">Time and activities</a>
                    <!-- <a href="#">HR meporting & reporting</a> -->
                </div>
            </div>
            <!-- Dynamic content -->
            <div class="right bg-light flex-fill d-flex">
                <div class="flex-fill d-flex flex-column">
                    <main class="mt-2 mt-md-0 p-2 p-md-4">
                        <router-view />
                    </main>
                    <footer class="text-center text-muted mt-auto pb-4">
                        <p class="mb-0">copyrights goes to <a target="_blank" href="#">satoripop</a></p>
                    </footer>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            sidebar: {
                active: true
            }
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        }),
    },
    methods: {
        toggleSidebar() {
            this.sidebar.active = !this.sidebar.active;
        },
        ...mapActions({
            'logout': 'auth/logout',
            'refreshToken': 'auth/refreshToken' // !For testing..
        }),
        onLogout() {
            this.logout().then(() => {
                this.$router.replace({ name: 'login' });
            })
        }
    },
    mounted() {
        if(window.innerWidth < 1199.98) {
            this.sidebar.active = false;
        }
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
}
#sidebar {
    position: absolute;
    top: 0;
    left: -320px;
    width: 320px;
    height: 100%;
    background-image: linear-gradient(rgba(0,0,0,.8) 0 100%), url("./assets/2.jpg");
    background-size: cover;
    overflow: hidden;
    z-index: 100;
    .sidebar-header {
        background-color: rgba(0,0,0,.4);
        border-bottom: 1px solid rgba(255,255,255,.25);
    }
    a {
        display: block;
        padding: 1em;
        color: white;
        text-decoration: none;
        border-left-width: 1px;
        border-left-style: solid;
        border-left-color: transparent;
        &:hover {
            background-color: rgba(0,0,0,.4);
            color: var(--warning);
            border-left-color: var(--warning);
        }
        &[aria-expanded=true] {     
            border-left-color: var(--warning);
            background-color: rgba(0,0,0,1);
            color: var(--warning);
            i.fa-chevron-down {
                transform: rotate(0deg);
            }
        }
        &[aria-expanded=true], &:hover {
            padding-left: 1.25em;
        }
    }
    .dropdown {
        background-color: rgba(0,0,0,.2);
        > a {
            border: none;
            color: rgba(255,255,255,.6);
            font-size: 10pt;
            &:hover {
                color: white;
                background-color: rgba(0,0,0,.4);
            }
        }
    }
    a, .dropdown {
        border-bottom: 1px solid rgba(255,255,255,.225);
    }
    &.active {
        left: 0;
    }
    &.active + .right {
        margin-left: 320px;
    }
}
.sidebar-links a i {
    transform: rotate(-90deg);
}
@media (max-width: 1199.98px) {
    .right {
        margin-left: 0 !important;
    }
}
nav {
    z-index: 110;
    #sidebar-toggler {
        cursor: pointer;
        opacity: .6;
        &:hover {
            opacity: 1;
        }
    }
    ul li i {
        color: var(--primary);
    }
}
@media (max-width: 575.98px) {
    #sidebar {
        width: 100%;
        left: -100%;
        font-size: 10pt;
    }
    nav {
        font-size: 10pt;
    }
}
* {
    transition: .5s;
}
</style>