import type { ImageMetadata } from 'astro';

import medicinskaFootvard from '../assets/images/services/medicinsk-fotvard.jpg';
import fotvardMedFriskvard from '../assets/images/services/fotvard-med-friskvard.jpg';
import nagelklippning from '../assets/images/services/nagelklippning.jpg';
import nageltrang from '../assets/images/services/nageltrang.jpg';

export interface Service {
    slug: string;
    title: string;
    desc: string;
    longDesc: string;
    heroImage: ImageMetadata;
    duration?: string;
}

export const services: Service[] = [
    {
        slug: 'medicinsk-fotvard',
        title: 'Medicinsk fotvård',
        desc: 'En skön och grundlig behandling för trötta eller välarbetade fötter – från fotbad till avslutande massage.',
        heroImage: medicinskaFootvard,
        duration: 'Ca 60 min',
        longDesc:
            'Medicinsk fotvård är en komplett behandling som börjar med ett skönt fotbad. Våra utbildade fotvårdare behandlar förhårdnader, sprickor, liktornar, vårtor och nageltrång med professionella verktyg och beprövade metoder. Behandlingen avslutas med en skön fotmassage. Vi har tystnadsplikt och följer Miljöverkets regler för hygien.'
    },
    {
        slug: 'fotvard-med-friskvard',
        title: 'Fotvård med friskvård',
        desc: 'Fotvård som räknas som friskvårdsförmån – perfekt för företagsfriskvård.',
        heroImage: fotvardMedFriskvard,
        duration: 'Ca 60 min',
        longDesc:
            'Denna behandling är momsbelagd och rekommenderas för företagsfriskvård. Behandlingen börjar med ett skönt fotbad, följt av klippning och slipning av naglar. Eventuella förhårdnader avlägsnas och behandlingen avslutas med en skön fotmassage. Enligt Skatteverkets regler kan arbetsgivare erbjuda detta som skattefri friskvårdsförmån.'
    },
    {
        slug: 'nagelklippning',
        title: 'Nagelklippning',
        desc: 'Professionell nagelklippning och nagelvård utförd av utbildade medicinska fotvårdare.',
        heroImage: nagelklippning,
        duration: 'Ca 30 min',
        longDesc:
            'Dina fötter är värdefulla och behöver tas hand om. För att dina fötter ska hålla livet ut gäller det att hålla nagelväxten på en rimlig längd. Långa naglar kan ge obehag och smärta. Vi utför professionell nagelklippning för stora som små på vår klinik i Borgholm. Massagen ingår inte i denna behandling.'
    },
    {
        slug: 'nageltrang',
        title: 'Nageltrång',
        desc: 'Behandling av nageltrång – när nageln växer in i huden och orsakar smärta.',
        heroImage: nageltrang,
        longDesc:
            'Nageltrång uppstår när nagelkanten växer in i huden, oftast på stortån. Det kan vara medfött eller uppstå efter en skada som gör att nageln växer snett in mot huden. Behandlingen innebär att den inväxta delen trimmas bort och nageln smalnas av för att förebygga återfall. Våra medicinska fotvårdare behandlar och förebygger ditt nageltrång. Massagen ingår inte i denna behandling.'
    }
];
