<template>
    <div class="interactive_block">
        <!-- блок: поиск, сортировка, реверс -->
        <div class="block">
            <!-- поиск книг -->
            <input
                type="text"
                name="searchBook"
                id="searchBook"
                placeholder="Найти книгу"
                v-model="searchText"
            />

            <!-- сортировка -->
            <span>Сортировать по:</span>
            <select name="filterSort" v-model="filterSort">
                <option value="Алфавиту">Алфавиту</option>
                <option value="Рейтингу">Рейтингу</option>
                <option value="Дате">Дате</option>
            </select>

            <!-- реверс -->
            <button
                aria-label="direction-sort"
                v-bind:class="{ inverse: isActiveReverse }"
                v-on:click="isActiveReverse = !isActiveReverse"
            >
                <img src="../images/arrow.png" alt="arrow" />
            </button>
        </div>

        <!-- фильтры -->
        <div class="block">
            <!-- фильтер по издательству -->
            <div class="containerFilter">
                <span>Издательство:</span>
                <select
                    name="filterPublishingHouse"
                    v-bind:arrayPublishingHouse="filterPublishingHouse"
                    v-model="filterPublishingHouse"
                >
                    <mainOptionItem
                        v-for="item of arrayPublishingHouse"
                        v-bind:key="item.id"
                        v-bind:item="item"
                    />
                </select>
            </div>

            <!-- фильтер по автору -->
            <div class="containerFilter">
                <span>Автор:</span>
                <select name="filterAuthor" v-bind:arrayAuthor="arrayAuthor" v-model="filterAuthor">
                    <mainOptionItem v-for="item of arrayAuthor" v-bind:key="item.id" v-bind:item="item" />
                </select>
            </div>

            <!-- фильтер по году издания -->
            <div class="containerFilter">
                <span>Год:</span>
                <select name="filterYear" v-bind:arrayYear="arrayYear" v-model="filterYear">
                    <mainOptionItem v-for="item of arrayYear" v-bind:key="item.id" v-bind:item="item" />
                </select>
            </div>
        </div>
    </div>
</template>

<script>
import mainOptionItem from '@/components/mainOptionItem';

// import data --------------
// массив издательств
import arrayPublishingHouse from '@/json/arrayPublishingHouse.json';
// массив авторов
import arrayAuthor from '@/json/arrayAuthor.json';
// массив годов
import arrayYear from '@/json/arrayYear.json';

export default {
    name: 'mainVue',
    components: {
        mainOptionItem, // option для select
    },
    data() {
        return {
            arrayPublishingHouse,
            arrayAuthor,
            arrayYear,
            isActiveReverse: false,
            filterPublishingHouse: 'Все',
            filterAuthor: 'Все',
            filterYear: 'Все',
            filterSort: 'Алфавиту',
            searchText: '',
        };
    },
    // следить за изменением следующих событий
    watch: {
        // при сробатовании данные отправляются в родительский элемент (mainVue.vue)
        filterAuthor(value) {
            this.$parent.filterAuthor = value;
        },
        filterPublishingHouse(value) {
            this.$parent.filterPublishingHouse = value;
        },
        filterYear(value) {
            this.$parent.filterYear = value;
        },
        filterSort(value) {
            this.$parent.filterSort = value;
        },
        searchText(value) {
            this.$parent.searchText = value;
        },
        isActiveReverse(value) {
            this.$parent.isActiveReverse = value;
        },
    },
};
</script>

<style scoped>
.interactive_block {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.block {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

@media (max-width: 620px) {
    .block {
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 0 10px 0;
    }
}

/* ------------- */
/* стили для поиска */
input {
    width: 250px;
    border: 2px solid #5ea649;
    border-radius: 10px;
    padding: 15px;
}

input:focus {
    background-color: #5ea64930;
}

@media (max-width: 920px) {
    input {
        width: 180px;
    }
}

@media (max-width: 920px) {
    .containerFilter {
        display: flex;
        flex-direction: column;
        margin: 0 15px;
    }

    .containerFilter select {
        margin-top: 5px;
    }
}

@media (max-width: 620px) {
    .containerFilter {
        margin: 0 5px;
    }

    input {
        width: 100%;
        margin-bottom: 10px;
    }

    .containerFilter select {
        margin-bottom: 10px;
    }
}

/* ------------- */
/* общие стили */
span {
    margin: 0 15px;
    font-weight: 600;
    font-size: 1.05rem;
}

@media (max-width: 620px) {
    span {
        margin: 0 10px 0 0;
         font-size: 1rem;
    }
}

select {
    border: 2px solid #5ea649;
    border-radius: 8px;
    padding: 10px;
    font-size: 1.05rem;
}

@media (max-width: 620px) {
    select {
        font-size: 1rem;
    }
}

button {
    background-color: transparent;
    border: 1px solid #5ea649;
    border-radius: 5px;
    margin: 0 15px;
    padding: 10px;
}

@media (max-width: 620px) {
    button {
        margin: 0 0 0 10px;
    }
}

input:hover,
select:hover,
button:hover {
    border-color: #888;
}

/* класс добавляется/убирается при нажатии кнопки реверса*/
.inverse {
    transform: rotate(180deg);
}
</style>
