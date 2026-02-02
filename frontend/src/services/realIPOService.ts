import axios from 'axios';

const REAL_IPO_API_BASE_URL = 'https://api.ipliindia.com/api/ipo';
const NSE_API_BASE_URL = 'https://www.nseindia.com';

export interface RealIPO {
  ipoId: string;
  companyName: string;
  ipoType: string;
  ipoOpenDate: string;
  ipoCloseDate: string;
  listingDate: string;
  issueSize: string;
  issuePrice: number;
  listingPrice: number;
  priceBand: {
    min: number;
    max: number;
  };
  isSME: boolean;
  registrarName: string;
  listingStatus: string;
  subscriptionStatus: {
    qib: number;
    nii: number;
    retail: number;
    total: number;
  };
  ipoDetails: {
    description: string;
    objectives: string;
  };
  company: {
    website: string;
    email: string;
    address: string;
    telephone: string;
  };
  isLive?: boolean;
  daysToClose?: number;
}

export class RealIPOService {
  private static instance: RealIPOService;
  private cache: Map<string, any> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  public static getInstance(): RealIPOService {
    if (!RealIPOService.instance) {
      RealIPOService.instance = new RealIPOService();
    }
    return RealIPOService.instance;
  }

  // Get all IPOs from real API
  async getAllIPOs(): Promise<RealIPO[]> {
    try {
      const response = await axios.get(`${REAL_IPO_API_BASE_URL}/ipo/ipo`);
      
      const ipos = response.data.map((item: any) => ({
        ...item,
        // Add computed fields
        isLive: new Date(item.ipoOpenDate) <= new Date() && new Date(item.ipoCloseDate) >= new Date(),
        daysToClose: Math.ceil((new Date(item.ipoCloseDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
        subscriptionStatus: {
          qib: item.subscriptionStatus?.qib || 0,
          nii: item.subscriptionStatus?.nii || 0,
          retail: item.subscriptionStatus?.retail || 0,
          total: item.subscriptionStatus?.total || 0
        }
      }));

      return ipos;
    } catch (error) {
      console.error('Failed to fetch real IPOs:', error);
      throw error;
    }
  }

  // Get live IPOs
  async getLiveIPOs(): Promise<RealIPO[]> {
    const allIPOs = await this.getAllIPOs();
    return allIPOs.filter(ipo => ipo.isLive);
  }

  // Get upcoming IPOs
  async getUpcomingIPOs(): Promise<RealIPO[]> {
    const allIPOs = await this.getAllIPOs();
    return allIPOs.filter(ipo => new Date(ipo.ipoOpenDate) > new Date());
  }

  // Get listed IPOs
  async getListedIPOs(): Promise<RealIPO[]> {
    const allIPOs = await this.getAllIPOs();
    return allIPOs.filter(ipo => ipo.listingStatus === 'Listed');
  }

  // Get IPO by ID
  async getIPOById(ipoId: string): Promise<RealIPO | null> {
    try {
      const response = await axios.get(`${REAL_IPO_API_BASE_URL}/ipo/ipo/${ipoId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch IPO by ID:', error);
      return null;
    }
  }

  // Search IPOs
  async searchIPOs(query: string): Promise<RealIPO[]> {
    try {
      const response = await axios.get(`${REAL_IPO_API_BASE_URL}/ipo/search?search=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Failed to search IPOs:', error);
      return [];
    }
  }

  // Get NSE listed IPOs
  async getNSEListedIPOs(): Promise<any[]> {
    try {
      const response = await axios.get(`${NSE_API_BASE_URL}/market-data/ipo`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch NSE IPOs:', error);
      return [];
    }
  }

  // Get market statistics
  async getMarketStats(): Promise<any> {
    try {
      const response = await axios.get(`${REAL_IPO_API_BASE_URL}/market/statistics`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch market stats:', error);
      return {};
    }
  }

  // Get subscription updates for specific IPO
  async getSubscriptionUpdates(ipoId: string): Promise<any> {
    try {
      const response = await axios.get(`${REAL_IPO_API_BASE_URL}/ipo/${ipoId}/subscription`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch subscription updates:', error);
      return null;
    }
  }
}

export default RealIPOService;
