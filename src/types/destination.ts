export enum DestinationCategory {
  BEACH = "beach",
  MOUNTAIN = "mountain",
  CITY = "city",
  ADVENTURE = "adventure",
  CULTURAL = "cultural",
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
