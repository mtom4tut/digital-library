<template>
    <header>
        <div class="header_content">
            <a href="/">
                <img src="@/images/logo.png" alt="Logo" />
            </a>

            <div class="info_block">
                <div class="info_item">
                    <button id="basket">Корзина:</button> <span id="basket_num">{{ countBasket }}</span>
                </div>

                <div class="info_item" v-on:click="openModal()">
                    <button id="bookmarks">Закладки:</button>
                    <span id="bookmarks_num">{{ countBookmarks }}</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { busEvent } from '../main'; // приходит из mainItem.vue и из modalWindow.vue, уходит в modalWindow.vue

export default {
    name: 'headerVue',
    // данные
    data() {
        return {
            countBookmarks: 0,
            countBasket: 0,
            busEvent,
        };
    },
    // при обновлении/загрузке страницы
    mounted() {
        // если есть данные в local storage, то забрать их
        if (localStorage.getItem('localStorageData')) {
            const arr = JSON.parse(localStorage.getItem('localStorageData'));
            // определение количества книг добавленных в закладки
            this.countBookmarks = arr.filter((item) => item.bookmarksActive == true).length;
        }
    },
    methods: {
        openModal() {
            // событие click уходит в modalWindow.vue
            busEvent.$emit('openModal');
        },
    },
    // получить доступ к реактивным данным и активным событиям
    created() {
        // обработка события click из mainItem.vue
        busEvent.$on('bookmarkMainСlick', (data) => {
            // изменение счетчика книг добавленных в закладки
            if (data) {
                this.countBookmarks++;
            } else {
                this.countBookmarks--;
            }
        });
        busEvent.$on('bookmarkRemoveModalWindow', (data) => {
            // изменение счетчика при удалении из модального окна закладок
            this.countBookmarks--;
        });

        // обработка события click из mainItem.vue
        busEvent.$on('basketkMainСlick', (data) => {
            // изменение счетчика книг добавленных в закладки
            if (data) {
                this.countBasket++;
            } else {
                this.countBasket--;
            }
        });
        busEvent.$on('basketkRemoveModalWindow', (data) => {
            // изменение счетчика при удалении из модального окна закладок
            this.countBasket--;
        });
    },
};
</script>

<style scoped>
header {
    width: 100%;
    height: 160px;
    background: #7bb33f;
    background: linear-gradient(180deg, #7bb33f, #57a34b);
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
}

.header_content {
    width: 1180px;
    height: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media (max-width: 1240px) {
    .header_content {
        width: 875px;
    }
}

@media (max-width: 920px) {
    header {
        height: 120px;
    }

    .header_content {
        width: 575px;
    }
}

@media (max-width: 620px) {
    .header_content {
        width: 310px;
    }
}

/* -------------------- */
.info_block {
    display: flex;
    flex-direction: column;
    position: relative;
}

.info_block::before {
    content: '';
    width: 67px;
    height: 68px;
    background-image: url(../images/basket.png);

    position: absolute;
    top: 50%;
    left: -80px;
    transform: translateY(-50%);
}

@media (max-width: 620px) {
    .info_block::before {
        display: none;
    }
}

.info_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.info_item:last-child {
    margin-top: 10px;
}

.info_item:hover {
    opacity: 1;
}

span,
button {
    font-weight: 600;
    font-size: 1.1rem;
    text-align: start;
    color: #222;
}

button {
    background-color: transparent;
    margin-right: 15px;
    cursor: pointer;
}

@media (max-width: 620px) {
    button {
        margin-right: 5px;
    }
}

</style>
