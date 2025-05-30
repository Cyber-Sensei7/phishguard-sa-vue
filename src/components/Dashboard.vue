<template>
  <div class="space-y-8 fade-in">
    <!-- Welcome Section -->
    <div class="text-center">
      <h2 class="mb-4 text-3xl font-bold text-white">
        Cybersecurity Dashboard
      </h2>
      <p class="text-gray-400">Real-time threat monitoring for South Africa</p>
    </div>

    <!-- Statistics Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in statisticsCards"
        :key="stat.label"
        class="p-6 glass glass-hover rounded-xl"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-400">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
          </div>
          <component :is="stat.icon" :class="stat.iconColor" class="w-8 h-8" />
        </div>
        <p :class="stat.changeColor" class="mt-2 text-xs">{{ stat.change }}</p>
      </div>
    </div>

    <!-- Charts and Recent Threats -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Threat Trends Chart -->
      <div class="p-6 glass rounded-xl">
        <h3 class="mb-4 text-xl font-semibold text-white">
          Threat Trends (7 Days)
        </h3>
        <div
          class="flex items-center justify-center h-64 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
        >
          <div class="text-center">
            <TrendingUp class="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p class="text-gray-400">Chart visualization</p>
            <p class="text-sm text-gray-500">
              Integration with Chart.js pending
            </p>
          </div>
        </div>
      </div>

      <!-- Recent Threats -->
      <div class="p-6 glass rounded-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-white">Recent Threats</h3>
          <button
            @click="refreshThreats"
            class="transition-colors text-cyan-400 hover:text-cyan-300"
          >
            <RefreshCw class="w-5 h-5" />
          </button>
        </div>
        <div class="space-y-3">
          <div
            v-for="threat in recentThreats"
            :key="threat.id"
            class="flex items-center justify-between p-4 rounded-lg bg-white/5"
          >
            <div class="flex items-center gap-3">
              <AlertTriangle class="w-5 h-5 text-red-400" />
              <div>
                <p class="font-medium text-white">{{ threat.source }}</p>
                <p class="text-sm text-gray-400">{{ threat.detected }}</p>
              </div>
            </div>
            <span
              :class="getStatusColor(threat.status)"
              class="px-2 py-1 text-xs rounded-full"
            >
              {{ threat.status }}
            </span>
          </div>
        </div>
        <button
          class="w-full py-2 mt-4 text-white transition-all rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
        >
          View All Threats
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <button
        v-for="action in quickActions"
        :key="action.title"
        @click="action.action"
        class="p-6 text-left glass glass-hover rounded-xl group"
      >
        <div class="flex items-center gap-4">
          <div
            :class="action.iconBg"
            class="flex items-center justify-center w-12 h-12 transition-transform rounded-xl group-hover:scale-110"
          >
            <component :is="action.icon" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 class="font-semibold text-white">{{ action.title }}</h4>
            <p class="text-sm text-gray-400">{{ action.description }}</p>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  Shield,
  Eye,
  Users,
  TrendingUp,
  RefreshCw,
  AlertTriangle,
} from "lucide-vue-next";

// Sample data
const recentThreats = [
  {
    id: 1,
    source: "FNB phishing email",
    detected: "2 mins ago",
    status: "blocked",
  },
  {
    id: 2,
    source: "Vodacom fake SMS",
    detected: "15 mins ago",
    status: "reported",
  },
  {
    id: 3,
    source: "SARS fake notice",
    detected: "1 hour ago",
    status: "investigating",
  },
];

const statisticsCards = computed(() => [
  {
    label: "Threats Blocked",
    value: "127",
    change: "↑ 12% this week",
    icon: Shield,
    iconColor: "text-green-400",
    changeColor: "text-green-400",
  },
  {
    label: "Scans Today",
    value: "45",
    change: "↑ 8% from yesterday",
    icon: Eye,
    iconColor: "text-blue-400",
    changeColor: "text-blue-400",
  },
  {
    label: "Community Reports",
    value: "1.8K",
    change: "↑ 15% this month",
    icon: Users,
    iconColor: "text-purple-400",
    changeColor: "text-purple-400",
  },
  {
    label: "AI Accuracy",
    value: "94.7%",
    change: "↑ 2.1% improvement",
    icon: TrendingUp,
    iconColor: "text-cyan-400",
    changeColor: "text-cyan-400",
  },
]);

const quickActions = [
  {
    title: "Scan URL",
    description: "Check if a URL is safe",
    icon: Eye,
    iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    action: () => console.log("Navigate to scanner"),
  },
  {
    title: "Report Threat",
    description: "Report a new cyber threat",
    icon: AlertTriangle,
    iconBg: "bg-gradient-to-r from-red-500 to-pink-500",
    action: () => console.log("Navigate to report"),
  },
  {
    title: "View Analytics",
    description: "Detailed threat intelligence",
    icon: TrendingUp,
    iconBg: "bg-gradient-to-r from-purple-500 to-indigo-500",
    action: () => console.log("Navigate to analytics"),
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "blocked":
      return "bg-red-500/20 text-red-300";
    case "reported":
      return "bg-yellow-500/20 text-yellow-300";
    case "investigating":
      return "bg-blue-500/20 text-blue-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

const refreshThreats = () => {
  console.log("Refreshing threats...");
};
</script>
