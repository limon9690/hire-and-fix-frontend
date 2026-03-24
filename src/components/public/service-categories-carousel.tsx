"use client";

import Link from "next/link";
import {
  Wrench,
  Zap,
  Paintbrush,
  Droplets,
  ShieldCheck,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { ServiceCategory } from "@/lib/public/service-categories";

type ServiceCategoriesCarouselProps = {
  categories: ServiceCategory[];
};

const icons: LucideIcon[] = [
  Wrench,
  Zap,
  Paintbrush,
  Droplets,
  ShieldCheck,
  Hammer,
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function ServiceCategoriesCarousel({
  categories,
}: ServiceCategoriesCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: categories.length > 3 }}
      className="w-full"
    >
      <CarouselContent className="-ml-3 md:-ml-4">
        {categories.map((category, index) => {
          const Icon = icons[index % icons.length];
          const serviceSlug = slugify(category.name);

          return (
            <CarouselItem
              key={category.id}
              className="pl-3 sm:basis-1/2 md:pl-4 lg:basis-1/3"
            >
              <Link
                href={`/services?service=${encodeURIComponent(serviceSlug)}`}
                className="block h-full"
              >
                <Card className="h-full border-border/80 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm">
                  <CardHeader className="space-y-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {category.description ||
                        "Book trusted professionals for this service."}
                    </p>
                    <p className="text-xs font-medium text-primary">
                      Browse providers
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
