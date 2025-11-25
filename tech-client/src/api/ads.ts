import axios from "axios";

const API_BASE = "/api/v1";

export interface Seller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

export interface ModerationHistory {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: "approved" | "rejected" | "requestChanges";
  reason: string | null;
  comment: string;
  timestamp: string;
}

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: "pending" | "approved" | "rejected" | "draft";
  priority: "normal" | "urgent";
  createdAt: string;
  updatedAt: string;
  images: string[];
  seller: Seller;
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistory[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface AdsResponse {
  ads: Advertisement[];
  pagination: Pagination;
}

export const fetchAds = async (params?: {
  page?: number;
  limit?: number;
  status?: string[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "createdAt" | "price" | "priority";
  sortOrder?: "asc" | "desc";
}): Promise<AdsResponse> => {
  try {
    
    const cleanParams: Record<string, unknown> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== "" &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          cleanParams[key] = value;
        }
      });
    }
    const res = await axios.get(`${API_BASE}/ads`, { params: cleanParams });
    return res.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
};

export const fetchAdById = async (id: number): Promise<Advertisement> => {
  try {
    const res = await axios.get(`${API_BASE}/ads/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching ad:", error);
    throw error;
  }
};
