
export type UnitType = 
  | 'ground-floor-apt' 
  | 'top-floor-apt' 
  | 'middle-apt' 
  | 'office-retail' 
  | 'house' 
  | 'mixed-use';

export type DevelopmentModel = 
  | 'extension'
  | 'splitting'
  | 'conversion'
  | 'renovation';

export interface Property {
  id: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  unitType: UnitType;
  builtYear: number;
  size: number; // in m²
  hasGarden: boolean;
  gardenSize?: number; // in m²
  hasRoofAccess: boolean;
  developmentScore: number; // 0-100
  capRate: number; // as a percentage
  roi: number; // as a percentage
  projectedIrr: number; // as a percentage
  developmentModel: DevelopmentModel;
  summaryText: string;
  goNoGo: 'go' | 'no-go' | 'manual-review';
  thumbnailUrl?: string;
}

export interface DashboardMetrics {
  totalProperties: number;
  averageDevelopmentScore: number;
  averageCapRate: number;
  goCount: number;
  noGoCount: number;
  reviewCount: number;
  recentlyAdded: number;
}
