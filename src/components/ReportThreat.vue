<template>
  <div class="max-w-2xl mx-auto space-y-8 fade-in">
    <div class="text-center">
      <h2 class="text-white text-3xl font-bold mb-4">Report Cyber Threat</h2>
      <p class="text-gray-400">
        Help protect South Africa by reporting suspicious activities
      </p>
    </div>

    <form @submit.prevent="submitReport" class="glass rounded-xl p-8 space-y-6">
      <!-- Threat Type -->
      <div>
        <label class="text-white font-medium mb-3 block">Threat Type</label>
        <select
          v-model="threatsStore.reportForm.type"
          class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          required
        >
          <option value="">Select threat type</option>
          <option value="phishing">Phishing Email</option>
          <option value="scam">SMS/WhatsApp Scam</option>
          <option value="fraud">Online Fraud</option>
          <option value="malware">Malware/Virus</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Institution -->
      <div>
        <label class="text-white font-medium mb-3 block"
          >Targeted Institution</label
        >
        <select
          v-model="threatsStore.reportForm.institution"
          class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="">Select institution (if applicable)</option>
          <option value="FNB">First National Bank (FNB)</option>
          <option value="Standard Bank">Standard Bank</option>
          <option value="Capitec">Capitec Bank</option>
          <option value="Vodacom">Vodacom</option>
          <option value="MTN">MTN</option>
          <option value="SARS">South African Revenue Service (SARS)</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label class="text-white font-medium mb-3 block"
          >Threat Description</label
        >
        <textarea
          v-model="threatsStore.reportForm.description"
          placeholder="Describe the threat in detail..."
          rows="4"
          class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none"
          required
        ></textarea>
      </div>

      <!-- Contact Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-white font-medium mb-3 block"
            >Email (Optional)</label
          >
          <input
            v-model="threatsStore.reportForm.email"
            type="email"
            placeholder="your.email@example.com"
            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label class="text-white font-medium mb-3 block"
            >Phone (Optional)</label
          >
          <input
            v-model="threatsStore.reportForm.phone"
            type="tel"
            placeholder="+27 XX XXX XXXX"
            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
      >
        Submit Threat Report
      </button>
    </form>
  </div>
</template>

<script setup>
import { useThreatsStore } from "../stores/threats";

const threatsStore = useThreatsStore();

const submitReport = () => {
  threatsStore.submitReport();
  alert("Threat report submitted successfully!");
};
</script>
