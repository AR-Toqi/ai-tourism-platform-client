export interface IActivity {
  time: string;
  description: string;
  location: string;
}

export interface IDay {
  day: number;
  title: string;
  activities: IActivity[];
}

export interface IItinerary {
  id: string;
  title: string;
  destination: string;
  duration: number;
  budget: number;
  preferences: string;
  days: IDay[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}
