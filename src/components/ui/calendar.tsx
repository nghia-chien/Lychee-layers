import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "../../lib/utils.ts";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-[#FAF7F2] text-[#2A2523] select-none", className)}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col sm:flex-row gap-4", defaultClassNames.months),
        month: cn("flex flex-col gap-3", defaultClassNames.month),
        month_caption: cn(
          "flex justify-center items-center relative h-9 px-8 text-xs font-serif tracking-[0.16em] uppercase text-[#2A2523] font-semibold",
          defaultClassNames.month_caption
        ),
        caption_label: cn("text-xs font-medium tracking-[0.14em]", defaultClassNames.caption_label),
        nav: cn("flex items-center gap-1", defaultClassNames.nav),
        button_previous: cn(
          "absolute left-1 top-0 h-8 w-8 flex items-center justify-center p-0 rounded-none border border-transparent text-[#2A2523]/70 hover:text-[#2A2523] hover:border-[#2A2523]/20 hover:bg-[#EAE4DC]/60 transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#2A2523]/40",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "absolute right-1 top-0 h-8 w-8 flex items-center justify-center p-0 rounded-none border border-transparent text-[#2A2523]/70 hover:text-[#2A2523] hover:border-[#2A2523]/20 hover:bg-[#EAE4DC]/60 transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#2A2523]/40",
          defaultClassNames.button_next
        ),
        month_grid: cn("w-full border-collapse space-y-1", defaultClassNames.month_grid),
        weekdays: cn("flex justify-between mb-1 border-b border-[#2A2523]/10 pb-1.5", defaultClassNames.weekdays),
        weekday: cn(
          "w-9 text-center text-[10px] uppercase tracking-widest text-[#8A7E78] font-sans font-medium",
          defaultClassNames.weekday
        ),
        weeks: cn("w-full space-y-1", defaultClassNames.weeks),
        week: cn("flex w-full justify-between mt-1", defaultClassNames.week),
        day: cn(
          "relative p-0 text-center text-xs focus-within:relative focus-within:z-20",
          defaultClassNames.day
        ),
        day_button: cn(
          "h-9 w-9 p-0 font-sans text-xs font-normal transition-all duration-150 rounded-none flex items-center justify-center cursor-pointer outline-none",
          "hover:bg-[#EAE4DC] hover:text-[#2A2523] focus-visible:ring-1 focus-visible:ring-[#2A2523]/40",
          // Selected day styles when rendered in a selected cell
          "[aria-selected=true]_&]:bg-[#2A2523] [aria-selected=true]_&]:text-[#FAF7F2] [aria-selected=true]_&]:font-medium [aria-selected=true]_&]:hover:bg-[#2A2523]",
          // Today day styles when not selected
          "[data-today=true]:not([aria-selected=true])_&]:border [data-today=true]:not([aria-selected=true])_&]:border-[#C9968B] [data-today=true]:not([aria-selected=true])_&]:font-medium",
          defaultClassNames.day_button
        ),
        selected: cn("bg-[#2A2523] text-[#FAF7F2]", defaultClassNames.selected),
        today: cn("border border-[#C9968B]", defaultClassNames.today),
        outside: cn("opacity-35 text-[#8A7E78] pointer-events-none", defaultClassNames.outside),
        disabled: cn("opacity-25 line-through text-[#8A7E78] pointer-events-none", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClass, ...chevronProps }) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn("size-4 text-[#2A2523]", chevronClass)} {...chevronProps} />;
          }
          return <ChevronRight className={cn("size-4 text-[#2A2523]", chevronClass)} {...chevronProps} />;
        },
        ...components,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
