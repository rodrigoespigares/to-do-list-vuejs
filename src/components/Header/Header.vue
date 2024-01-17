<script setup>
import "./header.css";
import { Icon } from "@iconify/vue";
import { RouterLink, useRouter } from "vue-router";
import { getAuth, onAuthStateChanged,signOut  } from "firebase/auth";
import { ref } from "vue";
const router = useRouter();

function login() {
  router.push("/login");
}
var uid = ref();
var p = ref(false);
var a = ref();
const auth = getAuth();
var admins = ["ow5BChRBd8bz0VEuMc1SvsyhM422"]

onAuthStateChanged(auth, (user) => {
  if (user) {
    p.value = true;
    uid = user.uid;
    a.value = admins.includes(uid)
  } else {
    p.value = false;
    a.value = false;
  }
});

function cerrarSession() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
        router.push("/");
    })
    .catch((error) => {
      // An error happened.
    });
}

</script>
<template>
  <header>
    <div class="menu">
      <RouterLink to="/" class="menu__element"><h1>TO DO LIST</h1></RouterLink>
      <RouterLink v-if="p == true" to="/personal" class="menu__element">Tus notas</RouterLink>
      <RouterLink v-if="a" to="/admin" class="menu__element">Panel Administrador</RouterLink>
    </div>
    <button v-if="!p" @click="login" class="icon"><Icon icon="ph:user" /></button>
    <button v-else @click="cerrarSession" class="close">Cerrar sesión</button>
  </header>
</template>
