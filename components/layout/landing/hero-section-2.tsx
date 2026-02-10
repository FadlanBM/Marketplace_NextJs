"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "./header";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { InteractiveGridPattern } from "../../ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { messagesHero } from "@/constants/message-hero";

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden bg-background">
      <InteractiveGridPattern
        className={cn("mask-[radial-gradient(white,transparent)]")}
        width={40}
        height={40}
        squares={[100, 100]}
        squaresClassName="hover:fill-blue-500"
      />
      <HeroHeader />
      <main className="relative z-10 pointer-events-none">
        <section>
          <div className="relative pb-32 pt-44">
            <div className="mask-radial-from-45% mask-radial-to-75% mask-radial-at-top mask-radial-[75%_100%] md:aspect-9/4 absolute inset-0 aspect-square opacity-65 dark:opacity-5">
              <Image
                src="https://images.unsplash.com/photo-1740516367177-ae20098c8786?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dt"
                alt="hero background"
                width={2102}
                height={1694}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="mx-auto max-w-md text-center pointer-events-auto">
                <h1 className="text-balance font-serif text-4xl font-medium sm:text-5xl">
                  Jasa Pembuatan Aplikasi Tugas Akhir
                </h1>

                <div className="mx-auto mt-4 max-w-xs sm:max-w-md">
                  <Carousel
                    setApi={setApi}
                    className="w-full"
                    plugins={[
                      Autoplay({
                        delay: 3000,
                      }),
                    ]}
                  >
                    <CarouselContent>
                      {messagesHero.map((message, index) => (
                        <CarouselItem key={index}>
                          <p className="text-muted-foreground text-balance">
                            {message}
                          </p>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors",
                          current === index ? "bg-primary" : "bg-primary/20",
                        )}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <Button asChild className="mt-6 pr-1.5">
                  <Link href="#link">
                    <span className="text-nowrap">Start Building</span>
                    <ChevronRight className="opacity-50" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
