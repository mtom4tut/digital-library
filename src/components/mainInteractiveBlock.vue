<template>
    <div class="interactive_block">
        <!-- v-model="message" -->
        <input type="text" name="searchBook" id="searchBook" placeholder="Найти книгу" />

        <span>Сортировать по:</span>
        <select name="sort">
            <option value="alphabet">Алфавиту</option>
            <option value="rating">Рейтингу</option>
        </select>

        <span>Издательство:</span>
        <select name="filterPublishingHouse" v-bind:arrayPublishingHouse="arrayPublishingHouse">
            <mainOptionItem />
        </select>

        <span>Автор:</span>
        <select name="filterAuthor" v-bind:arrayAuthor="arrayAuthor">
            
        </select>

        <button aria-label="direction-sort">
            <img src="../images/arrow.png" alt="arrow" />
        </button>
    </div>
</template>

<script>
import mainOptionItem from '@/components/mainOptionItem';
// import data
import arrayPublishingHouse from '@/json/arrayPublishingHouse.json';
import arrayAuthor from '@/json/arrayAuthor.json';

export default {
    name: 'mainVue',
    components: {
        mainInteractiveBlock,
        mainItem,
        mainOptionItem
    },
    data() {
        return {
            arrayPublishingHouse: arrayPublishingHouse,
            arrayAuthor: arrayAuthor,
        };
    },
};
</script>

<style scoped>
.interactive_block {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

input {
    width: 250px;
    border: 2px solid #5ea649;
    border-radius: 10px;
    padding: 15px;
}

input:focus {
    background-color: #5ea64930;
}

span {
    margin: 0 15px;
    font-weight: 600;
    font-size: 1.05rem;
}

select {
    border: 2px solid #5ea649;
    border-radius: 8px;
    padding: 10px;
    font-size: 1.05rem;
}

button {
    background-color: transparent;
    border: 1px solid #5ea649;
    border-radius: 5px;
    margin: 15px;
    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
}

input:hover,
select:hover,
button:hover {
    border-color: #888;
}

/* a class for a button showing the change in 
the sorting direction: from smallest to largest */
.fromSmallest {
    transform: rotate(180deg);
}
</style>
