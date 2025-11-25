import axios from "axios";

const API_BASE = "/api/v1";

export interface ModeratorStats {
  totalReviewed: number;
  todayReviewed: number;
  thisWeekReviewed: number;
  thisMonthReviewed: number;
  averageReviewTime: number;
  approvalRate: number;
}

export interface Moderator {
  id: number;
  name: string;
  email: string;
  role: string;
  statistics: ModeratorStats;
  permissions: string[];
}

export const fetchCurrentModerator = async (): Promise<Moderator> => {
  const res = await axios.get(`${API_BASE}/moderators/me`);
  return res.data;
};
