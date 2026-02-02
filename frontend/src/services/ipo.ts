import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: `${API_URL}/ipos`,
});

export interface IPO {
  _id: string;
  company: string;
  symbol: string;
  sector: string;
  status: 'upcoming' | 'open' | 'closed' | 'listed';
  description: string;
  priceBand?: {
    min: number;
    max: number;
  };
  issuePrice?: number;
  listingPrice?: number;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
  openDate?: string;
  closeDate?: string;
  listingDate?: string;
  issueSize?: string;
  issueType?: string;
  lotSize: number;
  minInvestment: number;
  totalShares?: number;
  sharesOffered?: number;
  peRatio?: number;
  eps?: number;
  marketCap?: string;
  qibSubscription?: number;
  niiSubscription?: number;
  retailSubscription?: number;
  totalSubscription?: number;
  promoterHolding?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  expectedReturn?: string;
  logo?: string;
  views?: number;
  watchlistCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPOStats {
  byStatus: Array<{
    _id: string;
    count: number;
    totalIssueSize: number;
  }>;
  totalIPOs: number;
  totalIssueSize: number;
}

export const ipoService = {
  // Get all IPOs with filtering
  async getAllIPOs(params?: {
    status?: string;
    sector?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }): Promise<{ ipos: IPO[]; pagination: any }> {
    const response = await api.get('', { params });
    return response.data;
  },

  // Get live IPOs (currently open)
  async getLiveIPOs(): Promise<IPO[]> {
    const response = await api.get('/live');
    return response.data;
  },

  // Get upcoming IPOs
  async getUpcomingIPOs(): Promise<IPO[]> {
    const response = await api.get('/upcoming');
    return response.data;
  },

  // Get listed IPOs (past IPOs)
  async getListedIPOs(): Promise<IPO[]> {
    const response = await api.get('/listed');
    return response.data;
  },

  // Get IPO by ID
  async getIPOById(id: string): Promise<IPO> {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Search IPOs
  async searchIPOs(query: string): Promise<IPO[]> {
    const response = await api.get(`/search/${query}`);
    return response.data;
  },

  // Get IPOs by sector
  async getIPOsBySector(sector: string): Promise<IPO[]> {
    const response = await api.get(`/sector/${sector}`);
    return response.data;
  },

  // Get IPO statistics
  async getIPOStats(): Promise<IPOStats> {
    const response = await api.get('/stats');
    return response.data;
  },

  // Admin functions
  async createIPO(ipoData: Partial<IPO>): Promise<IPO> {
    const response = await api.post('', ipoData);
    return response.data;
  },

  async updateIPO(id: string, ipoData: Partial<IPO>): Promise<IPO> {
    const response = await api.put(`/${id}`, ipoData);
    return response.data;
  },

  async deleteIPO(id: string): Promise<void> {
    await api.delete(`/${id}`);
  },

  async updateSubscription(id: string, subscriptionData: {
    qibSubscription: number;
    niiSubscription: number;
    retailSubscription: number;
  }): Promise<IPO> {
    const response = await api.put(`/${id}/subscription`, subscriptionData);
    return response.data;
  }
};
