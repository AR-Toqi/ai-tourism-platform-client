import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentManagerService } from "@/services/content-manager.service";
import { queryKeys } from "@/lib/query-keys";
import { toast } from "sonner";

export function useCMDestinations(params?: any) {
  return useQuery({
    queryKey: queryKeys.contentManager.destinations,
    queryFn: () => contentManagerService.getDestinations(params),
  });
}

export function useCMDestination(id: string) {
  return useQuery({
    queryKey: queryKeys.contentManager.destination(id),
    queryFn: () => contentManagerService.getDestinationById(id),
    enabled: !!id,
  });
}

export function useCreateDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => contentManagerService.createDestination(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destinations });
      toast.success("Destination created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create destination");
    },
  });
}

export function useUpdateDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      contentManagerService.updateDestination(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destinations });
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destination(variables.id) });
      toast.success("Destination updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update destination");
    },
  });
}

export function useUpdateCover() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      contentManagerService.updateCover(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destination(variables.id) });
      toast.success("Cover image updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update cover image");
    },
  });
}

export function useUploadImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      contentManagerService.uploadImages(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destination(variables.id) });
      toast.success("Images uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to upload images");
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ destinationId, imageId }: { destinationId: string; imageId: string }) =>
      contentManagerService.deleteImage(imageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destination(variables.destinationId) });
      toast.success("Image deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete image");
    },
  });
}

export function useUpdateGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ imageId, destinationId, data }: { imageId: string; destinationId: string; data: FormData }) =>
      contentManagerService.updateGalleryImage(imageId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destination(variables.destinationId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.contentManager.destinations });
      toast.success("Image updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update image");
    },
  });
}
