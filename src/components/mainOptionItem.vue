<template>
    <option :value="`${item}`">{{ item }}</option>
</template>

<script>
export default {
    name: 'mainOptionItem',
    props: ['item'],
};
</script>