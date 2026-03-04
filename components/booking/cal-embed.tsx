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
        styles: {
          branding: { brandColor: "#A0845C" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      calLink={`${username}/${calLink}`}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
      className={className}
    />
  );
}
