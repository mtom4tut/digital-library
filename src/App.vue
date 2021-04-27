<template>
    <div id="app">
        <headerVue />

        <!-- modal window -->
        <modalWindow />
    </div>
</template>

<script>
import headerVue from '@/components/headerVue';

// import components modal window
import modalWindow from '@/components/modalWindow';

export default {
    name: 'App',
    components: {
        headerVue,
        // components modal window
        modalWindow,
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;600&display=swap');

#app {
    font-family: 'Fira Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
}

a,
button {
    outline: none;
    border: none;
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}
</style>
