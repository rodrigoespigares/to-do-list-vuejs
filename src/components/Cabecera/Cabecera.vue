<script setup>
// Hacer reactivo
import { ref } from "vue";
// Iconos
import { Icon } from "@iconify/vue";
// Diseño
import "./cabecera.css";
// Conexion
import { useCollection } from "vuefire";
import { useFirestore } from "vuefire";
// Collection
import { collection } from "firebase/firestore";
// Añadir nota
import { addDoc } from "firebase/firestore";
// Añadir fichero
import {
    getStorage,
    ref as ref_2,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

    


// Variables
const db = useFirestore();
const todos = useCollection(collection(db, "todos"));
const event = defineEmits(["search"]);
const route = useRoute();

var uid;

let text = ref("");
let buscar = ref(false);
let busqueda = ref("");
let files = ref("");
// Funciones
function newNote() {
    

    let id = Date.now();
    let arrayFiles = [];
    const storage = getStorage();
    if (files.length != undefined){
        for (const file of files) {
            const storageRef = ref_2(storage, id + "-" + file.name);
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                })
                .then((url) => {
                    if (file.name != undefined) {
                        arrayFiles.push(url);
                    }
                    if (files.length == arrayFiles.length && uid != undefined){
                        addDoc(collection(db, "todos"), {
                            text: text.value,
                            priority: 1,
                            date: Date.now(),
                            isCompleted: false,
                            archivo: arrayFiles,
                            user: uid
                        });
                        text.value = "";
                        files=null;
                    }
                });
        }
    }else{
        if( uid != undefined){
            addDoc(collection(db, "todos"), {
                text: text.value,
                priority: 1,
                date: Date.now(),
                isCompleted: false,
                user: uid
            });
            text.value = "";
        }
    }
}
function filtrado() {
    let answer = {
        isSearch: buscar.value,
        text: busqueda.value,
    };
    event("search", answer);
}
function addFile(e) {
    files = e.target.files;
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid
    } else {
        uid = undefined
    }
});
</script>

<template>
    <section id="cabecera">
        <h2>To do List</h2>
        <div id="add">
            <input @keyup.enter="newNote()" type="text" v-model="text" />
            <button @click="newNote()">Submit</button>
            <input @keyup="filtrado" type="text" v-if="buscar" placeholder="Search" v-model="busqueda" />
            <label for="search">
                <Icon icon="fluent:search-16-filled" />
            </label>
            <input @change="filtrado" type="checkbox" name="" id="search" v-model="buscar" hidden />
        </div>
        <label for="file">Add file</label>
        <input type="file" id="subir" name="add" accept="image/png, image/jpeg" @change="addFile($event)" multiple :value="files"/>
    </section>
</template>
