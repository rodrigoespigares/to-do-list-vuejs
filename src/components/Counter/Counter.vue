<script setup>
    import './counter.css';
    
    defineProps(['notes'])
    const event = defineEmits(['clearCompletes']);

    function removeCompletes(){
        event('clearCompletes',true);
    }
</script>

<template>
    <div id="count">
        <p v-if="notes.all > 0 ">{{ notes.complete }} tasks completed out of {{ notes.all }}</p>
        <p v-else>There is no task.</p>
        <button @click="removeCompletes" v-if="notes.complete>0">Delete completed ones</button>
    </div>
</template>