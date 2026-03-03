export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterNav {
  treatments: NavItem[];
  info: NavItem[];
  contact: NavItem[];
  legal: NavItem[];
}

export interface SiteConfig {
  businessName?: string;
  name?: string;
  tagline?: string;
  subtitle?: string;
  description?: string;
  heroTitle?: string;
  heroDescription?: string;
  contact: {
    address?:
      | string
      | {
          street?: string;
          postalCode?: string;
          city?: string;
          country?: string;
          full?: string;
        };
    phone: string;
    email: string;
  };
  hours?: {
    weekdays?: string;
    saturday?: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  trustItems?: Array<string | { label?: string; value?: string }>;
}
