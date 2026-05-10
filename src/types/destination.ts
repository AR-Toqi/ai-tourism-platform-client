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
  budget: number;
  location: string;
  country: string;
  averageRating: number;

  totalReviews: number;
  isPublished: boolean;
  images: IDestinationImage[];
  createdAt: string;
  updatedAt: string;
}
