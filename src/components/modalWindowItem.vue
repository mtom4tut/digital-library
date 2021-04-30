<template>
    <div class="goodsItem">
        <div class="img">
            <img :src="require(`../assets/images/${item.id}.jpg`)" alt="imgBook" />
        </div>
        <h3>{{ arrayBook[indexSearch()].nameBook }}</h3>
        <b>Автор:</b> <br />
        <span>{{ arrayBook[indexSearch()].author }}</span>
        <div class="imgTrash" v-on:click="removeBookmarks()">
            <img src="../images/trash.svg" alt="imgBasket" />
        </div>
    </div>
</template>

<script>
import { busRemove } from '../main';
// import data
import arrayBook from '@/json/arrayBook.json';

export default {
    name: 'modalWindowItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
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
                .indexOf(this.item.id);
        },
        removeBookmarks() {
            // уходит в mainVue.vue
            busRemove.$emit('removeBookmarks', this.item.id);
        },
    },
};
</script>

<style scoped>
.goodsItem {
    height: 100px;
    border-radius: 10px;
    background-color: #5ea6490d;
    margin: 10px 0;
    overflow: hidden;
    position: relative;
    text-align: start;
    padding-left: 100px;
}

.img {
    height: 100%;
    position: absolute;
    left: 0;
}

img {
    width: auto;
    height: 100%;
}

.imgTrash {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.4;
    transition: opacity 0.2s;
}

.imgTrash img {
    width: 30px;
}

.imgTrash:hover {
    opacity: 1;
}
</style>
