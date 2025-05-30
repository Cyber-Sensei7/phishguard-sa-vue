<template>
  <div class="space-y-8 fade-in">
    <div class="text-center">
      <h2 class="text-white text-3xl font-bold mb-4">SA Threat Intelligence</h2>
      <p class="text-gray-400">
        Advanced threat analytics and trends for South Africa
      </p>
    </div>

    <!-- Intel Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass rounded-xl p-6 text-center">
        <Target class="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Active Campaigns</p>
        <p class="text-white text-2xl font-bold">23</p>
        <p class="text-red-400 text-xs mt-1">↑ 15% this week</p>
      </div>
      <div class="glass rounded-xl p-6 text-center">
        <TrendingUp class="w-8 h-8 text-yellow-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Threat Vectors</p>
        <p class="text-white text-2xl font-bold">8</p>
        <p class="text-yellow-400 text-xs mt-1">↑ 2 new vectors</p>
      </div>
      <div class="glass rounded-xl p-6 text-center">
        <Globe class="w-8 h-8 text-blue-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Affected Regions</p>
        <p class="text-white text-2xl font-bold">9</p>
        <p class="text-blue-400 text-xs mt-1">All provinces</p>
      </div>
      <div class="glass rounded-xl p-6 text-center">
        <Clock class="w-8 h-8 text-purple-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Avg Response Time</p>
        <p class="text-white text-2xl font-bold">4.2m</p>
        <p class="text-green-400 text-xs mt-1">↓ 30% faster</p>
      </div>
    </div>

    <!-- Threat Trends Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="glass rounded-xl p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-white text-xl font-semibold">
            Threat Trends (30 Days)
          </h3>
          <select
            v-model="selectedTimeframe"
            class="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
          </select>
        </div>
        <div
          class="h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg flex items-center justify-center relative"
        >
          <!-- Simulated Chart -->
          <div class="absolute inset-4">
            <div class="flex items-end justify-between h-full">
              <div
                v-for="(bar, index) in chartData"
                :key="index"
                class="flex flex-col items-center"
              >
                <div
                  :style="{ height: bar.height + '%' }"
                  :class="bar.color"
                  class="w-6 rounded-t mb-2 transition-all duration-500"
                ></div>
                <span class="text-gray-400 text-xs">{{ bar.label }}</span>
              </div>
            </div>
          </div>
          <div class="text-center z-10">
            <TrendingUp class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-400">Interactive Chart</p>
            <p class="text-gray-500 text-sm">Chart.js integration ready</p>
          </div>
        </div>
      </div>

      <!-- Top Threat Types -->
      <div class="glass rounded-xl p-6">
        <h3 class="text-white text-xl font-semibold mb-4">Top Threat Types</h3>
        <div class="space-y-4">
          <div
            v-for="threat in topThreats"
            :key="threat.type"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <div :class="threat.color" class="w-3 h-3 rounded-full"></div>
              <span class="text-white">{{ threat.type }}</span>
            </div>
            <div class="text-right">
              <p class="text-white font-semibold">{{ threat.count }}</p>
              <p :class="threat.trend" class="text-xs">{{ threat.change }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Threat Intelligence Feed -->
    <div class="glass rounded-xl p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-white text-xl font-semibold">
          Live Threat Intelligence Feed
        </h3>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-green-300 text-sm">Live</span>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="intel in threatIntelFeed"
          :key="intel.id"
          class="border-l-4 border-cyan-500 pl-4 py-3 bg-white/5 rounded-r-lg"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="flex items-center gap-2">
              <component :is="intel.icon" class="w-5 h-5 text-cyan-400" />
              <span class="text-white font-medium">{{ intel.title }}</span>
              <span
                :class="getSeverityBadge(intel.severity)"
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ intel.severity }}
              </span>
            </div>
            <span class="text-gray-400 text-sm">{{ intel.timestamp }}</span>
          </div>
          <p class="text-gray-300 text-sm mb-2">{{ intel.description }}</p>
          <div class="flex items-center gap-4 text-xs text-gray-400">
            <span>Source: {{ intel.source }}</span>
            <span>Confidence: {{ intel.confidence }}%</span>
            <span v-if="intel.iocs">IOCs: {{ intel.iocs }}</span>
          </div>
        </div>
      </div>

      <button
        class="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-2 rounded-lg transition-all"
      >
        Load More Intelligence
      </button>
    </div>

    <!-- Threat Map Section -->
    <div class="glass rounded-xl p-6">
      <h3 class="text-white text-xl font-semibold mb-4">
        South Africa Threat Heatmap
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Province Threat Levels -->
        <div class="md:col-span-2">
          <div
            class="h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden"
          >
            <!-- Simulated SA Map -->
            <div class="absolute inset-0 opacity-20">
              <svg viewBox="0 0 400 300" class="w-full h-full">
                <!-- Simplified SA provinces -->
                <path
                  d="M50,50 L150,50 L150,100 L50,100 Z"
                  fill="#ef4444"
                  opacity="0.7"
                />
                <path
                  d="M150,50 L250,50 L250,100 L150,100 Z"
                  fill="#f59e0b"
                  opacity="0.7"
                />
                <path
                  d="M250,50 L350,50 L350,100 L250,100 Z"
                  fill="#10b981"
                  opacity="0.7"
                />
                <path
                  d="M50,100 L150,100 L150,150 L50,150 Z"
                  fill="#f59e0b"
                  opacity="0.7"
                />
                <path
                  d="M150,100 L250,100 L250,150 L150,150 Z"
                  fill="#ef4444"
                  opacity="0.7"
                />
                <path
                  d="M250,100 L350,100 L350,150 L250,150 Z"
                  fill="#10b981"
                  opacity="0.7"
                />
                <path
                  d="M50,150 L200,150 L200,200 L50,200 Z"
                  fill="#f59e0b"
                  opacity="0.7"
                />
                <path
                  d="M200,150 L350,150 L350,200 L200,200 Z"
                  fill="#ef4444"
                  opacity="0.7"
                />
                <path
                  d="M100,200 L300,200 L300,250 L100,250 Z"
                  fill="#10b981"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div class="text-center z-10">
              <MapPin class="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-400">Interactive Threat Map</p>
              <p class="text-gray-500 text-sm">
                Geographic threat visualization
              </p>
            </div>
          </div>
        </div>

        <!-- Province Stats -->
        <div class="space-y-3">
          <h4 class="text-white font-medium mb-3">Province Threat Levels</h4>
          <div
            v-for="province in provinceStats"
            :key="province.name"
            class="flex items-center justify-between p-2 bg-white/5 rounded"
          >
            <span class="text-gray-300 text-sm">{{ province.name }}</span>
            <div class="flex items-center gap-2">
              <div
                :class="province.levelColor"
                class="w-2 h-2 rounded-full"
              ></div>
              <span class="text-white text-sm">{{ province.threats }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- IOC (Indicators of Compromise) Section -->
    <div class="glass rounded-xl p-6">
      <h3 class="text-white text-xl font-semibold mb-4">
        Latest Indicators of Compromise (IOCs)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="ioc in latestIOCs"
          :key="ioc.id"
          class="bg-white/5 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <span
              :class="getIOCTypeColor(ioc.type)"
              class="px-2 py-1 rounded text-xs font-medium"
            >
              {{ ioc.type }}
            </span>
            <span class="text-gray-400 text-xs">{{ ioc.added }}</span>
          </div>
          <p class="text-white font-mono text-sm mb-2 break-all">
            {{ ioc.value }}
          </p>
          <p class="text-gray-400 text-xs">{{ ioc.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Target,
  TrendingUp,
  Globe,
  Clock,
  MapPin,
  AlertTriangle,
  Shield,
  Zap,
  Eye,
  Wifi,
} from "lucide-vue-next";

// Reactive data
const selectedTimeframe = ref("30d");

// Chart data simulation
const chartData = ref([
  { label: "Mon", height: 60, color: "bg-red-500" },
  { label: "Tue", height: 45, color: "bg-yellow-500" },
  { label: "Wed", height: 80, color: "bg-red-500" },
  { label: "Thu", height: 35, color: "bg-green-500" },
  { label: "Fri", height: 70, color: "bg-red-500" },
  { label: "Sat", height: 25, color: "bg-green-500" },
  { label: "Sun", height: 55, color: "bg-yellow-500" },
]);

// Top threats data
const topThreats = ref([
  {
    type: "Phishing Emails",
    count: "1,247",
    change: "↑ 23%",
    trend: "text-red-400",
    color: "bg-red-500",
  },
  {
    type: "SMS Scams",
    count: "892",
    change: "↑ 18%",
    trend: "text-red-400",
    color: "bg-orange-500",
  },
  {
    type: "Banking Fraud",
    count: "634",
    change: "↑ 12%",
    trend: "text-red-400",
    color: "bg-yellow-500",
  },
  {
    type: "Malware",
    count: "423",
    change: "↓ 5%",
    trend: "text-green-400",
    color: "bg-purple-500",
  },
  {
    type: "Social Engineering",
    count: "312",
    change: "↑ 8%",
    trend: "text-red-400",
    color: "bg-pink-500",
  },
]);

// Threat intelligence feed
const threatIntelFeed = ref([
  {
    id: 1,
    title: "New FNB Phishing Campaign Detected",
    description:
      "Sophisticated phishing emails targeting FNB customers with fake account suspension notices.",
    severity: "high",
    timestamp: "2 mins ago",
    source: "SA-CERT",
    confidence: 95,
    iocs: 12,
    icon: AlertTriangle,
  },
  {
    id: 2,
    title: "Vodacom SMS Scam Surge",
    description:
      "Increase in fake promotional SMS messages claiming free data bundles.",
    severity: "medium",
    timestamp: "15 mins ago",
    source: "Community Reports",
    confidence: 87,
    iocs: 8,
    icon: Shield,
  },
  {
    id: 3,
    title: "SARS Tax Refund Fraud",
    description:
      "Fraudulent emails claiming tax refunds with malicious attachments.",
    severity: "high",
    timestamp: "1 hour ago",
    source: "SARS Security",
    confidence: 92,
    iocs: 15,
    icon: Zap,
  },
  {
    id: 4,
    title: "Cryptocurrency Investment Scam",
    description:
      "Social media ads promoting fake cryptocurrency investment platforms.",
    severity: "medium",
    timestamp: "2 hours ago",
    source: "Financial Intelligence",
    confidence: 78,
    iocs: 6,
    icon: Eye,
  },
]);

// Province statistics
const provinceStats = ref([
  { name: "Gauteng", threats: 342, levelColor: "bg-red-500" },
  { name: "Western Cape", threats: 287, levelColor: "bg-red-500" },
  { name: "KwaZulu-Natal", threats: 198, levelColor: "bg-yellow-500" },
  { name: "Eastern Cape", threats: 156, levelColor: "bg-yellow-500" },
  { name: "Limpopo", threats: 89, levelColor: "bg-green-500" },
  { name: "Mpumalanga", threats: 76, levelColor: "bg-green-500" },
  { name: "North West", threats: 54, levelColor: "bg-green-500" },
  { name: "Free State", threats: 43, levelColor: "bg-green-500" },
  { name: "Northern Cape", threats: 21, levelColor: "bg-green-500" },
]);

// Latest IOCs
const latestIOCs = ref([
  {
    id: 1,
    type: "Domain",
    value: "fnb-secure-login.co.za",
    description: "Fake FNB login page",
    added: "1 hour ago",
  },
  {
    id: 2,
    type: "IP Address",
    value: "192.168.1.100",
    description: "C&C server for banking trojan",
    added: "2 hours ago",
  },
  {
    id: 3,
    type: "Email",
    value: "noreply@sars-refund.org.za",
    description: "Phishing email sender",
    added: "3 hours ago",
  },
  {
    id: 4,
    type: "Hash",
    value: "a1b2c3d4e5f6...",
    description: "Malware file signature",
    added: "4 hours ago",
  },
  {
    id: 5,
    type: "URL",
    value: "vodacom-promo.net/claim",
    description: "Fake promotional page",
    added: "5 hours ago",
  },
  {
    id: 6,
    type: "Phone",
    value: "+27 XX XXX XXXX",
    description: "Scam call number",
    added: "6 hours ago",
  },
]);

// Methods
const getSeverityBadge = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red-500/20 text-red-300 border border-red-500/30";
    case "medium":
      return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
    case "low":
      return "bg-green-500/20 text-green-300 border border-green-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
  }
};

const getIOCTypeColor = (type) => {
  switch (type) {
    case "Domain":
      return "bg-blue-500/20 text-blue-300";
    case "IP Address":
      return "bg-red-500/20 text-red-300";
    case "Email":
      return "bg-purple-500/20 text-purple-300";
    case "Hash":
      return "bg-green-500/20 text-green-300";
    case "URL":
      return "bg-yellow-500/20 text-yellow-300";
    case "Phone":
      return "bg-pink-500/20 text-pink-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};
</script>
