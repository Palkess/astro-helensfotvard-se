import type { Service } from './services';

export const business = {
    name: 'Helens Fotvård',
    url: 'https://helensfotvard.se',
    schemaType: 'MedicalBusiness',
    description:
        'Medicinsk fotvård i Borgholm på Öland. Vi erbjuder medicinsk fotvård, fotvård med friskvård, nagelklippning och behandling av nageltrång.',
    owner: {
        name: 'Helen Andersson',
        title: 'Leg. medicinsk fotvårdare'
    },
    contact: {
        phoneRaw: '+46767676725',
        phoneDisplay: '076-76 76 725',
        emailHelen: 'helen@helensfotvard.se',
        emailJenny: 'jenny@helensfotvard.se',
        facebook: 'https://www.facebook.com/helensfotvard'
    },
    address: {
        street: 'Trädgårdsgatan 14',
        city: 'Borgholm',
        postalCode: '387 31',
        country: 'SE',
        display: 'Trädgårdsgatan 14, 387 31 Borgholm'
    }
} as const;

export type Business = typeof business;

const postalAddress = {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country
} as const;

/** Pre-built `provider` for any Service schema — used by tjanster/[slug].astro */
export const serviceProvider = {
    '@type': business.schemaType,
    name: business.name,
    url: business.url,
    address: postalAddress
} as const;

/** Builds the complete MedicalBusiness JSON-LD for the home page */
export function buildLocalBusinessSchema(services: Service[]) {
    return {
        '@context': 'https://schema.org',
        '@type': business.schemaType,
        name: business.name,
        description: business.description,
        url: business.url,
        telephone: business.contact.phoneRaw,
        email: business.contact.emailHelen,
        address: postalAddress,
        areaServed: { '@type': 'City', name: business.address.city },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Fotvårdstjänster',
            itemListElement: services.map((s) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: s.title,
                    description: s.desc,
                    url: `${business.url}/tjanster/${s.slug}`
                }
            }))
        },
        sameAs: [business.contact.facebook]
    };
}
