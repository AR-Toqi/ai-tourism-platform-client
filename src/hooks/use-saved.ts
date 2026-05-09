import { useQuery } from "@tanstack/react-query";
import { savedService } from "@/services/saved.service";
import { queryKeys } from "@/lib/query-keys";

export function useSavedItems() {
  return useQuery({
    queryKey: queryKeys.saved.all,
    queryFn: () => savedService.getSavedItems(),
  });
}
