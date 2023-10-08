<template>
    <vi-input-table class="neko-input-table" extension multi>
        <vi-input-table-col value="key" style="--vi-table-td-width: 180px"></vi-input-table-col>
        <vi-input-table-col value="value" style="--vi-table-td-width: 280px"></vi-input-table-col>
        <vi-input-table-col value="description" style="--vi-table-td-width: 200px"></vi-input-table-col>
    </vi-input-table>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.neko-input-table {
    --vi-background-color: var(--neko-content-bg-color);
    --vi-background-color-solid: var(--neko-content-bg-color-solid);
}
</style>