<template>
    <div class="app-container">
        <SideBar />
        <main>
            <NavBar />
            <div class="content-container">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue'
import NavBar from './NavBar.vue'
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: var(--sidebar-width);
}

.content-container {
    padding: 30px;
}
</style>
