<template>
  <q-layout view="hHh lpR fFf" id="auth-layout">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AuthLayout extends Vue {}
</script>