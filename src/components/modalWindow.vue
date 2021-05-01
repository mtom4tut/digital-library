<template>
    <section class="section-modal" v-bind:class="{ modalActive: isActive }">
        <h2 class="modal-title">Закладки</h2>
        <button class="modal-close" @click="isActive = false">
            <img src="@/images/close.svg" alt="close" />
        </button>

        <div class="block_goods" v-bind:class="{ isempty: isempty }" v-bind:arrayBook="localStorageBookmarks">
            <modalWindowItem v-for="item of localStorageBookmarks" v-bind:key="item.id" v-bind:item="item" />
        </div>
    </section>
</template>

<script>
import modalWindowItem from '@/components/modalWindowItem';
import { busEvent } from '../main'; // приходит событие click из headerVue.vue

export default {
    name: 'modalWindow',
    components: {
        modalWindowItem,
    },
    data() {
        return {
            isActive: false,
            isempty: true,
            localStorageBookmarks: [],
        };
    },
    created() {
        // приходит события открытия модального окна закладок
        busEvent.$on('openModal', () => {
            this.isActive = true;
        });
    },
    mounted() {
        // считывание с последующим обновлением данных из local storage
        setInterval(() => {
            if (localStorage.getItem('localStorageData')) {
                const arr = JSON.parse(localStorage.getItem('localStorageData'));
                this.localStorageBookmarks = arr.filter((item) => item.bookmarksActive == true);
                if (this.localStorageBookmarks.length > 0) {
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

<style>
/* ---------------- */
/* стили для модального окна */
.section-modal {
    display: none;
    grid-template-rows: 13% 1fr;
    width: 510px;
    height: 500px;
    background-color: #ecebeb;
    border-radius: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    -webkit-box-shadow: 0px 4px 20px #5ea64965;
    -moz-box-shadow: 0px 4px 20px #5ea64965;
    box-shadow: 0px 4px 20px #5ea64965;
    overflow: hidden;
}

@media (max-width: 620px) {
    .section-modal {
        width: 310px;
    }
}

/* класс который показывает модальное окно */
.modalActive {
    display: grid;
}

.modal-title {
    margin: 0;
    padding: 20px 0;
    background-color: #5ea64965;
}

/* ------------- */
/* стили для кнопки закрыть модальное окно */
.modal-close {
    width: 26px;
    height: 30px;
    padding: 0;
    background: transparent;
    cursor: pointer;

    position: absolute;
    top: 20px;
    right: 15px;
    z-index: 1;
    transition: transform 0.2s;
}

.modal-close img {
    width: 100%;
    height: 100%;
}

.modal-close:hover {
    transform: translateY(-3px);
}

/* контейнер для закладок */
.block_goods {
    position: relative;
    padding: 20px;
    overflow: hidden;
    overflow-y: scroll;
}

/* добавляется если модальное окно с закладками пустое */
.isempty {
    display: flex;
    justify-content: center;
    align-items: center;
}

.isempty::before {
    content: '';
    width: 74px;
    height: 70px;
    background: url(../images/empty.png) no-repeat;
    background-size: cover;
    opacity: 0.5;
}
</style>
