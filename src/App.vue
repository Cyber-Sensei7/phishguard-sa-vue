<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
  >
    <!-- Header -->
    <header class="bg-black/30 backdrop-blur-md border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center"
            >
              <span class="text-white text-xl">🛡</span>
            </div>
            <div>
              <h1 class="text-white text-xl font-bold">PhishGuard+ SA</h1>
              <p class="text-gray-400 text-sm">
                Protecting South Africa from Cyber Threats
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div
              class="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full"
            >
              <div
                class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              ></div>
              <span class="text-green-300 text-sm">Protected</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Navigation -->
      <nav class="flex gap-2 mb-8 overflow-x-auto">
        <button
          v-for="tab in navigationTabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap',
            activeTab === tab.id
              ? 'bg-white/20 text-white border border-white/30'
              : 'text-gray-400 hover:text-white hover:bg-white/10',
          ]"
        >
          <span>{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </nav>

      <!-- Dashboard Content -->
      <div v-if="activeTab === 'dashboard'" class="space-y-8 fade-in">
        <!-- Welcome Section -->
        <div class="text-center">
          <h2 class="text-white text-3xl font-bold mb-4">
            Cybersecurity Dashboard
          </h2>
          <p class="text-gray-400">
            Real-time threat monitoring for South Africa
          </p>
        </div>

        <!-- Statistics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="stat in statisticsCards"
            :key="stat.label"
            class="glass rounded-xl p-6 hover:scale-105 transition-transform"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-400 text-sm">{{ stat.label }}</p>
                <p class="text-white text-2xl font-bold">{{ stat.value }}</p>
              </div>
              <span :class="stat.iconColor" class="text-2xl">{{
                stat.icon
              }}</span>
            </div>
            <p :class="stat.changeColor" class="text-xs mt-2">
              {{ stat.change }}
            </p>
          </div>
        </div>

        <!-- Recent Threats -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="glass rounded-xl p-6">
            <h3 class="text-white text-xl font-semibold mb-4">
              Recent Threats
            </h3>
            <div class="space-y-3">
              <div
                v-for="threat in recentThreats"
                :key="threat.id"
                class="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              >
                <div class="flex items-center gap-3">
                  <span class="text-red-400 text-lg">⚠</span>
                  <div>
                    <p class="text-white font-medium">{{ threat.source }}</p>
                    <p class="text-gray-400 text-sm">{{ threat.detected }}</p>
                  </div>
                </div>
                <span
                  :class="getStatusColor(threat.status)"
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ threat.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="glass rounded-xl p-6">
            <h3 class="text-white text-xl font-semibold mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button
                v-for="action in quickActions"
                :key="action.title"
                @click="action.action"
                class="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-left"
              >
                <div
                  :class="action.iconBg"
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                >
                  <span class="text-white">{{ action.icon }}</span>
                </div>
                <div>
                  <h4 class="text-white font-semibold">{{ action.title }}</h4>
                  <p class="text-gray-400 text-sm">{{ action.description }}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Tab Content -->
      <div v-else class="text-center space-y-6">
        <div class="glass rounded-xl p-8">
          <h2 class="text-white text-2xl font-bold mb-4">
            {{ getCurrentTabName() }}
          </h2>
          <p class="text-gray-400 mb-6">{{ getTabDescription() }}</p>
          <div class="text-6xl mb-4">🚧</div>
          <p class="text-gray-500">This feature is coming soon...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Reactive state
const activeTab = ref("dashboard");

// Navigation configuration
const navigationTabs = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "scanner", label: "AI Scanner", icon: "👁" },
  { id: "report", label: "Report Threat", icon: "⚠" },
  { id: "institutions", label: "SA Institutions", icon: "🏛" },
  { id: "trends", label: "SA Threat Intel", icon: "📈" },
  { id: "community", label: "SA Community", icon: "👥" },
];

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

const statisticsCards = [
  {
    label: "Threats Blocked",
    value: "127",
    change: "↑ 12% this week",
    icon: "🛡",
    iconColor: "text-green-400",
    changeColor: "text-green-400",
  },
  {
    label: "Scans Today",
    value: "45",
    change: "↑ 8% from yesterday",
    icon: "👁",
    iconColor: "text-blue-400",
    changeColor: "text-blue-400",
  },
  {
    label: "Community Reports",
    value: "1.8K",
    change: "↑ 15% this month",
    icon: "👥",
    iconColor: "text-purple-400",
    changeColor: "text-purple-400",
  },
  {
    label: "AI Accuracy",
    value: "94.7%",
    change: "↑ 2.1% improvement",
    icon: "🎯",
    iconColor: "text-cyan-400",
    changeColor: "text-cyan-400",
  },
];

const quickActions = [
  {
    title: "Scan URL",
    description: "Check if a URL is safe",
    icon: "🔍",
    iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    action: () => (activeTab.value = "scanner"),
  },
  {
    title: "Report Threat",
    description: "Report a new cyber threat",
    icon: "📢",
    iconBg: "bg-gradient-to-r from-red-500 to-pink-500",
    action: () => (activeTab.value = "report"),
  },
  {
    title: "View Analytics",
    description: "Detailed threat intelligence",
    icon: "📊",
    iconBg: "bg-gradient-to-r from-purple-500 to-indigo-500",
    action: () => (activeTab.value = "trends"),
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

const getCurrentTabName = () => {
  const tab = navigationTabs.find((tab) => tab.id === activeTab.value);
  return tab ? tab.label : "Dashboard";
};

const getTabDescription = () => {
  const descriptions = {
    scanner: "Advanced AI-powered threat detection and URL scanning",
    report: "Report suspicious activities and cyber threats",
    institutions: "Monitor threats targeting South African institutions",
    trends: "Detailed threat intelligence and analytics",
    community: "Connect with SA cybersecurity professionals",
  };
  return descriptions[activeTab.value] || "Coming soon...";
};
</script>
