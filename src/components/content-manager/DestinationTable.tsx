"use client";

import { IDestination } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Image, GalleryVertical, ExternalLink } from "lucide-react";
import Link from "next/link";

interface DestinationTableProps {
  destinations: IDestination[];
}

export function DestinationTable({ destinations }: DestinationTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No destinations found.
              </TableCell>
            </TableRow>
          ) : (
            destinations.map((destination) => (
              <TableRow key={destination.id}>
                <TableCell className="font-medium">{destination.name}</TableCell>
                <TableCell>
                  {destination.location}, {destination.country}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{destination.category}</Badge>
                </TableCell>
                <TableCell>
                  {destination.isPublished ? (
                    <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(destination.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/destinations/${destination.slug}`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Public
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/content-manager/destinations/${destination.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/content-manager/destinations/${destination.id}/cover`}>
                          <Image className="mr-2 h-4 w-4" />
                          Manage Cover
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/content-manager/destinations/${destination.id}/gallery`}>
                          <GalleryVertical className="mr-2 h-4 w-4" />
                          Manage Gallery
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
