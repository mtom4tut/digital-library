<template>
    <main id="main">
        <mainInteractiveBlock />
        <div class="main_blockItems" v-bind:arrayBook="arrayBook" @click="persist">
            <mainItem v-for="item of arrayBook" v-bind:key="item.id" v-bind:item="item" />
        </div>
        {{ arrayBook }}
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
        };
    },
    methods: {
        persist() {
            this.localStorageData = [];
            for (const item of this.arrayBook) {
                if (item.bookmarksActive || item.yourRating) {
                    this.localStorageData.push({
                        id: item.id,
                        bookmarksActive: item.bookmarksActive,
                        yourRating: item.yourRating,
                    });
                }
            }

            const parsed = JSON.stringify(this.localStorageData);
            localStorage.setItem('localStorageData', parsed);
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
