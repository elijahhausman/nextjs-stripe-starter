export type BillingInterval = "month" | "year";

export interface Product {
  priceId: string | undefined;
  price: number;
  interval: BillingInterval;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  products: Product[];
  features: string[];
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Ship Fast Basic",
    products: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY
            : process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_MONTHLY, // TODO: Create production products
        price: 19,
        interval: "month",
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY
            : process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC_YEARLY, // TODO: Create production products
        price: 99,
        interval: "year",
      },
    ],
    features: [
      "NextJS boilerplate",
      "Database integration",
      "Transactional emails",
      "1 year of updates",
      "24/7 support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ship Fast Pro",
    products: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY
            : process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY, // TODO: Create production products
        price: 39,
        interval: "month",
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY
            : process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY, // TODO: Create production products
        price: 199,
        interval: "year",
      },
    ],
    features: [
      "NextJS boilerplate",
      "Database integration",
      "Transactional emails",
      "1 year of updates",
      "24/7 support",
    ],
  },
];
