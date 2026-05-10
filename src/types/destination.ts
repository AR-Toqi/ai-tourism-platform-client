export enum DestinationCategory {
  BEACH = "BEACH",
  MOUNTAIN = "MOUNTAIN",
  CITY = "CITY",
  HISTORICAL = "HISTORICAL",
  ADVENTURE = "ADVENTURE",
  CULTURAL = "CULTURAL",
  NATURE = "NATURE",
}

export interface IDestinationImage {
  id: string;
  url: string;
  order: number;
  destinationId: string;
}

export interface IDestination {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  category: DestinationCategory;
  budgetMin: number;
  budgetMax: number;
  location: string;
  country: string;
  avgRating: number;
  reviewCount: number;
  isPublished: boolean;
  images: IDestinationImage[];
  createdAt: string;
  updatedAt: string;
}
