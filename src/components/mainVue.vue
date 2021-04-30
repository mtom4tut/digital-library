<template>
    <main id="main">
        <mainInteractiveBlock />
        <div class="main_blockItems" v-bind:arrayBook="filterFunction" @click="persist">
            <mainItem v-for="item of filterFunction" v-bind:key="item.id" v-bind:item="item" />
        </div>
    </main>
</template>

<script>
import mainInteractiveBlock from '@/components/mainInteractiveBlock';
import mainItem from '@/components/mainItem';

// import data
import arrayBook from '@/json/arrayBook.json';

export default {
    name: 'mainVue',
    components: {
        mainInteractiveBlock,
        mainItem,
    },
    data() {
        return {
            arrayBook: arrayBook,
            localStorageData: [],
            filterPublishingHouse: 'Все',
            filterAuthor: 'Все',
            filterYear: 'Все',
            filterSort: 'Алфавиту',
            searchText: '',
            isActiveInverse: true,
        };
    },
    computed: {
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

            //фильтрация по издательству
            if (this.filterYear !== 'Все') {
                arr = arr.filter((item) => item.yearPublishing == this.filterYear);
            }

            // фильтрация по поиску
            if (this.searchText !== '') {
                arr = arr.filter(
                    (item) =>
                        item.nameBook
                            .slice(0, this.searchText.length)
                            .toLowerCase()
                            .search(this.searchText.toLowerCase()) != -1
                );
            }

            return arr;
        },
        filterSortFunction() {
            let arr = this.arrayBook;
            if (this.filterSort == 'Алфавиту') {
                arr = arr.sort((i, j) => (i.nameBook > j.nameBook ? 1 : -1));
            }

            if (this.filterSort == 'Рейтингу') {
                arr = arr.sort((i, j) => (i.rating > j.rating ? 1 : -1));
            }
            return arr;
        },
        filterInverseFunction() {
            // инвертировать массив
            let arr = this.arrayBook;
            this.isActiveInverse; // регистрируем изменение 
            arr = arr.reverse();
            return arr
        },
    },
    watch: {
        filterSort() {
            // сортировка при изменения способа сортировки
            this.filterSortFunction;
        },
        isActiveInverse() { // инвертирование при клике
            this.filterInverseFunction;
        },
    },
    methods: {
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

        if (localStorage.getItem('localStorageData')) {
            this.localStorageData = JSON.parse(localStorage.getItem('localStorageData'));
            for (const item of this.localStorageData) {
                let index = this.arrayBook
                    .map(function(e) {
                        return e.id;
                    })
                    .indexOf(item.id);
                this.arrayBook[index].bookmarksActive = item.bookmarksActive;
                this.arrayBook[index].rating = item.rating;
                this.arrayBook[index].yourRating = item.yourRating;
            }
        }
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
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>
