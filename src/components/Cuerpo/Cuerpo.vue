<script setup>
    
    import "./cuerpo.css";
    import { Icon } from '@iconify/vue';
    import Counter from '../Counter/Counter.vue';
    
    import { useCollection } from 'vuefire'
    import { useFirestore } from 'vuefire';
    // Collection
    import { collection, where, query } from "firebase/firestore"; 
    // Borrar nota y actualizar
    import { doc, deleteDoc, updateDoc } from "firebase/firestore"; 
    import { computed } from "vue";
    import { getAuth } from "firebase/auth";

    const db= useFirestore();
    const misNotas = collection(db, 'todos');
    var todos;
    var uid = getAuth().currentUser.uid;
    

    todos = useCollection(query(misNotas, where("user","==",uid)));
    
    let date1 = new Date();
    let searchValues = defineProps(['searching'])

    function changePriority(num,id){
        updateDoc(doc(db,"todos",id),{
            priority: num,
        })
    }
    function remove(id){
        deleteDoc(doc(db,"todos",id))
    }
    function completed(id, bool) {
        updateDoc(doc(db,"todos",id),{
            isCompleted: bool,
        })
    }
    function countComponent(){
        let countComplete = 0
        for (const note of todos.value) {
            if(note.isCompleted == true){
                countComplete++;
            }
        }
        let answer = {
            all: todos.value.length,
            complete: countComplete,
        }
        return answer;
    }
    function completes() {
        for (const note of todos.value) {
            if(note.isCompleted == true){
                deleteDoc(doc(db,"todos",note.id))
            }
        }
    }
    function clearNotes(){
        for (const note of todos.value) {
            deleteDoc(doc(db,"todos",note.id))
        }
    }
    function time(date){
        let date2 = new Date(date);
        let reusult =  date1.getMinutes() - date2.getMinutes();
        return reusult;
    }
    const filtered = computed(() => {
        let aux;        
        if (searchValues.searching.isSearch == true) {
            if (todos.value) {
                aux = todos.value.filter(n => n.text && n.text.includes(searchValues.searching.text));
            }
        } else {
            searchValues.searching.text = "";
            aux = todos.value.filter(n => n.text && n.text.includes(searchValues.searching.text));
        }
        return aux.sort((a, b) => b.priority - a.priority);
    });
    
    
</script>
<template>
    <Counter :notes="countComponent()" @clear-completes="completes()"/>
    <section>
        <article v-for="(value,pos) in filtered" :id="pos" :key="value.id" class="article">
            <section class="main">
                <div>
                    <div id="content">
                        <input @change="completed(value.id,value.isCompleted)" type="checkbox" :id="value.id" v-model="value.isCompleted" class="checkbox-round">
                        <p :class="{active: value.isCompleted}">{{value.text}}</p>
                    </div>
                    <div id="buttons">
                        <button id="delete" @click="remove(value.id)"><Icon icon="solar:trash-bin-trash-bold" class="delete--icono" /></button>
                    </div>
                </div>
                <div class="archivo" v-if="value.archivo" v-for="archivo in value.archivo">
                    <Icon icon="ant-design:paper-clip-outlined" />
                    <a target="_blank" :href="archivo" :download="value.text">Archivo adjunto</a>
                </div>
            </section>
            <footer>
                <p>Priority:</p>
                <button @click="changePriority(0,value.id)" :class="{low:value.priority==0}"><Icon icon="teenyicons:down-small-outline"/>Low</button>
                <button @click="changePriority(1,value.id)" :class="{medium:value.priority==1}">Medium</button>
                <button @click="changePriority(2,value.id)" :class="{high:value.priority==2}">High<Icon icon="teenyicons:up-small-outline"/></button>
                <p v-if="time(value.date) >0" id="time">{{ time(value.date) }} minutes ago</p>
                <p v-else id="time">Right now</p>
            </footer>
        </article>
    </section>
    <button id="clear" @click="clearNotes">Clear items</button>
</template>