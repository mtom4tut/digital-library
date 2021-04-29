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
            filterSort: 'Алфавит',
            searchText: '',
        };
    },
    computed: {
        filterFunction() {
            // if (
            //     // все
            //     this.filterAuthor == 'Все' &&
            //     this.filterPublishingHouse == 'Все' &&
            //     this.searchText == '' &&
            //     this.filterYear == 'Все'
            // ) {
            //     return this.arrayBook;
            // } else if (
            //     // по автору
            //     this.filterPublishingHouse == 'Все' &&
            //     this.searchText == '' &&
            //     this.filterYear == 'Все'
            // ) {
            //     return this.arrayBook.filter((item) => item.author == this.filterAuthor);
            // } else if (
            //     // по издательству
            //     this.filterAuthor == 'Все' &&
            //     this.searchText == '' &&
            //     this.filterYear == 'Все'
            // ) {
            //     return this.arrayBook.filter((item) => item.publishingHouse == this.filterPublishingHouse);
            // } else if (
            //     // по году
            //     this.filterAuthor == 'Все' &&
            //     this.searchText == '' &&
            //     this.filterPublishingHouse == 'Все'
            // ) {
            //     return this.arrayBook.filter((item) => item.yearPublishing == this.filterYear);
            // }
        },
    },
    methods: {
        persist() {
            console.log(this.filterAuthor);
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
        filterAuthorFunction: function($event) {
            console.log($event);
        },
    },
    mounted() {
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
