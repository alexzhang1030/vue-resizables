<script setup lang="ts">
import { Panel, PanelGroup, PanelHandle } from 'vue-resizables'
</script>

<template>
  <div class="w-100vw h-100vh flex">
    <PanelGroup class="w-100vw h-100vh" direction="horizontal">
      <Panel bg-red>
        prev
      </Panel>
      <PanelHandle />
      <Panel bg-blue>
        next
      </Panel>
      <PanelHandle />
      <Panel bg-pink>
        1234
      </Panel>
    </PanelGroup>
  </div>
</template>
