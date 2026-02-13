<script setup lang="ts"></script>

<template>

  <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
    </ul>
  </nav>

  <RouterView />
  
</template>

<style scoped></style>
