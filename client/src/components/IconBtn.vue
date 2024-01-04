<template>
    <div class="relative inline-block">
        <button @click="handleClick"
            class="border rounded-full w-9 h-9 inline-flex justify-center items-center mr-2" :class="getStyleWithSeverity()"
            @mouseover="tooltipHover(true)" @mouseout="tooltipHover(false)">
            <Icons :name="props.iconName" :size="props.iconSize" :style="props.iconStyle" />
        </button>

        <p v-if="showTooltip && tooltip !== ''"
            class="absolute p-2 mb-1 rounded bottom-full left-1/2 -translate-x-1/2 text-xs bg-slate-700/90 text-white text-center shadow-lg whitespace-nowrap z-50">
            {{ tooltip }}
        </p>
    </div>
</template>
  
<script setup>
import { ref } from "vue";
import Icons from "./Icons.vue";

const showTooltip = ref(false);

const props = defineProps({
    severity: {
        type: String,
        default: "success"
    },
    iconName: {
        type: String,
        default: ""
    },
    iconStyle: {
        type: String,
        default: ""
    },
    iconSize: {
        type: Number,
        default: 18
    },
    tooltip: {
        type: String,
        default: ""
    }
});

const emits = defineEmits(["click"]);

const getStyleWithSeverity = () => {
    switch (props.severity) {
        case "emerald":
            return "text-emerald-500 border-emerald-500";
        case "red":
            return "text-red-500 border-red-500";
        case "yellow":
            return "text-yellow-500 border-yellow-500";
        case "blue":
            return "text-blue-500 border-blue-500";
        case "indigo":
            return "text-indigo-500 border-indigo-500";
        case "purple":
            return "text-purple-500 border-purple-500";
        case "pink":
            return "text-pink-500 border-pink-500";
        case "orange":
            return "text-orange-500 border-orange-500";
        case "green":
            return "text-green-500 border-green-500";
        case "violet":
            return "text-violet-500 border-violet-500";
        case "cyan":
            return "text-cyan-500 border-cyan-500";
        case "secondary":
            return "text-slate-600 border-slate-600";
        default:
            return "text-emerald-500 hover:text-emerald-600";
    }
};


const tooltipHover = (value) => {
    showTooltip.value = value
}

const handleClick = () => {
    emits("click");
}
</script>
  
<style scoped></style>
  