<template>
    <main id="main">
        <!-- интерактивный блок в котором можно осуществить сортировку, поиск, фильтрацию -->
        <mainInteractiveBlock />

        <!-- блок с выводом карточек книг -->
        <div class="main_blockItems" v-bind:arrayBook="filterFunction" @click="persist">
            <mainItem v-for="item of filterFunction" v-bind:key="item.id" v-bind:item="item" />
        </div>
    </main>
</template>

<script>
import mainInteractiveBlock from '@/components/mainInteractiveBlock';
import mainItem from '@/components/mainItem';
import { busRemove } from '../main'; // событие удаления закладки, приходит из modalWindow.vue
// import data
import arrayBook from '@/json/arrayBook.json';

export default {
    name: 'mainVue',
    components: {
        mainInteractiveBlock,
        mainItem,
        busRemove,
    },
    data() {
        return {
            arrayBook,
            localStorageData: [],
            filterPublishingHouse: 'Все',
            filterAuthor: 'Все',
            filterYear: 'Все',
            filterSort: 'Алфавиту',
            searchText: '',
            isActiveInverse: true,
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
        // инвертирование 
        filterInverseFunction() {
            // инвертировать массив
            let arr = this.arrayBook;
            this.isActiveInverse; // регистрируем изменение
            arr = arr.reverse();
            return arr;
        },
    },
    watch: {
        filterSort() {
            // сортировка при изменения способа сортировки
            this.filterSortFunction;
        },
        isActiveInverse() {
            // инвертирование при клике
            this.filterInverseFunction;
        },
    },
    methods: {
        // добавление/обновление данных в local storage
        // добавление/обновление происходит при клике в main_blockItems
        persist() {
            this.filterSortFunction;
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

            const parsed = JSON.stringify(this.localStorageData);
            localStorage.setItem('localStorageData', parsed);
        },
    },
    mounted() {
        //отсортировать при загрузке страницы
        this.filterSortFunction;

        // получить данных из local storage
        if (localStorage.getItem('localStorageData')) { // проверка наличиия данных 
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
    },
    created() {
        // обработка события удаления из закладок 
        // приходит из modalWindow.vue
        busRemove.$on('removeBookmarks', (index) => {
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
    width: 85%;
    margin: 0 auto;
    margin-top: 50px;
}

.main_blockItems {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>
