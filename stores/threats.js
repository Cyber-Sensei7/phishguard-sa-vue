import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThreatsStore = defineStore("threats", () => {
  // State
  const threats = ref([
    {
      id: 1,
      type: "phishing",
      severity: "high",
      source: "FNB phishing email",
      detected: "2 mins ago",
      status: "blocked",
      institution: "FNB",
      description: "Fake banking login page attempting to steal credentials",
    },
    {
      id: 2,
      type: "scam",
      severity: "high",
      source: "Vodacom fake SMS",
      detected: "15 mins ago",
      status: "reported",
      institution: "Vodacom",
      description: "SMS claiming free data with malicious link",
    },
    {
      id: 3,
      type: "fraud",
      severity: "medium",
      source: "SARS fake notice",
      detected: "1 hour ago",
      status: "investigating",
      institution: "SARS",
      description: "Fraudulent tax refund notification",
    },
    {
      id: 4,
      type: "phishing",
      severity: "high",
      source: "Standard Bank fake alert",
      detected: "3 hours ago",
      status: "blocked",
      institution: "Standard Bank",
      description: "Account suspension threat with credential harvesting",
    },
  ]);

  const scanResult = ref(null);
  const isScanning = ref(false);
  const reportForm = ref({
    type: "",
    description: "",
    institution: "",
    email: "",
    phone: "",
  });

  // Getters
  const recentThreats = computed(() => threats.value.slice(0, 5));
  const threatStats = computed(() => ({
    threatsBlocked: threats.value.filter((t) => t.status === "blocked").length,
    scansToday: 45,
    communityReports: 1800,
    aiAccuracy: 94.7,
  }));

  const saInstitutions = ref([
    {
      name: "First National Bank (FNB)",
      type: "Banking",
      threats: 45,
      status: "protected",
      lastUpdate: "2 hours ago",
      logo: "🏦",
    },
    {
      name: "Standard Bank",
      type: "Banking",
      threats: 38,
      status: "protected",
      lastUpdate: "1 hour ago",
      logo: "🏛",
    },
    {
      name: "Vodacom",
      type: "Telecommunications",
      threats: 29,
      status: "monitoring",
      lastUpdate: "30 mins ago",
      logo: "📱",
    },
    {
      name: "SARS",
      type: "Government",
      threats: 52,
      status: "high-alert",
      lastUpdate: "15 mins ago",
      logo: "🏛",
    },
  ]);

  // Actions
  const addThreat = (threat) => {
    const newThreat = {
      id: Date.now(),
      ...threat,
      detected: "just now",
      status: "investigating",
    };
    threats.value.unshift(newThreat);
  };

  const performScan = async () => {
    isScanning.value = true;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    scanResult.value = {
      isPhishing: Math.random() > 0.5,
      confidence: Math.floor(Math.random() * 40) + 60,
      indicators: [
        "Suspicious sender domain",
        "Urgent language patterns",
        "Hidden redirect links",
      ],
      recommendation:
        Math.random() > 0.5
          ? "BLOCK - High risk phishing attempt"
          : "SAFE - Legitimate communication",
    };

    isScanning.value = false;
  };

  const submitReport = () => {
    addThreat({
      type: reportForm.value.type,
      severity: "pending",
      source: "user_report",
      institution: reportForm.value.institution,
      description: reportForm.value.description,
    });

    // Reset form
    reportForm.value = {
      type: "",
      description: "",
      institution: "",
      email: "",
      phone: "",
    };
  };

  return {
    // State
    threats,
    scanResult,
    isScanning,
    reportForm,
    saInstitutions,

    // Getters
    recentThreats,
    threatStats,

    // Actions
    addThreat,
    performScan,
    submitReport,
  };
});
