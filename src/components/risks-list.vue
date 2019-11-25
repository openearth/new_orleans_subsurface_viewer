<template>
  <div>
    <h2 class="pb-4">
      Risks
    </h2>
    <ul class="risks-list">
      <li
        class="risks-list__item"
        v-for="risk in risks"
        :key="risk.id"
      >
        <v-btn text icon @click.stop="$emit('updateVisibility', risk.id)">
          <v-icon>{{ risk.visible ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
        </v-btn>
        <v-btn text icon @click.stop="$emit('updateLegend', risk.id)">
          <v-icon>{{ risk.id === activeLegendId ? 'mdi-card-bulleted' : 'mdi-card-bulleted-off' }}</v-icon>
        </v-btn>
        <span class="risks-list__item-title">
          {{ formatId2Title(risk.id) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    risks: {
      type: Array,
      required: true
    },
    activeLegendId: {
      type: String,
      required: true
    }
  },
  methods: {
    formatId2Title(id) {
      return id.split('_').join(' ');
    }
  }
};
</script>

<style>
  .risks-list {
    padding: 0 !important;
    list-style: none outside none;
    border-top: thin solid #eee;
  }
  .risks-list__item {
    padding: .5rem 0;
    border-bottom: thin solid #eee;
  }
  .risks-list__item-title {
    text-transform: capitalize;
  }
</style>
