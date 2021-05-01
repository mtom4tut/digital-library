<template>
    <main id="main">
        <!-- интерактивный блок в котором можно осуществить сортировку, поиск, фильтрацию -->
        <mainInteractiveBlock />

        <!-- блок с выводом карточек книг -->
        <div
            class="main_blockItems"
            v-bind:arrayBook="filterFunction"
            @click="persist"
            v-on:updateRatingSort="this.filterSortFunction"
        >
            <mainItem v-for="item of filterFunction" v-bind:key="item.id" v-bind:item="item" />
        </div>
    </main>
</template>

<script>
import mainInteractiveBlock from '@/components/mainInteractiveBlock';
import mainItem from '@/components/mainItem';
import { busEvent } from '../main'; // событие удаления закладки, приходит из modalWindow.vue
// import data
import arrayBook from '@/json/arrayBook.json';
export default {
    name: 'mainVue',
    components: {
        mainInteractiveBlock,
        mainItem,
        busEvent,
    },
    data() {
        return {
            arrayBook,
            localStorageData: [],
            localStorageArrBuyId: [],
            filterPublishingHouse: 'Все',
            filterAuthor: 'Все',
            filterYear: 'Все',
            filterSort: 'Алфавиту',
            searchText: '',
            isActiveReverse: false,
        };
    },
    // вычисляемые свойства
    computed: {
        // фильтрация и поиск
        filterFunction() {
            let arr = this.arrayBook;
            //фильтрация по автору
            if (this.filterAuthor !== 'Все') {
                arr = arr.filter((item) => item.author == this.filterAuthor);
            }
            //фильтрация по издательству
            if (this.filterPublishingHouse !== 'Все') {
                arr = arr.filter((item) => item.publishingHouse == this.filterPublishingHouse);
            }
            //фильтрация по году
            if (this.filterYear !== 'Все') {
                arr = arr.filter((item) => item.yearPublishing == this.filterYear);
            }
            // фильтрация по поиску
            if (this.searchText !== '') {
                arr = arr.filter(
                    (item) =>
                        item.nameBook
                            .slice(0, this.searchText.length) // обрезать слово
                            .toLowerCase() // привести к нижнему регистру
                            .search(this.searchText.toLowerCase()) != -1 // поиск подстроки в строке
                );
            }

            if (this.isActiveReverse) {
                arr = arr.slice().reverse();
            }

            return arr;
        },
        // сортировка
        filterSortFunction() {
            let arr = this.arrayBook;
            // сортировка по алфавиту
            if (this.filterSort == 'Алфавиту') {
                arr = arr.sort((i, j) => (i.nameBook > j.nameBook ? 1 : -1));
            }
            // сортировка по рейтингу
            if (this.filterSort == 'Рейтингу') {
                arr = arr.sort((i, j) => (i.rating > j.rating ? 1 : -1));
            }
            // сортировка по дате
            if (this.filterSort == 'Дате') {
                arr = arr.sort((i, j) => (i.yearPublishing > j.yearPublishing ? 1 : -1));
            }
            return arr;
        },
    },
    watch: {
        filterSort() {
            // сортировка при изменения способа сортировки
            this.filterSortFunction;
        },
        isActiveReverse() {
            // реверс при клике
            this.filterFunction;
        },
    },
    methods: {
        // добавление/обновление данных в local storage
        // добавление/обновление происходит при клике в main_blockItems
        persist() {
            this.localStorageData = [];
            for (const item of this.arrayBook) {
                if (item.bookmarksActive || item.yourRating) {
                    this.localStorageData.push({
                        id: item.id,
                        bookmarksActive: item.bookmarksActive,
                        rating: item.rating,
                        yourRating: item.yourRating,
                    });
                }
            }
            const parsedData = JSON.stringify(this.localStorageData);
            const parsedId = JSON.stringify(this.localStorageArrBuyId);
            localStorage.setItem('localStorageData', parsedData);
            localStorage.setItem('localStorageArrBuyId', parsedId);
        },
    },
    mounted() {
        //отсортировать при загрузке страницы
        this.filterSortFunction;
        // получить данных из local storage
        // проверка наличиия данных
        if (localStorage.getItem('localStorageData')) {
            this.localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
            for (const item of this.localStorageData) {
                let index = this.arrayBook
                    .map(function(e) {
                        return e.id;
                    })
                    .indexOf(item.id); // поиск по id
                this.arrayBook[index].bookmarksActive = item.bookmarksActive;
                this.arrayBook[index].rating = item.rating;
                this.arrayBook[index].yourRating = item.yourRating;
            }
        }
        // проверка наличиия данных
        if (localStorage.getItem('localStorageArrBuyId')) {
            this.localStorageArrBuyId = JSON.parse(localStorage.getItem('localStorageArrBuyId'));
        }
    },
    created() {
        // обработка события удаления из закладок
        // приходит из modalWindow.vue
        busEvent.$on('removeBookmarks', (index) => {
            let id = this.arrayBook
                .map(function(e) {
                    return e.id;
                })
                .indexOf(index); // поиск по id
            this.arrayBook[id].bookmarksActive = false;
            this.persist(); // обновление данных
        });
    },
};
</script>

<style scoped>
main {
    width: 1180px;
    margin: 0 auto;
    margin-top: 50px;
}

@media (max-width: 1240px) {
    main {
        width: 875px;
    }
}

@media (max-width: 920px) {
    main {
        width: 575px;
        margin-top: 30px;
    }
}

@media (max-width: 620px) {
    main {
        width: 310px;
        margin-top: 20px;
    }
}

.main_blockItems {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>
