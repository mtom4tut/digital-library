<template>
    <section class="section-modal">
        <h2 class="modal-title">Закладки</h2>
        <button class="modal-close">
            <img src="@/images/modal-close.svg" alt="close" />
        </button>
        <div class="block_goods isempty">
            <!-- <modalWindowItem /> -->
        </div>
    </section>
</template>

<script>
import modalWindowItem from '@/components/modalWindowItem';

export default {
    name: 'modalWindow',
    components: {
        modalWindowItem,
    },
};
</script>

<style>
/* !!!!!!!!!!!!!!! */
/* common styles for modal windows */
.section-modal {
    display: grid;
    grid-template-rows: 13% 1fr;
    width: 510px;
    height: 500px;
    background-color: #ecebeb;
    border-radius: 20px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, 40%, 0);

    -webkit-box-shadow: 0px 4px 20px #5ea64965;
    -moz-box-shadow: 0px 4px 20px #5ea64965;
    box-shadow: 0px 4px 20px #5ea64965;
    overflow: hidden;
}

.modal-title {
    margin: 0;
    padding: 20px 0;
    background-color: #5ea64965;
}

.modal-close {
    width: 26px;
    height: 30px;
    padding: 0;
    background: transparent;
    cursor: pointer;

    position: absolute;
    top: 20px;
    right: 15px;
    z-index: 1;
    transition: transform 0.2s;
}

.modal-close img {
    width: 100%;
    height: 100%;
}

.modal-close:hover {
    transform: translateY(-3px);
}

.block_goods {
    position: relative;
    padding: 20px;
    overflow-y: scroll;
}

.isempty {
    display: flex;
    justify-content: center;
    align-items: center;
}

.isempty::before {
    content: '';
    width: 74px;
    height: 70px;
    background: url(../images/empty.png) no-repeat;
    background-size: cover;
    opacity: 0.5;
}
</style>
