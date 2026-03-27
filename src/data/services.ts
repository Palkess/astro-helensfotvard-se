import type { ImageMetadata } from 'astro';

import medicinskaFootvard from '../assets/images/services/medicinsk-fotvard.jpg';
import fotvardMedFriskvard from '../assets/images/services/fotvard-med-friskvard.jpg';
import nagelklippning from '../assets/images/services/nagelklippning.jpg';
import nageltrang from '../assets/images/services/nageltrang.jpg';

export interface Faq {
    q: string;
    a: string;
}

export interface Service {
    slug: string;
    title: string;
    desc: string;
    longDesc: string;
    heroImage: ImageMetadata;
    faq?: Faq[];
}

export const services: Service[] = [
    {
        slug: 'medicinsk-fotvard',
        title: 'Medicinsk fotvård',
        desc: 'En skön och grundlig behandling för trötta eller välarbetade fötter – från fotbad till avslutande massage.',
        heroImage: medicinskaFootvard,
        longDesc:
            'Medicinsk fotvård är en komplett behandling som börjar med ett skönt fotbad. Våra utbildade fotvårdare behandlar förhårdnader, sprickor, liktornar, vårtor och nageltrång med professionella verktyg och beprövade metoder. Behandlingen avslutas med en skön fotmassage. Vi har tystnadsplikt och följer Miljöverkets regler för hygien.',
        faq: [
            {
                q: 'Varför behöver jag medicinsk fotvård?',
                a: 'Fötterna bär hela kroppens vikt varje dag och är ofta det vi tar minst hand om. Medicinsk fotvård förebygger och behandlar vanliga problem som förhårdnader, sprickor, nageltrång och vårtor – problem som kan ge smärta och påverka hela kroppshållningen om de inte tas om hand i tid.'
            },
            {
                q: 'Vad ingår i en medicinsk fotvårdsbehandling?',
                a: 'Behandlingen inleds med ett skönt fotbad, följt av professionell behandling av förhårdnader, sprickor, liktornar, vårtor och nageltrång. Naglarna klipps och formas, och behandlingen avslutas med en avslappnande fotmassage.'
            },
            {
                q: 'Hur ofta bör jag boka en behandling?',
                a: 'För de flesta rekommenderas ett besök var 8-10 vecka, men det varierar beroende på dina behov. Har du specifika besvär som nageltrång, diabetes eller nedsatt känsel kan tätare besök vara aktuellt.'
            },
            {
                q: 'Hur förbereder jag mig inför besöket?',
                a: 'Du behöver inte förbereda dig på något särskilt sätt. Kom gärna med rena fötter. Undvik att klippa naglarna dagen innan om du vill att vi ska ta hand om dem under behandlingen.'
            }
        ]
    },
    {
        slug: 'fotvard-med-friskvard',
        title: 'Fotvård med friskvård',
        desc: 'Fotvård som räknas som friskvårdsförmån – perfekt för företagsfriskvård.',
        heroImage: fotvardMedFriskvard,
        longDesc:
            'Denna behandling är momsbelagd och rekommenderas för företagsfriskvård. Behandlingen börjar med ett skönt fotbad, följt av klippning och slipning av naglar. Eventuella förhårdnader avlägsnas och behandlingen avslutas med en skön fotmassage. Enligt Skatteverkets regler kan arbetsgivare erbjuda detta som skattefri friskvårdsförmån.',
        faq: [
            {
                q: 'Vad är friskvårdsförmån?',
                a: 'Friskvårdsförmån är en skattefri förmån som arbetsgivare kan erbjuda sina anställda för aktiviteter och behandlingar som främjar hälsa. Fotvård klassas av Skatteverket som en godkänd friskvårdsaktivitet och kan bekostas av arbetsgivaren upp till ett visst belopp per år.'
            },
            {
                q: 'Vad skiljer fotvård med friskvård från medicinsk fotvård?',
                a: 'Innehållet i behandlingen är detsamma – fotbad, nagelklippning, borttagning av förhårdnader och en avslutande fotmassage. Skillnaden är administrativ: fotvård med friskvård faktureras med moms och lämpar sig för arbetsgivare som betalar via friskvårdsförmån.'
            },
            {
                q: 'Hur gör jag för att nyttja min friskvårdsförmån?',
                a: 'Kontakta oss för att boka din tid. Vi utfärdar ett kvitto som du sedan lämnar in till din arbetsgivare eller nyttjar via ditt friskvårdskort, beroende på hur din arbetsgivare hanterar förmånen.'
            }
        ]
    },
    {
        slug: 'nagelklippning',
        title: 'Nagelklippning',
        desc: 'Professionell nagelklippning och nagelvård utförd av utbildade medicinska fotvårdare.',
        heroImage: nagelklippning,
        longDesc:
            'Dina fötter är värdefulla och behöver tas hand om. För att dina fötter ska hålla livet ut gäller det att hålla nagelväxten på en rimlig längd. Långa naglar kan ge obehag och smärta. Vi utför professionell nagelklippning för stora som små på vår klinik i Borgholm. Massagen ingår inte i denna behandling.',
        faq: [
            {
                q: 'Varför anlita en fotvårdare för nagelklippning?',
                a: 'Professionell nagelklippning med rätt verktyg och teknik minskar risken för nageltrång, sprickor och smärta. Det är särskilt viktigt för äldre, diabetiker och personer med nedsatt känsel eller rörlighet som har svårt att nå sina fötter.'
            },
            {
                q: 'Ingår fotmassage i nagelklippning?',
                a: 'Nej, fotmassage ingår inte i nagelklippning. Väljer du istället medicinsk fotvård (ca 60 min) ingår ett fotbad och avslutande massage i behandlingen.'
            },
            {
                q: 'Hur korta klipps naglarna?',
                a: 'Vi anpassar klippningen efter dina önskemål och vad som är medicinskt lämpligt. Generellt klipps naglarna rakt och inte för korta för att förebygga nageltrång och smärta.'
            }
        ]
    },
    {
        slug: 'nageltrang',
        title: 'Nageltrång',
        desc: 'Behandling av nageltrång – när nageln växer in i huden och orsakar smärta.',
        heroImage: nageltrang,
        longDesc:
            'Nageltrång uppstår när nagelkanten växer in i huden, oftast på stortån. Det kan vara medfött eller uppstå efter en skada som gör att nageln växer snett in mot huden. Behandlingen innebär att den inväxta delen trimmas bort och nageln smalnas av för att förebygga återfall. Våra medicinska fotvårdare behandlar och förebygger ditt nageltrång. Massagen ingår inte i denna behandling.',
        faq: [
            {
                q: 'Hur vet jag om jag har nageltrång?',
                a: 'Nageltrång kännetecknas av smärta, rodnad och svullnad längs nagelkanten, oftast på stortån. I mer allvarliga fall kan det bli infekterat. Om du är osäker, kontakta oss så hjälper vi dig att bedöma tillståndet.'
            },
            {
                q: 'Kan nageltrång komma tillbaka?',
                a: 'Ja, nageltrång kan återkomma om den bakomliggande orsaken inte åtgärdas. Vi smalar av nageln och ger råd om hur du kan förebygga återfall – till exempel genom korrekt nagelklippningsteknik och lämpliga skor.'
            },
            {
                q: 'Är behandlingen smärtsam?',
                a: 'De flesta upplever behandlingen som obehaglig men hanterbar. Vi arbetar varsamt och använder professionella verktyg för att göra ingreppet så skonsamt som möjligt.'
            }
        ]
    }
];
