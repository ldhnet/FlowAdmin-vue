<template>
  <el-dialog :title="title" v-model="visibleDialog" style="width: 680px !important; " append-to-body>
    <div style="min-height: 250px !important;">
      <el-text class="mx-1" type="primary"> {{ modelValue }}</el-text>
    </div>
    <template #footer>
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';  
let props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Object,
    default: () => {}
  }
});
let emits = defineEmits(['update:visible'])
let visibleDialog = computed({
  get() {
    return props.visible
  },
  set() {
    closeDialog()
  }
});

/**
 * 关闭弹窗
 */
const closeDialog = () => {
  emits('update:visible', false)
} 
</script>
<style scoped lang="scss">
@import "@/assets/styles/flow/dialog.scss";
</style>