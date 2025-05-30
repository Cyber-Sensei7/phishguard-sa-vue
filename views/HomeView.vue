<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8"
  >
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2">🛡 PhishGuard+ SA</h1>
      <p class="text-xl text-gray-300">
        Cybersecurity Dashboard for South Africa
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div class="glass rounded-xl p-6 text-center">
        <div class="text-3xl mb-2">🛡</div>
        <h3 class="text-lg font-semibold text-gray-300">Threats Blocked</h3>
        <p class="text-3xl font-bold text-green-400">127</p>
        <p class="text-sm text-green-300">↑ 12% this week</p>
      </div>

      <div class="glass rounded-xl p-6 text-center">
        <div class="text-3xl mb-2">👁</div>
        <h3 class="text-lg font-semibold text-gray-300">Scans Today</h3>
        <p class="text-3xl font-bold text-blue-400">45</p>
        <p class="text-sm text-blue-300">↑ 8% from yesterday</p>
      </div>

      <div class="glass rounded-xl p-6 text-center">
        <div class="text-3xl mb-2">🎯</div>
        <h3 class="text-lg font-semibold text-gray-300">AI Accuracy</h3>
        <p class="text-3xl font-bold text-cyan-400">94.7%</p>
        <p class="text-sm text-cyan-300">↑ 2.1% improvement</p>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-center gap-4 mt-8 flex-wrap">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-6 py-3 rounded-lg font-semibold transition-all',
          activeTab === tab
            ? 'bg-cyan-500 text-white'
            : 'bg-white/10 text-gray-300 hover:bg-white/20',
        ]"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Active Tab Content -->
    <div class="mt-8 text-center">
      <div class="glass rounded-xl p-8 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">{{ activeTab }}</h2>
        <p class="text-gray-300">
          {{ getTabDescription() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("Dashboard");

const tabs = [
  "Dashboard",
  "AI Scanner",
  "Report Threat",
  "SA Institutions",
  "Community",
];

const getTabDescription = () => {
  const descriptions = {
    Dashboard: "Real-time overview of cybersecurity threats in South Africa",
    "AI Scanner": "Advanced AI-powered threat detection and URL scanning",
    "Report Threat": "Report suspicious activities and cyber threats",
    "SA Institutions": "Monitor threats targeting South African institutions",
    Community: "Connect with SA cybersecurity professionals",
  };
  return descriptions[activeTab.value] || "Coming soon...";
};
</script>
