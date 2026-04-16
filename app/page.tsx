import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/select-field";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { RadioGroupField } from "@/components/ui/radio-group-field";
import { ChevronRight, Navigation } from "lucide-react";

type DemoVariant =
  | "primary"
  | "secondary"
  | "secondaryNeutral"
  | "secondarySubtle"
  | "neutral"
  | "subtle"
  | "error"
  | "errorSubtle";
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
  {
    label: "Error/Medium",
    size: "md",
    variants: [
      { label: "Primary", value: "error" },
      { label: "Subtle", value: "errorSubtle" },
    ],
  },
  {
    label: "Error/Small",
    size: "sm",
    variants: [
      { label: "Primary", value: "error" },
      { label: "Subtle", value: "errorSubtle" },
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

  const isErrorVariant = variant === "error" || variant === "errorSubtle";

  return (
    <Button
      variant={variant}
      size={size}
      data-icon={isErrorVariant ? undefined : "inline-start"}
      {...stateProps}
      className={isErrorVariant ? "min-w-[132px]" : "min-w-[132px] justify-between"}
    >
      {isErrorVariant ? (
        <span>Button</span>
      ) : (
        <>
          <Navigation className="size-4" />
          <span>Button</span>
          <ChevronRight className="size-4" />
        </>
      )}
    </Button>
  );
}

type IconDemoVariant = Exclude<DemoVariant, "error" | "errorSubtle">;

const iconGroups: DemoGroup[] = [
  {
    label: "Icon Primary/Medium",
    size: "md",
    variants: [
      { label: "Primary", value: "primary" },
      { label: "Neutral", value: "neutral" },
      { label: "Subtle", value: "subtle" },
    ],
  },
  {
    label: "Icon Secondary/Medium",
    size: "md",
    variants: [
      { label: "Primary", value: "secondary" },
      { label: "Neutral", value: "secondaryNeutral" },
      { label: "Subtle", value: "secondarySubtle" },
    ],
  },
  {
    label: "Icon Primary/Small",
    size: "sm",
    variants: [
      { label: "Primary", value: "primary" },
      { label: "Neutral", value: "neutral" },
      { label: "Subtle", value: "subtle" },
    ],
  },
  {
    label: "Icon Secondary/Small",
    size: "sm",
    variants: [
      { label: "Primary", value: "secondary" },
      { label: "Neutral", value: "secondaryNeutral" },
      { label: "Subtle", value: "secondarySubtle" },
    ],
  },
];

function DemoIconButton({
  variant,
  size,
  state,
}: {
  variant: IconDemoVariant;
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
    <IconButton
      variant={variant}
      size={size}
      aria-label="Icon button"
      {...stateProps}
    >
      <Navigation className="size-4" />
    </IconButton>
  );
}

function DemoGrid<TVariant extends string>({
  groups,
  renderCell,
}: {
  groups: Array<{ label: string; size: DemoSize; variants: Array<{ label: string; value: TVariant }> }>;
  renderCell: (variant: TVariant, size: DemoSize, state: (typeof columns)[number]) => React.JSX.Element;
}): React.JSX.Element {
  return (
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
                <div key={`${group.label}-${variant.label}-${state}`} className="flex justify-start">
                  {renderCell(variant.value, group.size, state)}
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function DemoHeader({ label }: { label: string }): React.JSX.Element {
  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-surface-primary-default px-2.5 py-1 text-xs text-white">
          {label}
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
    </>
  );
}

function DemoButtonMatrix(): React.JSX.Element {
  return <DemoGrid groups={groups} renderCell={(variant, size, state) => <DemoButton variant={variant as DemoVariant} size={size} state={state} />} />;
}

function DemoIconButtonMatrix(): React.JSX.Element {
  return (
    <DemoGrid
      groups={iconGroups}
      renderCell={(variant, size, state) => <DemoIconButton variant={variant as IconDemoVariant} size={size} state={state} />}
    />
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold text-black/70">{title}</h2>
      {children}
    </section>
  );
}

type InputState = "Default" | "Error" | "Disabled";
type InputValueType = "Default" | "Placeholder";

const inputStates: InputState[] = ["Default", "Error", "Disabled"];
const inputValueTypes: InputValueType[] = ["Default", "Placeholder"];

function DemoInputCell({
  state,
  valueType,
}: {
  state: InputState;
  valueType: InputValueType;
}): React.JSX.Element {
  return (
    <InputField
      state={state === "Error" ? "error" : "default"}
      disabled={state === "Disabled"}
      valueType={valueType === "Default" ? "default" : "placeholder"}
      label="Label"
      description="Description"
      error="Error"
    />
  );
}

function DemoInputMatrix(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-center gap-4">
        <div />
        {inputValueTypes.map((type) => (
          <div key={type} className="rounded-full bg-black/5 px-2 py-1 text-center text-xs text-black/70">
            {type}
          </div>
        ))}
      </div>

      {inputStates.map((state) => (
        <div key={state} className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-start gap-4">
          <span className="rounded-full bg-black/10 px-2 py-1 text-center text-[11px] text-black/70">{state}</span>
          {inputValueTypes.map((valueType) => (
            <DemoInputCell key={`${state}-${valueType}`} state={state} valueType={valueType} />
          ))}
        </div>
      ))}
    </div>
  );
}

type SelectState = "Default" | "Error" | "Disabled";
type SelectValueType = "Default" | "Placeholder";

const selectStates: SelectState[] = ["Default", "Error", "Disabled"];
const selectValueTypes: SelectValueType[] = ["Default", "Placeholder"];

function DemoSelectCell({
  state,
  valueType,
}: {
  state: SelectState;
  valueType: SelectValueType;
}): React.JSX.Element {
  return (
    <SelectField
      state={state === "Error" ? "error" : "default"}
      disabled={state === "Disabled"}
      valueType={valueType === "Default" ? "default" : "placeholder"}
      label="Label"
      description="Description"
      error="Error"
    />
  );
}

function DemoSelectMatrix(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-center gap-4">
        <div />
        {selectValueTypes.map((type) => (
          <div key={type} className="rounded-full bg-black/5 px-2 py-1 text-center text-xs text-black/70">
            {type}
          </div>
        ))}
      </div>

      {selectStates.map((state) => (
        <div key={state} className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-start gap-4">
          <span className="rounded-full bg-black/10 px-2 py-1 text-center text-[11px] text-black/70">{state}</span>
          {selectValueTypes.map((valueType) => (
            <DemoSelectCell key={`${state}-${valueType}`} state={state} valueType={valueType} />
          ))}
        </div>
      ))}
    </div>
  );
}

type DatePickerState = "Default" | "Error" | "Disabled";
type DatePickerValueType = "Default" | "Placeholder";

const datePickerStates: DatePickerState[] = ["Default", "Error", "Disabled"];
const datePickerValueTypes: DatePickerValueType[] = ["Default", "Placeholder"];

function DemoDatePickerCell({
  state,
  valueType,
}: {
  state: DatePickerState;
  valueType: DatePickerValueType;
}): React.JSX.Element {
  return (
    <DatePickerField
      state={state === "Error" ? "error" : "default"}
      disabled={state === "Disabled"}
      valueType={valueType === "Default" ? "default" : "placeholder"}
      value={valueType === "Default" ? "03/10/2026" : undefined}
      label="Label"
      description="Description"
      error="Error"
    />
  );
}

function DemoDatePickerMatrix(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-center gap-4">
        <div />
        {datePickerValueTypes.map((type) => (
          <div key={type} className="rounded-full bg-black/5 px-2 py-1 text-center text-xs text-black/70">
            {type}
          </div>
        ))}
      </div>

      {datePickerStates.map((state) => (
        <div key={state} className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-start gap-4">
          <span className="rounded-full bg-black/10 px-2 py-1 text-center text-[11px] text-black/70">{state}</span>
          {datePickerValueTypes.map((valueType) => (
            <DemoDatePickerCell key={`${state}-${valueType}`} state={state} valueType={valueType} />
          ))}
        </div>
      ))}
    </div>
  );
}

type RadioState = "Default" | "Disabled";
type RadioValueType = "Default" | "Placeholder";

const radioStates: RadioState[] = ["Default", "Disabled"];
const radioValueTypes: RadioValueType[] = ["Default", "Placeholder"];

function DemoRadioCell({
  state,
  valueType,
}: {
  state: RadioState;
  valueType: RadioValueType;
}): React.JSX.Element {
  return (
    <RadioGroupField
      state={state === "Disabled" ? "disabled" : "default"}
      valueType={valueType === "Default" ? "default" : "placeholder"}
      label="Label"
      description="Description"
    />
  );
}

function DemoRadioMatrix(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-center gap-4">
        <div />
        {radioValueTypes.map((type) => (
          <div key={type} className="rounded-full bg-black/5 px-2 py-1 text-center text-xs text-black/70">
            {type}
          </div>
        ))}
      </div>

      {radioStates.map((state) => (
        <div key={state} className="grid grid-cols-[120px_repeat(2,minmax(180px,1fr))] items-start gap-4">
          <span className="rounded-full bg-black/10 px-2 py-1 text-center text-[11px] text-black/70">{state}</span>
          {radioValueTypes.map((valueType) => (
            <DemoRadioCell key={`${state}-${valueType}`} state={state} valueType={valueType} />
          ))}
        </div>
      ))}
    </div>
  );
}

function HomeContent(): React.JSX.Element {
  return (
    <>
      <Section title="Button">
        <DemoHeader label="Button" />
        <DemoButtonMatrix />
      </Section>

      <Section title="IconButton">
        <DemoHeader label="IconButton" />
        <DemoIconButtonMatrix />
      </Section>

      <Section title="Input">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-surface-primary-default px-2.5 py-1 text-xs text-white">
            Input
          </span>
        </div>
        <DemoInputMatrix />
      </Section>

      <Section title="Select">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-surface-primary-default px-2.5 py-1 text-xs text-white">
            Select
          </span>
        </div>
        <DemoSelectMatrix />
      </Section>

      <Section title="DatePicker">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-surface-primary-default px-2.5 py-1 text-xs text-white">
            DatePicker
          </span>
        </div>
        <DemoDatePickerMatrix />
      </Section>

      <Section title="RadioGroup">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-surface-primary-default px-2.5 py-1 text-xs text-white">
            RadioGroup
          </span>
        </div>
        <DemoRadioMatrix />
      </Section>
    </>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-surface-default-default p-6 md:p-10">
      <main className="mx-auto max-w-6xl rounded-xl border border-dashed border-black/25 bg-white/40 p-6 md:p-8">
        <HomeContent />
      </main>
    </div>
  );
}
