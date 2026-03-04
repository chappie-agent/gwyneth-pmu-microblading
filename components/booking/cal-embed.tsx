// components/booking/cal-embed.tsx
"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalEmbedProps {
  /** Cal.com event type slug, e.g. "microblading" */
  calLink: string;
  className?: string;
}

export function CalEmbed({ calLink, className }: CalEmbedProps) {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? "elwyndeneve";

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#A0845C",
            "cal-brand-emphasis": "#8A7045",
            "cal-brand-text": "#FFFFFF",
          },
          dark: {
            "cal-brand": "#B89B6E",
            "cal-brand-emphasis": "#A0845C",
            "cal-brand-text": "#FFFFFF",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  // If calLink looks like an event type slug, construct full path;
  // otherwise just use the username to show all event types
  const fullCalLink = calLink ? `${username}/${calLink}` : username;

  return (
    <Cal
      calLink={fullCalLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
      className={className}
    />
  );
}
