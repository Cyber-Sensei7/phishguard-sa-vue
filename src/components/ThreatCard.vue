<template>
  <div
    class="glass glass-hover rounded-xl p-4 hover:scale-105 transition-all duration-300"
  >
    <div class="flex justify-between items-start mb-3">
      <div class="flex items-center gap-2">
        <AlertTriangle
          v-if="threat.severity === 'high'"
          class="w-5 h-5 text-red-400"
        />
        <Shield v-else class="w-5 h-5 text-yellow-400" />
        <span class="text-white font-medium capitalize">{{ threat.type }}</span>
        <span
          :class="getSeverityColor(threat.severity)"
          class="px-2 py-1 rounded-full text-xs border"
        >
          {{ threat.severity }}
        </span>
      </div>
      <span
        :class="getStatusColor(threat.status)"
        class="px-2 py-1 rounded-full text-xs"
      >
        {{ threat.status }}
      </span>
    </div>

    <p class="text-gray-300 text-sm mb-2 font-medium">
      Source: {{ threat.source }}
    </p>

    <p v-if="threat.institution" class="text-cyan-400 text-sm mb-2">
      Institution: {{ threat.institution }}
    </p>

    <p
      v-if="showDetails && threat.description"
      class="text-gray-400 text-sm mb-3"
    >
      {{ threat.description }}
    </p>

    <div class="flex items-center justify-between text-xs">
      <div class="flex items-center gap-1 text-gray-400">
        <Clock class="w-3 h-3" />
        {{ threat.detected }}
      </div>
      <div
        v-if="threat.institution"
        class="flex items-center gap-1 text-gray-400"
      >
        <MapPin class="w-3 h-3" />
        SA
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangle, Shield, Clock, MapPin } from "lucide-vue-next";

defineProps({
  threat: {
    type: Object,
    required: true,
  },
  showDetails: {
    type: Boolean,
    default: false,
  },
});

const getSeverityColor = (severity) => {
  switch (severity) {
    case "high":
      return "text-red-400 bg-red-500/20 border-red-500/30";
    case "medium":
      return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    case "low":
      return "text-green-400 bg-green-500/20 border-green-500/30";
    default:
      return "text-gray-400 bg-gray-500/20 border-gray-500/30";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "blocked":
      return "bg-red-500/20 text-red-300";
    case "quarantined":
      return "bg-yellow-500/20 text-yellow-300";
    case "investigating":
      return "bg-blue-500/20 text-blue-300";
    case "reported":
      return "bg-purple-500/20 text-purple-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};
</script>
