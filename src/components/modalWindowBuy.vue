<template>
    <!-- стили для этого компонента такие же как и для modalWindow.vue -->
    <section class="section-modal" v-bind:class="{ modalActive: isActive}">
        <h2 class="modal-title">Корзина</h2>
        <button class="modal-close" @click="isActive = false">
            <img src="@/images/close.svg" alt="close" />
        </button>

        <div class="block_goods" v-bind:class="{ isempty: isempty }" v-bind:arrayBook="localStorageArrBuyId">
            <modalWindowBuyItem
                v-for="item of localStorageArrBuyId"
                v-bind:key="item"
                v-bind:item="item"
            />
        </div>
    </section>
</template>

<script>
import modalWindowBuyItem from '@/components/modalWindowBuyItem';
import { busEvent } from '../main';

export default {
    name: 'modalWindowBuy',
    components: {
        modalWindowBuyItem,
    },
    data() {
        return {
            isActive: false,
            isempty: true,
            localStorageArrBuyId: [],
        };
    },
    created() {
        // приходит события открытия модального окна закладок
        busEvent.$on('openModalBuy', () => {
            this.isActive = true;
        });
    },
    mounted() {
        // считывание с последующим обновлением данных из local storage
        setInterval(() => {
            if (localStorage.getItem('localStorageArrBuyId')) {
                this.localStorageArrBuyId = JSON.parse(localStorage.getItem('localStorageArrBuyId'));
                if (this.localStorageArrBuyId.length > 0) {
                    // если есть данные то убрать значок "пусто"
                    this.isempty = false;
                } else {
                    // если есть данные то добавить значок "пусто"
                    this.isempty = true;
                }
            }
        }, 200);
    },
};
</script>

