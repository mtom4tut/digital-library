<template>
    <div class="goodsItem">
        <div class="img">
            <img :src="require(`../assets/images/${item}.jpg`)" alt="imgBook" />
        </div>
        <h3>{{ arrayBook[indexSearch()].nameBook }}</h3>
        <b>Автор:</b> <br />
        <span>{{ arrayBook[indexSearch()].author }}</span>
        <div class="imgTrash" v-on:click="removeBuy()">
            <img src="../images/trash.svg" alt="imgBasket" />
        </div>
    </div>
</template>

<script>
import { busEvent } from '../main'; // уходит mainVue.vue при клике на кнопку удаления
                                    // уходит в headerVue.vue при удалении закладки
// import data
import arrayBook from '@/json/arrayBook.json';

export default {
    name: 'modalWindowBuyItem',
    props: ['item'],
    data() {
        return {
            arrayBook,
        };
    },
    methods: {
        indexSearch() {
            return this.arrayBook
                .map(function(e) {
                    return e.id;
                })
                .indexOf(this.item); // поиск индекса
        },
        removeBuy() {
            // уходит в mainVue.vue
            busEvent.$emit('removeBuy', this.item);
            // уходит в headerVue.vue
            busEvent.$emit('basketkRemoveModalWindow');
        },
    },
};
</script>


