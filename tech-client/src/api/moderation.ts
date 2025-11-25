import axios from "axios";
import type { Advertisement } from "./ads";

const API_BASE = "/api/v1";

export interface ModerationRequest {
  reason: string;
  comment?: string;
}

export const approveAd = async (id: number): Promise<Advertisement> => {
  const res = await axios.post(`${API_BASE}/ads/${id}/approve`);
  return res.data.ad;
};

export const rejectAd = async (
  id: number,
  payload: ModerationRequest,
): Promise<Advertisement> => {
  const res = await axios.post(`${API_BASE}/ads/${id}/reject`, payload);
  return res.data.ad;
};

export const requestChangesAd = async (
  id: number,
  payload: ModerationRequest,
): Promise<Advertisement> => {
  const res = await axios.post(
    `${API_BASE}/ads/${id}/request-changes`,
    payload,
  );
  return res.data.ad;
};
