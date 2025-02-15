<template>
    <header class="nav-bar">
        <div class="logo">DTGaming</div>
        <el-button @click="commonStore.toggleMenu">
            <template #icon>
                <IconEpExpand />
            </template>
        </el-button>
    </header>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store'

const commonStore = useCommonStore()
</script>

<style lang="scss">
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 1px solid lightgray;
    align-items: center;

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--sidebar-width);
    }
}
</style>
