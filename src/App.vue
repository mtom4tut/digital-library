<template>
    <div id="app">
        <!-- шапка сайта  -->
        <headerVue />

        <!-- основной блок -->
        <mainVue />

        <!-- модальное окно закладок -->
        <modalWindow />
        <modalWindowBuy />
    </div>
</template>

<script>
import headerVue from '@/components/headerVue';
import mainVue from '@/components/mainVue';

// import components modal window
import modalWindow from '@/components/modalWindow';
import modalWindowBuy from '@/components/modalWindowBuy';

export default {
    name: 'App',
    // подключение компонентов
    components: {
        headerVue,
        mainVue,
        // components modal window
        modalWindow,
        modalWindowBuy,
    },
};
</script>

<style>
/* глобальные стили стили  */
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
input,
select,
button {
    outline: none;
    border: none;
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
}
</style>
