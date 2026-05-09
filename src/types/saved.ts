import { IDestination } from "./destination";
import { IItinerary } from "./itinerary";

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
  itinerary: IItinerary;
  createdAt: string;
}
