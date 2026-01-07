<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'

defineProps<{
    name: string
    size?: string | number
    color?: string
}>()
</script>

<template>
    <IconifyIcon :icon="name" :style="{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        color: color
    }" />
</template>