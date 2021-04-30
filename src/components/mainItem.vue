<template>
    <div class="mainItem">
        <img :src="require(`../assets/images/${item.id}.jpg`)" alt="imgBook" class="border-radius"/>
        <div class="content_block">
            <h3>{{ item.nameBook }}</h3>
            <p>
                <b>Автор:</b> <br />
                {{ item.author }}
            </p>

            <p>
                <b>Издательство:</b> <br />
                {{ item.publishingHouse }}
            </p>

            <p>
                <b>Год издания:</b> <br />
                {{ item.yearPublishing }}
            </p>

            <p>
                <b>Цена:</b> <br />
                {{ item.price }}₽
            </p>

            <p>
                <b>Рейтинг:</b> <br />
                {{ item.rating }}
            </p>
        </div>
        <div class="btn_block">
            <button id="buy" aria-label="buy" :value="`${item.id}`">Купить</button>
            <button
                id="bookmarks"
                class="bookmarks"
                aria-label="bookmarks"
                :value="`${item.id}`"
                v-bind:class="{ bookmarks_active: item.bookmarksActive }"
                @click="item.bookmarksActive = !item.bookmarksActive"
                v-on:click="bookmarkMainСlick()"
            >
                <img src="../images/bookmark.png" alt="bookmark" />
            </button>
        </div>
        <div
            class="rating_block"
            v-bind:class="{ rating_block_active: item.yourRating }"
            v-on:click="item.yourRating = true"
        >
            <b class="estimate">Оценить:</b>
            <div class="rating-area" :value="`${item.id}`" v-on:click="$emit('rating-click')">
                <input type="radio" :id="`star-5-${item.id}id`" name="rating" value="5" @click="itemRating(5)"/>
                <label :for="`star-5-${item.id}id`"></label>
                <input type="radio" :id="`star-4-${item.id}id`" name="rating" value="4" 
                @click="itemRating(4)"/>
                <label :for="`star-4-${item.id}id`"></label>
                <input type="radio" :id="`star-3-${item.id}id`" name="rating" value="3" 
                @click="itemRating(3)"/>
                <label :for="`star-3-${item.id}id`"></label>
                <input type="radio" :id="`star-2-${item.id}id`" name="rating" value="2" 
                @click="itemRating(2)"/>
                <label :for="`star-2-${item.id}id`"></label>
                <input type="radio" :id="`star-1-${item.id}id`" name="rating" value="1" 
                @click="itemRating(1)"/>
                <label :for="`star-1-${item.id}id`"></label>
            </div>
            <b class="thank">Спасибо за отзыв!</b>
        </div>
    </div>
</template>

<script>
import { busHeader } from '../main'; // уходит

export default {
    name: 'mainItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        itemRating(rating) {
            this.item.rating = Math.round(((Number(this.item.rating) + Number(rating))/2)*100)/100;
        },
        bookmarkMainСlick() { // уходит в headerVue.vue
            busHeader.$emit('bookmarkMainСlick', this.item.bookmarksActive)
        }
    }
};
</script>

<style scoped>
.mainItem {
    width: 32%;
    height: 400px;
    background-color: #ecebeb;
    border-radius: 20px;

    display: grid;
    grid-template-columns: 60% 1fr;
    grid-template-rows: 80% 1fr;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 30px;

}

img {
    width: 100%;
    height: 100%;
}

.border-radius {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.content_block {
    padding: 5px;
    padding-left: 10px;
    text-align: start;
}

p {
    line-height: 1.2rem;
}

.btn_block {
    display: flex;
    justify-content: center;
    align-items: center;
}

#buy {
    width: 100px;
    height: 30px;
    border-radius: 10px;
    background-color: #50a434;
    margin-right: 15px;
}

#buy:hover {
    background-color: #3e9e1e;
    transition: 0.2s;
}

.bookmarks {
    height: 30px;
    width: 26px;
    padding: 0;
    transition: 0.2s;
}

.bookmarks:hover {
    background-color: #50a43430;
}

.bookmarks_active {
    background: linear-gradient(90deg, #3f435a, #24c07a);
}

/* rating block */
.rating_block {
    padding-top: 15px;
    padding-left: 10px;
    text-align: start;
}

.rating_block_active .estimate,
.rating_block_active .rating-area,
.thank {
    display: none;
}

.rating_block_active .thank {
    display: block;
    margin-top: 12px;
}

.rating-area {
    overflow: hidden;
    width: 120px;
}

.rating-area:not(:checked) > input {
    display: none;
}

.rating-area:not(:checked) > label {
    float: right;
    width: 24px;
    padding: 0;
    cursor: pointer;
    font-size: 24px;
    color: lightgrey;
    text-shadow: 1px 1px #bbb;
}

.rating-area:not(:checked) > label:before {
    content: '★';
}

.rating-area > input:checked ~ label {
    color: gold;
    text-shadow: 1px 1px #c60;
}

.rating-area:not(:checked) > label:hover,
.rating-area:not(:checked) > label:hover ~ label {
    color: gold;
}

.rating-area > input:checked + label:hover,
.rating-area > input:checked + label:hover ~ label,
.rating-area > input:checked ~ label:hover,
.rating-area > input:checked ~ label:hover ~ label,
.rating-area > label:hover ~ input:checked ~ label {
    color: gold;
    text-shadow: 1px 1px goldenrod;
}

.rating-area > label:active {
    position: relative;
}
</style>
