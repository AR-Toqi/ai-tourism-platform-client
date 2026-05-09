import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itineraryService } from "@/services/itinerary.service";
import { queryKeys } from "@/lib/query-keys";

export function useMyItineraries() {
  return useQuery({
    queryKey: queryKeys.itineraries.my,
    queryFn: () => itineraryService.getMy(),
  });
}

export function useItinerary(id: string) {
  return useQuery({
    queryKey: queryKeys.itineraries.detail(id),
    queryFn: () => itineraryService.getById(id),
    enabled: !!id,
  });
}

export function useGenerateItinerary() {
  return useMutation({
    mutationFn: (data: any) => itineraryService.generate(data),
  });
}
