import { Button } from "@/components/ui/button";
import { ChevronRight, Navigation } from "lucide-react";

type DemoVariant =
  | "primary"
  | "secondary"
  | "secondaryNeutral"
  | "secondarySubtle"
  | "neutral"
  | "subtle";
type DemoSize = "md" | "sm";

type DemoGroup = {
  label: string;
  size: DemoSize;
  variants: Array<{ label: string; value: DemoVariant }>;
};

const columns = ["Default", "Hover", "Press", "Disabled"] as const;

const groups: DemoGroup[] = [
  {
    label: "Primary/Medium",
    size: "md",
    variants: [
      { label: "Primary", value: "primary" },
      { label: "Neutral", value: "neutral" },
      { label: "Subtle", value: "subtle" },
    ],
  },
  {
    label: "Secondary/Medium",
    size: "md",
    variants: [
      { label: "Primary", value: "secondary" },
      { label: "Neutral", value: "secondaryNeutral" },
      { label: "Subtle", value: "secondarySubtle" },
    ],
  },
  {
    label: "Primary/Small",
    size: "sm",
    variants: [
      { label: "Primary", value: "primary" },
      { label: "Neutral", value: "neutral" },
      { label: "Subtle", value: "subtle" },
    ],
  },
  {
    label: "Secondary/Small",
    size: "sm",
    variants: [
      { label: "Primary", value: "secondary" },
      { label: "Neutral", value: "secondaryNeutral" },
      { label: "Subtle", value: "secondarySubtle" },
    ],
  },
];

function DemoButton({
  variant,
  size,
  state,
}: {
  variant: DemoVariant;
  size: DemoSize;
  state: (typeof columns)[number];
}): React.JSX.Element {
  const stateProps =
    state === "Hover"
      ? { "data-state": "hover" as const }
      : state === "Press"
        ? { "data-state": "active" as const }
        : state === "Disabled"
          ? { disabled: true }
          : {};

  return (
    <Button
      variant={variant}
      size={size}
      data-icon="inline-start"
      {...stateProps}
      className="min-w-[132px] justify-between"
    >
      <Navigation className="size-4" />
      <span>Button</span>
      <ChevronRight className="size-4" />
    </Button>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-surface-default-default p-6 md:p-10">
      <main className="mx-auto max-w-6xl rounded-xl border border-dashed border-black/25 bg-white/40 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-surface-primary-default px-2.5 py-1 text-xs text-white">
            Button
          </span>
        </div>

        <div className="mb-4 grid grid-cols-[120px_110px_repeat(4,minmax(132px,1fr))] items-center gap-3">
          <div />
          <div />
          {columns.map((column) => (
            <div key={column} className="rounded-full bg-black/5 px-2 py-1 text-center text-xs text-black/70">
              {column}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.label} className="space-y-2">
              {group.variants.map((variant, idx) => (
                <div
                  key={`${group.label}-${variant.label}`}
                  className="grid grid-cols-[120px_110px_repeat(4,minmax(132px,1fr))] items-center gap-3"
                >
                  <div>
                    {idx === 0 && (
                      <span className="rounded-full bg-black/10 px-2 py-1 text-[11px] text-black/70">
                        {group.label}
                      </span>
                    )}
                  </div>
                  <span className="rounded-full bg-black/10 px-2 py-1 text-center text-[11px] text-black/70">
                    {variant.label}
                  </span>

                  {columns.map((state) => (
                    <DemoButton
                      key={`${group.label}-${variant.label}-${state}`}
                      variant={variant.value}
                      size={group.size}
                      state={state}
                    />
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
