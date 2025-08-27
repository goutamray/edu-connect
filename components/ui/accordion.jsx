// "use client"

// import * as React from "react"
// import * as AccordionPrimitive from "@radix-ui/react-accordion"
// import { ChevronDownIcon } from "lucide-react"

// import { cn } from "@/lib/utils"

// function Accordion({
//   ...props
// }) {
//   return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
// }

// function AccordionItem({
//   className,
//   ...props
// }) {
//   return (
//     (<AccordionPrimitive.Item
//       data-slot="accordion-item"
//       className={cn("border-b last:border-b-0", className)}
//       {...props} />)
//   );
// }

// function AccordionTrigger({
//   className,
//   children,
//   ...props
// }) {
//   return (
//     (<AccordionPrimitive.Header className="flex">
//       <AccordionPrimitive.Trigger
//         data-slot="accordion-trigger"
//         className={cn(
//           "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
//           className
//         )}
//         {...props}>
//         {children}
//         <ChevronDownIcon
//           className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
//       </AccordionPrimitive.Trigger>
//     </AccordionPrimitive.Header>)
//   );
// }

// function AccordionContent({
//   className,
//   children,
//   ...props
// }) {
//   return (
//     (<AccordionPrimitive.Content
//       data-slot="accordion-content"
//       className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
//       {...props}>
//       <div className={cn("pt-0 pb-4", className)}>{children}</div>
//     </AccordionPrimitive.Content>)
//   );
// }

// export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ✅ Root Accordion
function Accordion({
  type = "single",
  collapsible = true,
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Root
      type={type}
      {...(type === "single" ? { collapsible } : {})} // ✅ only for single
      className={cn("w-full", className)}
      {...props}
    />
  );
}

// ✅ Accordion Item
function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

// ✅ Accordion Trigger
function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all " +
            "hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 " +
            "disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// ✅ Accordion Content
function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm transition-all " +
          "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
