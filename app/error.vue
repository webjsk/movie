<script setup lang="ts">
import Icon from '~/components/Icon.vue'

const props = defineProps<{
    error: {
        statusCode: number
        statusMessage?: string
        message: string
        stack?: string
    }
}>()
const isDev = import.meta.dev
// ✅ 根据错误码显示不同内容
const errorInfo = computed(() => {
    const code = props.error.statusCode

    const errorMap: Record<number | 'default', { title: string, description: string, icon: string, color: string }> = {
        404: {
            title: '页面不存在',
            description: '抱歉，您访问的页面不存在或已被删除',
            icon: 'mdi:magnify',
            color: 'from-blue-400 to-blue-600'
        },
        403: {
            title: '无权访问',
            description: '抱歉，您没有权限访问此页面',
            icon: 'mdi:block',
            color: 'from-red-400 to-red-600'
        },
        500: {
            title: '服务器错误',
            description: '抱歉，服务器出现错误，我们正在修复',
            icon: 'mdi:alert',
            color: 'from-orange-400 to-orange-600'
        },
        default: {
            title: '出错了',
            description: props.error.message || '发生了未知错误',
            icon: 'mdi:alert-circle',
            color: 'from-gray-400 to-gray-600'
        }
    }

    return errorMap[code] || errorMap.default
})

// ✅ 清除错误，返回首页
const handleClear = () => {
    clearError({ redirect: '/' })
}

// ✅ 返回上一页
const handleBack = () => {
    if (window.history.length > 1) {
        window.history.back()
    } else {
        handleClear()
    }
}

useSeoMeta({
    title: `${props.error.statusCode} - ${errorInfo.value.title}`,
    robots: 'noindex, nofollow'  // ✅ 不让搜索引擎索引错误页
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br" :class="errorInfo.color">
        <div class="max-w-[375px] mx-auto px-[16px] text-center">
            <!-- 错误图标 -->
            <div class="mb-[20px] animate-bounce flex justify-center">
                <Icon :name="errorInfo.icon" size="120" color="white" />
            </div>

            <!-- 错误码 -->
            <h1 class="text-[64px] font-bold text-white mb-[12px]">
                {{ error.statusCode }}
            </h1>

            <!-- 错误标题 -->
            <h2 class="text-[28px] font-bold text-white mb-[12px]">
                {{ errorInfo.title }}
            </h2>

            <!-- 错误描述 -->
            <p class="text-[16px] text-white/90 mb-[32px] leading-relaxed">
                {{ errorInfo.description }}
            </p>

            <!-- 开发环境显示详细错误 -->
            <div v-if="isDev && error.stack"
                class="bg-white/10 backdrop-blur-sm rounded-[12px] p-[16px] mb-[32px] text-left">
                <p class="text-[12px] text-white/80 font-mono break-all">
                    {{ error.message }}
                </p>
            </div>

            <!-- 操作按钮 -->
            <div class="flex flex-col gap-[12px]">
                <button @click="handleClear"
                    class="w-full py-[14px] bg-white text-gray-900 rounded-[12px] font-bold text-[16px] shadow-lg active:scale-95 transition-transform">
                    <Icon name="mdi:home" size="20" />
                    返回首页
                </button>

                <button @click="handleBack"
                    class="w-full py-[14px] bg-white/20 backdrop-blur-sm text-white rounded-[12px] font-medium text-[16px] active:scale-95 transition-transform">
                    <Icon name="mdi:chevron-left" size="20" />
                    返回上一页
                </button>
            </div>

            <!-- 底部提示 -->
            <p class="mt-[32px] text-[12px] text-white/60">
                如果问题持续出现，请联系客服
            </p>
        </div>
    </div>
</template>

<style scoped>
@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite;
}
</style>