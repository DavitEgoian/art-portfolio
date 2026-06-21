const LOGO_BASE = `${process.env.PUBLIC_URL}/org-logos`;

export const ORGANIZATION_LOGOS = {
  "Windfors Workshops": `${LOGO_BASE}/windfors.png`,
  Windfors: `${LOGO_BASE}/windfors.png`,
};

export function getOrganizationLogo(organization) {
  if (!organization) return null;
  return ORGANIZATION_LOGOS[organization] || null;
}
