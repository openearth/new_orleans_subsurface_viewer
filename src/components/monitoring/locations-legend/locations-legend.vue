<template>
  <div class="map-legend">
    <div class="legend-item">
      <span class="legend-color" :style="{ border: '5.7px solid #96613d' }"></span>
      <span class="legend-label">Groundwater monitoring</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" :style="{ border: '5.7px solid #008fc5' }"></span>
      <span class="legend-label">Surface water monitoring</span>
    </div>
    <div class="legend-item">
      <span class="legend-color" :style="{ border: '5.7px solid #000000' }"></span>
      <span class="legend-label">Other / Unknown</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationsLegend',
};
</script>

<style scoped>
.map-legend {
  position: relative;
  top: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  margin-inline: 20px;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend-color {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: #FFFFFF;
  border-radius: 50%;
}

.legend-label {
  font-size: 12px;
  color: #333;
}
</style>