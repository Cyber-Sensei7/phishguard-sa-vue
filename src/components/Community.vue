<template>
  <div class="space-y-8 fade-in">
    <div class="text-center">
      <h2 class="text-white text-3xl font-bold mb-4">
        SA Cybersecurity Community
      </h2>
      <p class="text-gray-400">
        Connect, share, and collaborate with South African cybersecurity
        professionals
      </p>
    </div>

    <!-- Community Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="glass rounded-xl p-6 text-center">
        <Users class="w-8 h-8 text-blue-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Active Members</p>
        <p class="text-white text-2xl font-bold">2,847</p>
      </div>
      <div class="glass rounded-xl p-6 text-center">
        <MessageSquare class="w-8 h-8 text-green-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Discussions</p>
        <p class="text-white text-2xl font-bold">1,234</p>
      </div>
      <div class="glass rounded-xl p-6 text-center">
        <AlertTriangle class="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Threat Reports</p>
        <p class="text-white text-2xl font-bold">567</p>
      </div>
      <div class="glass rounded-xl p-6 text-center">
        <Award class="w-8 h-8 text-yellow-400 mx-auto mb-2" />
        <p class="text-gray-400 text-sm">Expert Contributors</p>
        <p class="text-white text-2xl font-bold">89</p>
      </div>
    </div>

    <!-- Recent Discussions -->
    <div class="glass rounded-xl p-6">
      <h3 class="text-white text-xl font-semibold mb-4">
        Recent Community Discussions
      </h3>
      <div class="space-y-4">
        <div
          v-for="discussion in recentDiscussions"
          :key="discussion.id"
          class="p-4 bg-white/5 rounded-lg"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="text-white font-medium">{{ discussion.title }}</h4>
            <span class="text-gray-400 text-sm">{{ discussion.time }}</span>
          </div>
          <p class="text-gray-300 text-sm mb-2">{{ discussion.preview }}</p>
          <div class="flex items-center gap-4 text-xs text-gray-400">
            <span>By {{ discussion.author }}</span>
            <span>{{ discussion.replies }} replies</span>
            <span>{{ discussion.views }} views</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Users, MessageSquare, AlertTriangle, Award } from "lucide-vue-next";

const recentDiscussions = ref([
  {
    id: 1,
    title: "New Banking Trojan Targeting SA Banks",
    preview:
      "Has anyone else seen this new malware variant? It seems to be specifically targeting...",
    author: "CyberExpert_SA",
    time: "2 hours ago",
    replies: 12,
    views: 89,
  },
  {
    id: 2,
    title: "Best Practices for SME Cybersecurity",
    preview:
      "Looking for recommendations on cybersecurity frameworks suitable for small businesses...",
    author: "SecurityConsultant",
    time: "4 hours ago",
    replies: 8,
    views: 156,
  },
  {
    id: 3,
    title: "POPIA Compliance and Data Protection",
    preview:
      "Discussion on implementing POPIA compliance measures and data protection strategies...",
    author: "LegalTech_ZA",
    time: "1 day ago",
    replies: 23,
    views: 234,
  },
]);
</script>
