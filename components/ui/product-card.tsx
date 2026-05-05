"use client";

import * as React from "react";
import { ChevronRight, Navigation } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductCardRootProps = React.HTMLAttributes<HTMLDivElement>;

const ProductCardRoot = React.forwardRef<HTMLDivElement, ProductCardRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-[300px] min-w-[240px] flex-col items-center gap-6 overflow-hidden rounded-2xl border border-[#D9D9D9] bg-white p-8",
        className
      )}
      {...props}
    />
  )
);
ProductCardRoot.displayName = "ProductCard.Root";

type ProductCardTopProps = React.HTMLAttributes<HTMLDivElement>;

const ProductCardTop = React.forwardRef<HTMLDivElement, ProductCardTopProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex w-full flex-col items-center justify-end gap-4", className)}
      {...props}
    />
  )
);
ProductCardTop.displayName = "ProductCard.Top";

export interface ProductCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const ProductCardTitle = React.forwardRef<HTMLHeadingElement, ProductCardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-[1.2] tracking-[-0.48px] text-[#111316]", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
ProductCardTitle.displayName = "ProductCard.Title";

export interface ProductCardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  amount?: React.ReactNode;
  currency?: React.ReactNode;
  label?: React.ReactNode;
  showLabel?: boolean;
}

const ProductCardPrice = React.forwardRef<HTMLDivElement, ProductCardPriceProps>(
  ({ amount = "50", currency = "$", label = "/ mo", showLabel = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-end justify-center whitespace-nowrap text-[#111316]", className)}
      {...props}
    >
      <div className="flex items-start leading-[1.2]">
        <span className="text-2xl font-semibold tracking-[-0.48px]">{currency}</span>
        <span className="text-5xl font-bold tracking-[-1.44px]">{amount}</span>
      </div>
      {showLabel ? <span className="text-base leading-[1.4]">{label}</span> : null}
    </div>
  )
);
ProductCardPrice.displayName = "ProductCard.Price";

export interface ProductCardFeatureListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const ProductCardFeatureList = React.forwardRef<HTMLUListElement, ProductCardFeatureListProps>(
  ({ children, className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex w-full flex-col gap-3 text-[#556070]", className)} {...props}>
      {children}
    </ul>
  )
);
ProductCardFeatureList.displayName = "ProductCard.FeatureList";

export interface ProductCardFeatureItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const ProductCardFeatureItem = React.forwardRef<HTMLLIElement, ProductCardFeatureItemProps>(
  ({ children, className, ...props }, ref) => (
    <li ref={ref} className={cn("ms-6 list-disc text-base leading-[1.4]", className)} {...props}>
      {children}
    </li>
  )
);
ProductCardFeatureItem.displayName = "ProductCard.FeatureItem";

type ProductCardActionProps = React.ComponentProps<typeof Button> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const ProductCardAction = React.forwardRef<HTMLButtonElement, ProductCardActionProps>(
  (
    {
      children = "Link",
      startIcon = <Navigation className="size-4" />,
      endIcon = <ChevronRight className="size-4" />,
      className,
      variant = "primary",
      size = "md",
      ...props
    },
    ref
  ) => (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      data-icon="inline-start"
      className={cn("w-full justify-center", className)}
      {...props}
    >
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </Button>
  )
);
ProductCardAction.displayName = "ProductCard.Action";

export const Root = ProductCardRoot;
export const Top = ProductCardTop;
export const Title = ProductCardTitle;
export const Price = ProductCardPrice;
export const FeatureList = ProductCardFeatureList;
export const FeatureItem = ProductCardFeatureItem;
export const Action = ProductCardAction;
