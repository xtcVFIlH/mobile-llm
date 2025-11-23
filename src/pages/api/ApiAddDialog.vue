<template>
    
<van-dialog 
    v-model:show="dialogShow"
    title="添加API配置" 
    width="90%" 
    show-cancel-button
    @cancel="onCancel"
    @confirm="onSave"
>

    <van-cell-group class="inputs-wrapper">
        <van-field
            v-model="name"
            label="配置名称"
            placeholder="请输入配置名称"
            required
        />
        <van-field
            v-model="apiKey"
            label="API Key"
            placeholder="请输入API Key"
            required
        />
    </van-cell-group>

</van-dialog>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { showToast } from 'vant';
import { useApiConfigsStore } from 'stores/apiConfig/useApiConfigsStore';

const apiConfigsStore = useApiConfigsStore();
const name = ref('');
const apiKey = ref('');

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
    /** 是否可见 */
    modelValue: boolean;
}>();
const dialogShow = ref(props.modelValue);
watch(() => props.modelValue, (newVal) =>
{
    dialogShow.value = newVal;
});
watch(dialogShow, (newVal) =>
{
    emit('update:modelValue', newVal);
});

const isLoading = ref(false);

function onCancel(): void
{
    emptyInput();
    dialogShow.value = false;
}

function emptyInput(): void
{
    name.value = '';
    apiKey.value = '';
}

async function onSave(): Promise<void>
{
    if (!name.value.trim() || !apiKey.value.trim())
    {
        showToast({ type: 'fail', message: '请填写完整信息' });
        return;
    }

    try {
        await apiConfigsStore.addNewApiConfig(
            apiKey.value.trim(),
            name.value.trim()
        );
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : '添加失败';
        showToast({ type: 'fail', message: errorMsg });
        return;
    }

    showToast({ type: 'success', message: '添加成功' });
    emptyInput();
    dialogShow.value = false;
}
</script>

<style scoped lang="scss">

.inputs-wrapper
{
    padding: 12px;
    box-sizing: border-box;
}

</style>