<template>
    <header>
        <div class="header_content">
            <a href="/">
                <img src="@/images/logo.png" alt="Logo" />
            </a>

            <div class="info_block">
                <div class="info_item">
                    <button id="basket">Корзина:</button> <span id="basket_num">0</span>
                </div>

                <div class="info_item">
                    <button id="bookmarks">Закладки:</button> <span id="bookmarks_num">0</span>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 160px;
    background: #7bb33f;
    background: linear-gradient(180deg, #7bb33f, #57a34b);
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
}

.header_content {
    width: 85%;
    height: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info_block {
    display: flex;
    flex-direction: column;
    position: relative;
}

.info_block::before {
    content: '';
    width: 67px;
    height: 68px;
    background-image: url(../images/basket.png);

    position: absolute;
    top: 50%;
    left: -80px;
    transform: translateY(-50%);
}

.info_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.info_item:last-child {
    margin-top: 10px;
}

.info_item:hover {
    opacity: 1;
}

span,
button {
    font-weight: 600;
    font-size: 1.1rem;
    text-align: start;
    color: #222;
}

button {
    background-color: transparent;
    margin-right: 15px;
    cursor: pointer;
}
</style>
