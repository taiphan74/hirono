"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden", {
  variants: {
    size: {
      sm: "size-[24px]",
      md: "size-[32px]",
      lg: "size-[40px]",
    },
    shape: {
      circle: "rounded-full",
      square: "",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

const initialTextVariants = cva("font-normal text-[#F5F5F5]", {
  variants: {
    size: {
      sm: "text-[14px] leading-[20px]",
      md: "text-[16px] leading-[22px]",
      lg: "text-[20px] leading-[24px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type AvatarType = "image" | "initial" | "subtract";

type AvatarCustomProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    type?: AvatarType;
    src?: string;
    alt?: string;
    initial?: string;
  };

function normalizeInitial(value?: string): string {
  const firstCharacter = value?.trim().charAt(0);
  return firstCharacter ? firstCharacter.toUpperCase() : "A";
}

function renderSubtractDot(size: NonNullable<VariantProps<typeof avatarVariants>["size"]>): string {
  switch (size) {
    case "sm":
      return "size-[6px]";
    case "md":
      return "size-[7px]";
    case "lg":
      return "size-[8px]";
    default:
      return "size-[7px]";
  }
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarCustomProps>(
  ({ className, size = "md", shape, type = "image", src, alt, initial, ...props }, ref) => {
    const normalizedInitial = normalizeInitial(initial);
    const resolvedSize = size ?? "md";

    return (
      <AvatarPrimitive.Root
        ref={ref}
        data-slot="avatar"
        data-size={size}
        data-shape={shape}
        data-type={type}
        className={cn(
          avatarVariants({ size, shape }),
          shape === "square" && (resolvedSize === "sm" ? "rounded-[4px]" : "rounded-[8px]"),
          className
        )}
        {...props}
      >
        {type === "image" && src ? (
          <AvatarPrimitive.Image
            data-slot="avatar-image"
            className="size-full object-cover"
            src={src}
            alt={alt}
          />
        ) : null}

        <AvatarPrimitive.Fallback data-slot="avatar-fallback" className="flex size-full items-center justify-center">
          {type === "subtract" ? (
            <span className="relative block size-full bg-[#D9D9D9]">
              <span
                className={cn(
                  "absolute -bottom-[5%] -right-[5%] rounded-full bg-[#B3B3B3]",
                  renderSubtractDot(resolvedSize)
                )}
              />
            </span>
          ) : (
            <span
              className={cn(
                "flex size-full items-center justify-center bg-[#2C2C2C]",
                initialTextVariants({ size })
              )}
            >
              {normalizedInitial}
            </span>
          )}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

Avatar.displayName = "Avatar";

const AvatarImage = AvatarPrimitive.Image;
const AvatarFallback = AvatarPrimitive.Fallback;

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
export type { AvatarCustomProps, AvatarType };
