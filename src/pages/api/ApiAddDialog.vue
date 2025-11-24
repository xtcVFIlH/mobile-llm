<template>
    
<van-dialog 
    v-model:show="dialogShow"
    title="Add Api" 
    width="90%" 
    show-cancel-button
    @cancel="onCancel"
    @confirm="onSave"
>

    <van-cell-group class="inputs-wrapper">
        <van-field
            v-model="name"
            label="Api Name"
            placeholder="Enter API name"
            required
        />
        <van-field
            v-model="apiKey"
            label="API Key"
            placeholder="Enter API Key"
            required
        />
    </van-cell-group>

    <van-picker
        :columns="providers.map(provider => provider.id)"
        title="Select API Provider"
    />

</van-dialog>

</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import { showToast } from 'vant';
import { useApisStore } from '@/stores/api/useApisStore';
import { ApiDTO } from '@/interfaces/api/ApiInterface';
import { LLMModelProviderServiceKey } from '@/interfaces/provider/service/LLMModelProviderServiceInterface';

const providerService = inject(LLMModelProviderServiceKey)!;

const apiStore = useApisStore();
const name = ref('');
const apiKey = ref('');
const providerId = ref('');

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();
const props = defineProps<{
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

const providers = await providerService.getAll();
if (providers.length === 0)
{
    showToast({ type: 'fail', message: 'No providers available. Please add a provider first.' });
    dialogShow.value = false;
}
else
{
    providerId.value = providers[0].id;
}


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
    if (!name.value.trim() || !apiKey.value.trim() || !providerId.value)
    {
        showToast({ type: 'fail', message: 'Some fields are empty' });
        return;
    }

    try {
        await apiStore.addApi(
            new ApiDTO(
                apiKey.value.trim(),
                name.value.trim(),
                providerId.value
            )
        );
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Add failed';
        showToast({ type: 'fail', message: errorMsg });
        return;
    }

    showToast({ type: 'success', message: 'Added successfully' });
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