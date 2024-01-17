<script setup>
    import Cabecera from '@/components/Cabecera/Cabecera.vue';
    import Cuerpo from '@/components/Cuerpo/Cuerpo.vue';
    import Admin from '@/components/Admin/Admin.vue';
    import { ref, computed } from 'vue';
    import { getAuth } from "firebase/auth";
    let isSearch = ref(false);
    let text = ref ("");

    function taskFilter(answer){
        isSearch.value = answer.isSearch;
        text.value = answer.text;
    }
    
    const task = computed(() => {
        return {isSearch: isSearch.value, text:text.value};
    })
    var uid = getAuth().currentUser.uid;
    var admins = ["ow5BChRBd8bz0VEuMc1SvsyhM422"]

    var admin = admins.includes(uid);
</script>

<template>
    <Cabecera @search="taskFilter"/>

    <Cuerpo :searching="task"/>
    

</template>