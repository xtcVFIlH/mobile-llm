<template>

<div class="api-config-list-page">

    <div v-if="isEmpty" class="api-config-list-empty-wrapper">
        <van-loading v-if="isLoading" size="24px" vertical />
        <van-empty v-else description="暂无API配置" />
    </div>

    <div v-else class="api-config-list">
        <van-cell-group>
            <van-cell
                v-for="config in apiConfigsStore.apiConfigs"
                :key="config.id"
                :title="config.name"
                :label="`API Key: ${formatApiKey(config.apiKey)}`"
            />
        </van-cell-group>
    </div>

    <div class="add-button-wrapper">
        <van-button
            block
            type="primary"
            @click="onAddButtonClick"
        >
            添加API配置
        </van-button>
    </div>

    <ApiConfigAddDialog
        v-model:modelValue="addDialogShow"
    />

</div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { showToast } from 'vant';
import { useApiConfigsStore } from 'stores/apiConfig/useApiConfigsStore';
import ApiConfigAddDialog from './ApiConfigAddDialog.vue';

const apiConfigsStore = useApiConfigsStore();

const isEmpty = computed(() =>
    !isLoading.value && apiConfigsStore.apiConfigs.length === 0
);
const isLoading = ref(false);

const addDialogShow = ref(false);
function onAddButtonClick(): void
{
    addDialogShow.value = true;
}

function formatApiKey(key: string | undefined): string
{
    if (!key)
    {
        return '';
    }
    if (key.length <= 8)
    {
        return key;
    }
    return `${key.slice(0, 4)}****${key.slice(-4)}`;
}

async function loadApiConfigs(): Promise<void>
{
    isLoading.value = true;
    try {
        apiConfigsStore.loadAllApiConfigs()
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : '加载失败';
        showToast({ type: 'fail', message: errorMsg });
    }
    finally {
        isLoading.value = false;
    }
}

onMounted(async () =>
{
    await loadApiConfigs();
});
</script>

<style scoped lang="scss">

.api-config-list-page 
{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.api-config-list
{
    flex: 1 1 auto;
    overflow-y: auto;
}

.api-config-list-empty-wrapper
{
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.add-button-wrapper
{
    padding: 12px;
    box-sizing: border-box;
    flex: 0 0 auto;
}

</style>