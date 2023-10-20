<!-- <script setup lang="ts">

</script>

<template>
  <Teleport to="main">
        <Transition>
          <OnClickOutside v-if="profileCardVisible && profile" :options="{ ignore: [avatarRef] }" :style="{ left: `${position.x}px`, top: `${position.y}px` } " text-sm z-50 w-65 h-80 absolute shadow-lg border-base bg-back-gray p-1 rounded-lg @trigger="profileCardVisible = false">
            <div flex="~ col" relative h-full>
              <div h-12 bg="#969696" rounded-t />
              <div flex-1 flex>
                <div bg-back flex-1 m-3 mt-8 rounded text-start p-3 relative>
                  <p font-bold text-lg>
                    {{ profile.name }}
                  </p>
                  <p op40 pb-3 border-b>
                    # {{ profile.id }}
                  </p>
                  <div v-if="profile.time" pt-3 flex="~ col" gap-1>
                    <p font-bold>
                      成为好友的时间
                    </p>
                    <p op40>
                      {{ convertTimeStampToTime(profile.time) }}
                    </p>
                    <p font-bold>
                      备注
                    </p>
                    <input :value="profile.nick" outline-none bg-transparent>
                  </div>
                  <button v-if="!fromSelf" absolute bg-primary p-3 rounded-full right-3 bottom-3 @click="toastStore.notImplemented()">
                    <div i-carbon-chat />
                  </button>
                </div>
              </div>
              <div w-18 h-18 rounded-full p-1.5 bg-back-gray absolute top-2 left-5>
                <img rounded-full :src="profile.avatar.length === 0 ? '/hsn.png' : profile.avatar" alt="">
              </div>
            </div>
          </OnClickOutside>
        </Transition>
      </Teleport>
</template>

<style scoped>

</style> -->
