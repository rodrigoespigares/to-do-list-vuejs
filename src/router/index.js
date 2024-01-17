import { createRouter, createWebHistory } from 'vue-router'
import LandingVue from '@/components/Landing/Landing.vue'
import LoginVue from '@/components/Login/Login.vue'
import PersonalVue from '@/Views/Personal.vue';
import AdminMenuVue from '@/Views/Admin.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingVue,
            meta: { transition: 'slide-left' },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginVue,
            meta: { transition: 'slide-left' },
        },
        {
            path: '/personal',
            name: 'personal',
            component: PersonalVue,
            meta: { transition: 'slide-left' },
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminMenuVue,
            meta: { transition: 'slide-left' },
        }
    ]
})
var uid;
var admins = ["ow5BChRBd8bz0VEuMc1SvsyhM422"]

router.beforeEach((to, from) => {
    if (to.path == "/personal" && uid == undefined){
        return false;
    }
    else if(to.path == "/admin" && !admins.includes(uid)){
        return false;
    }else{
        return true;
    }
})

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
    } else {
        uid = undefined;
        router.push("/")
    }
});
export default router
