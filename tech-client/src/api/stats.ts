import axios from "axios";

const API_BASE = "/api/v1";

export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityData {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export const fetchStatsSummary = async (params?: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<StatsSummary> => {
  const res = await axios.get(`${API_BASE}/stats/summary`, { params });
  return res.data;
};

export const fetchActivityChart = async (params?: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<ActivityData[]> => {
  const res = await axios.get(`${API_BASE}/stats/chart/activity`, { params });
  return res.data;
};

export const fetchDecisionsChart = async (params?: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<DecisionsData> => {
  const res = await axios.get(`${API_BASE}/stats/chart/decisions`, { params });
  return res.data;
};

export const fetchCategoriesChart = async (params?: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Record<string, number>> => {
  const res = await axios.get(`${API_BASE}/stats/chart/categories`, { params });
  return res.data;
};
