<template>
  <div class="max-w-3xl mx-auto space-y-8 fade-in">
    <div class="text-center">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div
          class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center"
        >
          <Zap class="w-6 h-6 text-white" />
        </div>
        <h2 class="text-white text-3xl font-bold">AI Threat Scanner</h2>
      </div>
      <p class="text-gray-400">
        Upload files, paste emails, or enter URLs for real-time AI analysis
      </p>
    </div>

    <!-- URL Input -->
    <div class="glass rounded-xl p-6">
      <h3 class="text-white text-lg font-semibold mb-4">URL Analysis</h3>
      <div class="flex gap-3">
        <input
          v-model="urlInput"
          type="url"
          placeholder="Enter suspicious URL here..."
          class="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <button
          @click="performScan"
          :disabled="!urlInput || threatsStore.isScanning"
          class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all"
        >
          Scan URL
        </button>
      </div>
    </div>

    <!-- Scan Button -->
    <div class="text-center">
      <button
        @click="performScan"
        :disabled="threatsStore.isScanning"
        class="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
      >
        <div v-if="threatsStore.isScanning" class="flex items-center gap-2">
          <div
            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
          ></div>
          Analyzing with AI...
        </div>
        <div v-else class="flex items-center gap-2">
          <Shield class="w-5 h-5" />
          Analyze with AI
        </div>
      </button>
    </div>

    <!-- Scan Results -->
    <div v-if="threatsStore.scanResult" class="glass rounded-xl p-6 fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-white text-lg font-semibold">Analysis Results</h3>
        <div
          :class="[
            'flex items-center gap-2 px-3 py-1 rounded-full',
            threatsStore.scanResult.isPhishing
              ? 'bg-red-500/20 text-red-300'
              : 'bg-green-500/20 text-green-300',
          ]"
        >
          <XCircle v-if="threatsStore.scanResult.isPhishing" class="w-4 h-4" />
          <CheckCircle v-else class="w-4 h-4" />
          {{ threatsStore.scanResult.confidence }}% Confidence
        </div>
      </div>

      <div
        :class="[
          'p-4 rounded-lg mb-4',
          threatsStore.scanResult.isPhishing
            ? 'bg-red-500/10 border border-red-500/30'
            : 'bg-green-500/10 border border-green-500/30',
        ]"
      >
        <p
          :class="
            threatsStore.scanResult.isPhishing
              ? 'text-red-300'
              : 'text-green-300'
          "
          class="font-semibold"
        >
          {{ threatsStore.scanResult.recommendation }}
        </p>
      </div>

      <div>
        <h4 class="text-white font-medium mb-2">Threat Indicators:</h4>
        <ul class="space-y-2">
          <li
            v-for="(indicator, idx) in threatsStore.scanResult.indicators"
            :key="idx"
            class="flex items-center gap-2 text-gray-300"
          >
            <AlertTriangle class="w-4 h-4 text-yellow-400" />
            {{ indicator }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Zap,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-vue-next";
import { useThreatsStore } from "../stores/threats";

const threatsStore = useThreatsStore();
const urlInput = ref("");

const performScan = () => {
  if (!urlInput.value && !threatsStore.isScanning) return;
  threatsStore.performScan();
};
</script>
