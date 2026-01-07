<template>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">
      <div v-for="i in 10" :key="i" style="animation: pulse 2s infinite;">
        <div style="width: 100%; height: 300px; background: #e5e7eb; border-radius: 8px;">11</div>
        <div style="margin-top: 10px; height: 20px; background: #e5e7eb; border-radius: 4px; width: 80%;"></div>
        <div style="margin-top: 8px; height: 16px; background: #e5e7eb; border-radius: 4px; width: 60%;"></div>
      </div>
    </div>
  </template>
  
  <style scoped>
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  </style>