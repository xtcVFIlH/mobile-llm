<template>

<div class="api-list-page">

    <div v-if="isEmpty" class="api-list-empty-wrapper">
        <van-loading v-if="isLoading" size="24px" vertical />
        <van-empty v-else description="No API found" />
    </div>

    <div v-else class="api-list">
        <van-cell-group>
            <van-cell
                v-for="api in apisStore.apis"
                :key="api.id"
                :title="api.name + ' (' + api.providerId + ')'"
                :label="`API Key: ${formatApiKey(api.apiKey)}`"
            />
        </van-cell-group>
    </div>

    <div class="add-button-wrapper">
        <van-button
            block
            type="primary"
            @click="onAddButtonClick"
        >
            Add API
        </van-button>
    </div>

    <ApiAddDialog
        v-model:modelValue="addDialogShow"
    />

</div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { showToast } from 'vant';
import { useApisStore } from '@/stores/api/useApisStore';
import ApiAddDialog from './ApiAddDialog.vue';

const apisStore = useApisStore();

const isEmpty = computed(() =>
    !isLoading.value && apisStore.apis.length === 0
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

async function loadApis(): Promise<void>
{
    isLoading.value = true;
    try {
        apisStore.loadApis();
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
    await loadApis();
});
</script>

<style scoped lang="scss">

.api-list-page 
{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.api-list
{
    flex: 1 1 auto;
    overflow-y: auto;
}

.api-list-empty-wrapper
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