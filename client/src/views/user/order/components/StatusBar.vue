<template>
    <div class="border border-zinc-300 rounded-lg h-40 flex items-center px-16 mb-12">
        <div class="w-full h-2 rounded-full bg-zinc-100 relative flex justify-between items-center">
            <div class="absolute h-full bg-orange-500" :class="`w-${getStatus(props.status)}/2`"></div>
            <div class="w-10 h-10 rounded-full z-10 relative" :class="getActiveColor('received')">
                <Icons v-if="getStatus(props.status) === 0" name="check2" :size="20" :style="'fill-white'" />
                <span
                    class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-base font-semibold text-zinc-700 whitespace-nowrap">Received</span>
            </div>
            <div class="w-10 h-10 rounded-full z-10 relative" :class="getActiveColor('prepared')">
                <Icons v-if="getStatus(props.status) === 1" name="check2" :size="20" :style="'fill-white'" />
                <span
                    class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-base font-semibold text-zinc-700 whitespace-nowrap">Prepared</span>
            </div>
            <div class="w-10 h-10 rounded-full z-10 relative" :class="getActiveColor('cargo')">
                <Icons v-if="getStatus(props.status) === 2" name="check2" :size="20" :style="'fill-white'" />
                <span
                    class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-base font-semibold text-zinc-700 whitespace-nowrap">Cargo</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icons from '../../../../components/Icons.vue';
const props = defineProps({
    status: {
        type: String,
        required: true,
        default: '',
    },
})

const getStatus = (status) => {
    switch (status) {
        case 'received':
            return 0;
        case 'prepared':
            return 1;
        case 'cargo':
            return 2;
        default:
            return 0;
    }
}

const getActiveColor = (value) => {
    return value === props.status ? 'bg-orange-500 flex justify-center items-center' : 'border-dashed border-2 border-orange-400 bg-zinc-100';
}

</script>

<style scoped></style>