<template>
    <el-menu
        :default-active="$route.path"
        router
        class="el-menu-vertical-demo"
        :collapse="commonStore.isMenuCollapse"
        @open="handleOpen"
        @close="handleClose">
        <template v-for="(rule, index) in $router.options.routes">
            <el-sub-menu
                v-if="rule.children && rule.children.length > 0"
                :key="index"
                :index="rule.path">
                <template #title>
                    <el-icon>
                        <component :is="rule.icon" />
                    </el-icon>
                    <span>{{ rule.name }}</span>
                </template>
                <el-menu-item
                    v-for="(child, index) in rule.children"
                    :key="index"
                    :index="rule.path + '/' + child.path">
                    <span>{{ child.name }}</span>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="rule.path">
                <el-icon><component :is="rule.icon" /></el-icon>
                <template #title>{{ rule.name }}</template>
            </el-menu-item>
        </template>
        <!-- <el-sub-menu index="1">
            <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
        </el-menu-item> -->
    </el-menu>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store'

const commonStore = useCommonStore()

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>
