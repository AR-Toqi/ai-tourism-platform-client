import { IDestination } from "./destination";

export interface ISavedDestination {
  id: string;
  userId: string;
  destinationId: string;
  destination: IDestination;
  createdAt: string;
}

export interface ISavedItinerary {
  id: string;
  userId: string;
  itineraryId: string;
  itinerary: {
    id: string;
    title: string;
    totalDays: number;
    budgetEstimate: number;
    travelStyle: string;
    destination: IDestination;
  };
  createdAt: string;
}
