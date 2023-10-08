<template>
    <div class="neko-headers-choose">
      <vi-radio-group>
        <vi-radio value="none"></vi-radio>
        <vi-radio value="form-data"></vi-radio>
        <vi-radio value="x-www-form-urlencoded"></vi-radio>
        <vi-radio value="JSON"></vi-radio>
        <vi-radio value="raw"></vi-radio>
        <vi-radio value="binary"></vi-radio>
      </vi-radio-group>
    </div>
    <vi-input-table class="neko-input-table" extension multi>
      <vi-input-table-col value="key" style="--vi-table-td-width: 180px"></vi-input-table-col>
      <vi-input-table-col value="value" style="--vi-table-td-width: 280px"></vi-input-table-col>
      <vi-input-table-col value="description" style="--vi-table-td-width: 200px"></vi-input-table-col>
    </vi-input-table>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style lang="less" scoped>
    .neko-headers-choose {
        white-space: nowrap;
        .vi-radio {
            margin-right: 8px;
        }
    }
  
    .neko-input-table {
      margin-top: 16px;
      --vi-background-color: var(--neko-content-bg-color);
      --vi-background-color-solid: var(--neko-content-bg-color-solid);
    }
  </style>