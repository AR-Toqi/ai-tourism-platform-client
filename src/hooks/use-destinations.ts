import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { destinationService } from "@/services/destination.service";
import { queryKeys } from "@/lib/query-keys";

export function useDestinations(params?: any) {
  return useQuery({
    queryKey: queryKeys.destinations.list(params || {}),
    queryFn: () => destinationService.getAll(params),
  });
}

export function useDestination(slug: string) {
  return useQuery({
    queryKey: queryKeys.destinations.detail(slug),
    queryFn: () => destinationService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useSaveDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (destinationId: string) => destinationService.save(destinationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.saved.all });
    },
  });
}
