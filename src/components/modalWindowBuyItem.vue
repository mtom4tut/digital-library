<template>
    <div class="goodsItem">
        <div class="goodsItemInner">
            <div class="img">
                <img :src="require(`../assets/images/${item.id}.jpg`)" alt="imgBook" />
            </div>
            <h3>{{ arrayBook[indexSearch()].nameBook }}</h3>
            <b>Автор:</b> <br />
            <span>{{ arrayBook[indexSearch()].author }}</span>
            <div class="imgTrash" v-on:click="removeBuy()">
                <img src="../images/trash.svg" alt="imgBasket" />
            </div>
        </div>
        <div class="totalBlock">
            <span><b>Цена: </b> {{ arrayBook[indexSearch()].price }}₽</span>
            <div class="countBook">
                <b>Количество: </b>
                <input type="number" min="1" max="10" class="countInput" value="1" v-model="count"/>
            </div>
            <div class="total">
                <span><b>Итого: </b> {{ count*arrayBook[indexSearch()].price }}₽</span>
                <button>Купить</button>
            </div>
        </div>
    </div>
</template>

<script>
import { busEvent } from '../main';
// import data
import arrayBook from '@/json/arrayBook.json';

export default {
    name: 'modalWindowBuyItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            arrayBook,
            count: 1,
        };
    },
    methods: {
        indexSearch() {
            return this.arrayBook
                .map(function(e) {
                    return e.id;
                })
                .indexOf(this.item.id); // поиск индекса
        },
        removeBuy() {
            // уходит в mainVue.vue
            busEvent.$emit('removeBuy', this.item.id);
            // уходит в headerVue.vue
            busEvent.$emit('basketkRemoveModalWindow');
        },
    },
    watch: {
        count() {
            if (this.count <= 0) {
                this.count = 1;
            }
            if (this.count > 10) {
                this.count = 10;
            }
        }
    }
};
</script>

<style scoped>
.goodsItem {
    height: 190px;
    border-radius: 10px;
    background-color: #dce4d4;
}

.goodsItemInner {
    margin-bottom: 0;
}

.totalBlock {
    text-align: start;
    padding: 10px;
}

.countInput {
    margin-left: 10px;
    width: 40px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #57a34b;
}

.total {
    margin-top: 5px;
}

button {
    margin-left: 10px;
    padding: 2px 5px;
    border-radius: 5px;
    border: 1px solid #57a34b;
    background-color: #49e23160;
}
</style>
