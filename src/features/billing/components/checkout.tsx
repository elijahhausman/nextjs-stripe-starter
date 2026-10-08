"use client";

import {
  ChevronRight,
  LucideAlertCircle,
  LucideCheck,
  LucideZap,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createCheckoutSession } from "../actions/create-checkout";
import { plans } from "../data";

export default function Checkout() {
  const [billing, setBilling] = useState("month");
  const [loading, setLoading] = useState(false);

  const session = {
    email: "email@example.com",
  };

  const handleCheckout = async (priceId: string) => {
    setLoading(true);

    try {
      await createCheckoutSession(priceId, session.email);
    } catch (error) {
      console.error("Checkout failed:", error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-16">
      <div className="mx-auto max-w-5xl px-8">
        <div className="mb-12 flex w-full flex-col justify-center text-center">
          <h2 className="font-medium text-3xl tracking-tight lg:text-5xl">
            Choose Your Plan
          </h2>
        </div>

        {/* Billing Toggle */}
        <div className="mx-auto mb-8 flex max-w-sm items-center justify-center gap-1.5 rounded-xl bg-card p-1.5 ring ring-foreground/10">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setBilling("month")}
            className={`flex-1 rounded-xl transition hover:bg-neutral-800 dark:hover:bg-neutral-800 ${
              billing === "month"
                ? "bg-neutral-800 text-white shadow-sm hover:text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Monthly
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setBilling("year")}
            className={`flex-1 rounded-xl transition hover:bg-neutral-800 dark:hover:bg-neutral-800 ${
              billing === "year"
                ? "bg-neutral-800 text-white shadow-sm hover:text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <LucideZap />
            Yearly{" "}
            <span className="font-medium text-indigo-400 text-xs">
              (60% OFF)
            </span>
          </Button>
        </div>

        {/* Plans mapping */}
        <div className="relative flex flex-row items-center justify-center gap-8">
          {plans.map((plan) => {
            const product = plan.products.find(
              (product) => product.interval === billing,
            )!;

            return (
              <Card key={plan.id} className="w-full max-w-lg">
                <CardHeader className="mb-6">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>

                  <CardDescription className="text-base text-primary/80">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div>
                    <span className="font-medium text-5xl tracking-tight">
                      ${product.price}
                    </span>

                    {` `}

                    <span className="font-light text-primary/90 text-sm tracking-wide">
                      / {product.interval}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleCheckout(product.priceId!)}
                    className="group my-3 flex h-10 w-full items-center justify-center gap-2 rounded-full hover:bg-primary/90 disabled:opacity-70"
                    disabled={loading}
                  >
                    <span className="font-medium">Get {plan.name}</span>

                    <ChevronRight className="transition group-hover:translate-x-px" />
                  </Button>

                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <LucideCheck
                          strokeWidth={1.5}
                          className="text-primary"
                        />

                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
