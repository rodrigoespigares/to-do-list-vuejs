<script setup>
import "./login.css";
import { Icon } from "@iconify/vue";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GithubAuthProvider

} from "firebase/auth";
import {ref} from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();
var emailRegistro = ref();
var passRegistro = ref();
var emailInicio = ref();
var passInicio = ref();
var link = "/personal"

function iniciaSesionGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            router.push(link);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

function inicioCorreo() {
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, emailInicio.value, passInicio.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            router.push(link);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

function registroCorreo() {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, emailRegistro.value, passRegistro.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            router.push(link);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(error.message)
        });
}
function iniciaSesionGitHub() {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        router.push(link);
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
    });
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');


function cambioClase(clase) {
    const container = document.getElementById('container');
    if (clase) {
        container.classList.add("right-panel-active");
    } else {
        container.classList.remove("right-panel-active");
    }
}


</script>

<template>
    <section id="login__register">
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <div class="form">
                    <h1>Crear una cuenta</h1>
                    <div class="social-container">
                        <button @click="iniciaSesionGoogle" type="button" class="social">
                            <Icon icon="mingcute:google-fill" />
                        </button>
                        <button type="button" class="social">
                            <Icon icon="bxl:facebook" />
                        </button>
                        <button @click="iniciaSesionGitHub" type="button" class="social">
                            <Icon icon="fluent-mdl2:git-hub-logo" />
                        </button>
                    </div>
                    <span>o usa un email para registrarte</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" v-model="emailRegistro"/>
                    <input type="password" placeholder="Password" v-model="passRegistro"/>
                    <button @click="registroCorreo()" class="buttons">Registro</button>
                </div>
            </div>
            <div class="form-container sign-in-container">
                <div class="form">
                    <h1>Inicio de sesión</h1>
                    <div class="social-container">
                        <button @click="iniciaSesionGoogle" type="button" class="social">
                            <Icon icon="mingcute:google-fill" />
                        </button>
                        <button type="button" class="social">
                            <Icon icon="bxl:facebook" />
                        </button>
                        <button @click="iniciaSesionGitHub" type="button" class="social">
                            <Icon icon="fluent-mdl2:git-hub-logo" />
                        </button>
                    </div>
                    <span>o usa tu cuenta</span>
                    <input type="email" placeholder="Email" v-model="emailInicio"/>
                    <input type="password" placeholder="Password" v-model="passInicio"/>
                    <button @click="inicioCorreo()" class="buttons">Inicio sesión</button>
                </div>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Bienvendio</h1>
                        <p>
                            Inicia sesión con tu información personal
                        </p>
                        <button @click="cambioClase(false)" class="buttons ghost" id="signIn">Inicio sesión</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hola, bienvenido</h1>
                    <p>Coloca tus datos para registrarte haciendo click</p>
                    <button @click="cambioClase(true)" class="buttons ghost" id="signUp">Registrate</button>
                </div>
            </div>
        </div>
    </div>
</section></template>
