"use client";

import * as React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Badge variant styles
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800",
        new: "bg-green-100 text-green-800",
        sale: "bg-red-100 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProductCardBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

type ProductCardRootProps = React.HTMLAttributes<HTMLDivElement>;

const ProductCardRoot = React.forwardRef<HTMLDivElement, ProductCardRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-[300px] min-w-[240px] h-[405px] bg-white border border-[#D9D9D9] rounded-2xl p-8 gap-6 flex flex-col items-center",
        className
      )}
      {...props}
    />
  )
);
ProductCardRoot.displayName = "ProductCard.Root";

export interface ProductCardImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const ProductCardImage = React.forwardRef<HTMLImageElement, ProductCardImageProps>(
  ({ src, alt = "", className }, ref) => (
    <div className="relative w-full aspect-square overflow-hidden rounded-md">
      <NextImage
        ref={ref}
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        sizes="(max-width: 300px) 300px, 300px"
      />
    </div>
  )
);
ProductCardImage.displayName = "ProductCard.Image";

const ProductCardBadge = React.forwardRef<HTMLDivElement, ProductCardBadgeProps>(
  ({ children, variant, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
ProductCardBadge.displayName = "ProductCard.Badge";

export interface ProductCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const ProductCardTitle = React.forwardRef<HTMLHeadingElement, ProductCardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold text-center", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
ProductCardTitle.displayName = "ProductCard.Title";

export interface ProductCardPriceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ProductCardPrice = React.forwardRef<HTMLDivElement, ProductCardPriceProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-xl font-bold text-center", className)}
      {...props}
    >
      {children}
    </div>
  )
);
ProductCardPrice.displayName = "ProductCard.Price";

export interface ProductCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const ProductCardDescription = React.forwardRef<HTMLParagraphElement, ProductCardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600 text-center", className)}
      {...props}
    >
      {children}
    </p>
  )
);
ProductCardDescription.displayName = "ProductCard.Description";

export const Root = ProductCardRoot;
export const Image = ProductCardImage;
export const Badge = ProductCardBadge;
export const Title = ProductCardTitle;
export const Price = ProductCardPrice;
export const Description = ProductCardDescription;
