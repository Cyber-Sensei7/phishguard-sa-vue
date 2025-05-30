<template>
  <div class="space-y-8 fade-in">
    <div class="text-center">
      <h2 class="text-white text-3xl font-bold mb-4">
        SA Institution Monitoring
      </h2>
      <p class="text-gray-400">
        Real-time threat monitoring for major South African institutions
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="institution in threatsStore.saInstitutions"
        :key="institution.name"
        class="glass glass-hover rounded-xl p-6"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="text-3xl">{{ institution.logo }}</div>
          <div>
            <h3 class="text-white font-semibold">{{ institution.name }}</h3>
            <p class="text-gray-400 text-sm">{{ institution.type }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-300">Threats Detected:</span>
            <span class="text-white font-bold">{{ institution.threats }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-300">Status:</span>
            <span
              :class="getStatusColor(institution.status)"
              class="px-2 py-1 rounded-full text-xs font-medium"
            >
              {{ getStatusText(institution.status) }}
            </span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-300">Last Update:</span>
            <span class="text-gray-400 text-sm">{{
              institution.lastUpdate
            }}</span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-white/10">
          <button
            class="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThreatsStore } from "../stores/threats";

const threatsStore = useThreatsStore();

const getStatusColor = (status) => {
  switch (status) {
    case "protected":
      return "bg-green-500/20 text-green-300";
    case "monitoring":
      return "bg-yellow-500/20 text-yellow-300";
    case "high-alert":
      return "bg-red-500/20 text-red-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "protected":
      return "Protected";
    case "monitoring":
      return "Monitoring";
    case "high-alert":
      return "High Alert";
    default:
      return "Unknown";
  }
};
</script>
