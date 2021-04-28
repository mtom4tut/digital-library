<template>
    <main>
        <mainInteractiveBlock />
        <div class="main_blockItems" v-bind:arrayBook="arrayBook">
            <mainItem 
                v-for="item of arrayBook" 
                v-bind:key="item.id" 
                v-bind:item="item"
            />
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
        };
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
