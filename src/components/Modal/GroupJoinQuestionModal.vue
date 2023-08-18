<script setup lang="ts">
import type { GroupSetting } from '~/types'

const props = defineProps<{
  modalVisible: boolean
  close: () => void
  groupSettings: GroupSetting
  groupId: string
  changeGroupSetting: (groupSettings: GroupSetting) => Promise<void>
}>()

const settings = $ref(props.groupSettings)

async function saveQuestion() {
  await props.changeGroupSetting(settings)
  props.close()
}
</script>

<template>
  <Modal :modal-visible="modalVisible" title="修改验证问题" @close="close">
    <div flex="~ col" gap-8 p5>
      <div flex="~ col" gap-3>
        <TextInput v-model="settings.question" label="问题" />
        <TextInput v-model="settings.answer" label="答案" />
      </div>
      <div flex justify-end gap-3>
        <TextButton text="保存" @click="saveQuestion" />
      </div>
    </div>
  </Modal>
</template>

<style scoped>

</style>
