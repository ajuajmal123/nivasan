const fs = require('fs');
const path = require('path');

const newProjectsForList = `
  {
    id: "meadows-vilankurichi",
    name: "Meadows",
    status: "Completed",
    tag: "2 & 3 BHK Apartments",
    image: "/completed/p8/image.png",
  },
  {
    id: "blue-heaven-1",
    name: "Blue Heaven 1",
    status: "Completed",
    tag: "Premium 2 BHK Apartments",
    image: "/completed/p9/image.png",
  },
  {
    id: "blue-heaven-2",
    name: "Blue Heaven 2",
    status: "Completed",
    tag: "Premium 2 BHK Apartments",
    image: "/completed/p10/image.png",
  },
  {
    id: "nivasana",
    name: "Nivasana",
    status: "Completed",
    tag: "Residential Apartments",
    image: "/completed/p11/image.png",
  },
  {
    id: "viveka-enclave",
    name: "Viveka Enclave",
    status: "Completed",
    tag: "Villas and Apartments",
    image: "/completed/p12/image.png",
  },
  {
    id: "meenakshi-vishranth",
    name: "Meenakshi Vishranth",
    status: "Completed",
    tag: "Residential Apartments",
    image: "/completed/p13/image.png",
  },
`;

const listFile = path.resolve('c:/WayoraEnterprices/nivasan/src/app/projects/ProjectsList.tsx');
let listContent = fs.readFileSync(listFile, 'utf8');

listContent = listContent.replace(
  '];',
  newProjectsForList + '];'
);
fs.writeFileSync(listFile, listContent, 'utf8');

const newDataForDetails = `
  "meadows-vilankurichi": {
    id: "meadows-vilankurichi",
    name: "Meadows",
    status: "Completed",
    location: "Vilankurichi Road, Coimbatore",
    aioSentence: "Meadows by Nivasan Homes is a completed residential apartment project located on Vilankurichi Road, Coimbatore.",
    description: "Meadows is a completed apartment community by Nivasan Homes on Vilankurichi Road, offering 2 and 3 BHK apartments across 8 apartment wings arranged around a large, lush central courtyard and landscaped green area. Units ranged from 1,435 to 1,800 sq.ft., with possession from October 2012.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzA1LjkiTiA3N8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: ["/completed/p8/image.png"],
    specs: [
      { label: "Type", value: "Apartments (2 & 3 BHK)" },
      { label: "Location", value: "Vilankurichi Road, Coimbatore" },
      { label: "Total Apartments", value: "72 Units (8 Blocks)" },
      { label: "Area Range", value: "1,435 – 1,800 sq.ft." },
      { label: "Possession", value: "2012" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Large Central Courtyard",
      "Landscaped Gardens",
      "Open Green Spaces Between Wings",
      "Paved Avenue / Walkways"
    ],
    locationAdvantages: [
      "Situated directly on Vilankurichi Road with strong connectivity across Coimbatore",
      "Close to established residential neighbourhoods, schools and hospitals",
      "Easy access to the Vilankurichi–Saravanampatti growth corridor"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010. With 10+ projects delivered and 500+ happy families housed, Nivasan Homes is a CREDAI-affiliated, fully RERA-registered developer known for customer-first values, eco-conscious design, uncompromising build quality, complete transparency, and a consistent record of on-time delivery."
    },
    metaTitle: "Meadows | Residential Apartments on Vilankurichi Road",
    metaDescription: "Completed residential apartment project by Nivasan Homes located on Vilankurichi Road, Coimbatore, offering 2 and 3 BHK apartments.",
    keywords: ["Meadows Nivasan Homes", "apartments Vilankurichi Road", "2 BHK 3 BHK apartments Coimbatore"]
  },
  "blue-heaven-1": {
    id: "blue-heaven-1",
    name: "Blue Heaven 1",
    status: "Completed",
    location: "Vilankurichi / Kalapatti, Coimbatore",
    aioSentence: "Blue Heaven 1 by Nivasan Homes is a completed residential apartment project in Vilankurichi, Coimbatore.",
    description: "Blue Heaven 1 is the first phase of the Blue Heaven apartment community by Nivasan Homes in Vilankurichi, Coimbatore, and was followed by the larger Blue Heaven 2 development in the same locality.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzA1LjkiTiA3N8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: ["/completed/p9/image.png"],
    specs: [
      { label: "Type", value: "12 Premium Apartments (2 BHK)" },
      { label: "Location", value: "Vilankurichi / Kalapatti, Coimbatore" },
      { label: "Floors", value: "4 Floors (Single Block)" },
      { label: "Possession", value: "July 2013" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "24-Hour Backup Electricity",
      "Intercom",
      "Gated Community with Security Personnel",
      "Gymnasium",
      "Landscaped Garden",
      "Children's Play Area",
      "Lift Access",
      "CCTV Surveillance",
      "Covered / Individual Car Parking",
      "Solar Water Heater",
      "Vitrified Flooring"
    ],
    locationAdvantages: [
      "Located in Vilankurichi, close proximity to Blue Heaven 2 and other Nivasan communities",
      "Good access to schools, hospitals and shopping in the Vilankurichi belt",
      "Well connected to Avinashi Road and the wider Coimbatore road network"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010."
    },
    metaTitle: "Blue Heaven 1 | Premium 2 BHK Apartments in Vilankurichi",
    metaDescription: "Completed premium 2 BHK apartment project by Nivasan Homes located in Vilankurichi, Coimbatore.",
    keywords: ["Blue Heaven 1", "apartments Vilankurichi", "2 BHK apartments Coimbatore"]
  },
  "blue-heaven-2": {
    id: "blue-heaven-2",
    name: "Blue Heaven 2",
    status: "Completed",
    location: "Vilankurichi / Kalapatti, Coimbatore",
    aioSentence: "Nivasan Blue Heaven 2 is an ultimate reflection of the urban chic lifestyle located in Kalapatti, Coimbatore.",
    description: "Nivasan Blue Heaven 2 is a completed 2 BHK apartment community by Nivasan Homes, spanning the Vilankurichi/Kalapatti belt of Coimbatore. Units range from 802 to 1,145 sq.ft. with possession from July 2014.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzA1LjkiTiA3N8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: ["/completed/p10/image.png"],
    specs: [
      { label: "Type", value: "16 Premium Apartments (2 BHK)" },
      { label: "Location", value: "Vilankurichi / Kalapatti, Coimbatore" },
      { label: "Floors", value: "4 Floors (Single Block)" },
      { label: "Area Range", value: "802 – 1,145 sq.ft." },
      { label: "Possession", value: "2014" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "24-Hour Backup Electricity",
      "Intercom",
      "Gated Community with Security Personnel",
      "Gymnasium",
      "Landscaped Garden",
      "Children's Play Area",
      "Lift Access",
      "CCTV Surveillance",
      "Covered / Individual Car Parking",
      "Solar Water Heater",
      "Vitrified Flooring"
    ],
    locationAdvantages: [
      "Located at Kalapatti/Vilankurichi — close to TIDEL Park, Codissia and the Coimbatore airport",
      "Near reputed schools, hospitals and shopping centres",
      "Well connected to Avinashi Road and the Saravanampatti IT corridor"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010."
    },
    metaTitle: "Blue Heaven 2 | Premium 2 BHK Apartments in Kalapatti",
    metaDescription: "Completed premium 2 BHK apartment project by Nivasan Homes located in Kalapatti, Coimbatore.",
    keywords: ["Blue Heaven 2", "apartments Kalapatti", "2 BHK apartments Coimbatore"]
  },
  "nivasana": {
    id: "nivasana",
    name: "Nivasana",
    status: "Completed",
    location: "PLS Nagar, Coimbatore",
    aioSentence: "Nivasana by Nivasan Homes is a completed residential apartment project located at PLS Nagar, Coimbatore.",
    description: "Nivasana is a completed apartment development by Nivasan Homes situated in PLS Nagar, Coimbatore, part of the brand's portfolio of family-focused residential communities in the city.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzA1LjkiTiA3N8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: ["/completed/p11/image.png"],
    specs: [
      { label: "Type", value: "8 Apartments" },
      { label: "Location", value: "PLS Nagar, Coimbatore" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [],
    locationAdvantages: [
      "Located in PLS Nagar, a residential pocket within Coimbatore",
      "Reasonable access to schools, hospitals and shopping centres",
      "Well connected to the wider Coimbatore road network"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010."
    },
    metaTitle: "Nivasana | Residential Apartments in PLS Nagar",
    metaDescription: "Completed residential apartment project by Nivasan Homes located in PLS Nagar, Coimbatore.",
    keywords: ["Nivasana", "apartments PLS Nagar", "residential apartments Coimbatore"]
  },
  "viveka-enclave": {
    id: "viveka-enclave",
    name: "Viveka Enclave",
    status: "Completed",
    location: "Vilankurichi, Coimbatore",
    aioSentence: "Viveka Enclave — distinguished by spaciousness. The villas at Viveka Enclave are set on 3.30 acres of land.",
    description: "Viveka Enclave is a completed villa community by Nivasan Homes on 3.30 acres in Vilankurichi, comprising only 41 exclusive 3 BHK villas ranging from roughly 2,418 to 2,596 sq.ft. Each villa offers a private garden and terrace, sufficient car space at the entrance, and a linear, free-flowing layout that allows residents to customise interior furniture and preserve privacy within the home. The project is just a few minutes' drive from Avinashi Road and the city's IT corridor at Saravanampatti.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzA1LjkiTiA3N8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: ["/completed/p12/image.png"],
    specs: [
      { label: "Type", value: "Villas and Apartments" },
      { label: "Location", value: "Vilankurichi, Coimbatore" },
      { label: "Total Units", value: "41 Villas and 16 Apartments" },
      { label: "Project Area", value: "3.30 Acres" },
      { label: "Possession", value: "August 2018" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [
      "Private Garden & Terrace for Every Villa",
      "24-Hour Backup Electricity - Genset",
      "CCTV Cameras",
      "Club House",
      "Swimming Pool",
      "Landscaped Park",
      "Dedicated Car Parking Space",
      "Free-Flowing Layout with Customisable Interiors"
    ],
    locationAdvantages: [
      "A few minutes' drive from Avinashi Road and the Saravanampatti IT corridor",
      "Tucked away from city noise and pollution while retaining urban convenience",
      "Set amid 3.30 acres of open, low-density green surroundings"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010."
    },
    metaTitle: "Viveka Enclave | Villas in Vilankurichi",
    metaDescription: "Viveka Enclave offers 41 exclusive 3 BHK villas in Vilankurichi, Coimbatore on 3.30 acres of green surroundings.",
    keywords: ["Viveka Enclave", "villas Vilankurichi", "luxury villas Coimbatore"]
  },
  "meenakshi-vishranth": {
    id: "meenakshi-vishranth",
    name: "Meenakshi Vishranth",
    status: "Completed",
    location: "Pari Nagar, Coimbatore",
    aioSentence: "Meenakshi Vishranth by Nivasan Homes is a completed residential apartment project located at Pari Nagar, Coimbatore.",
    description: "Meenakshi Vishranth is a completed apartment community by Nivasan Homes in Pari Nagar, Coimbatore, forming part of the brand's earlier portfolio of residential apartment developments in the city.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzA1LjkiTiA3N8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: ["/completed/p13/image.png"],
    specs: [
      { label: "Type", value: "16 Apartments" },
      { label: "Location", value: "Pari Nagar, Coimbatore" },
      { label: "Status", value: "Completed" }
    ],
    amenities: [],
    locationAdvantages: [
      "Located in Pari Nagar, a residential neighbourhood within Coimbatore",
      "Reasonable access to schools, hospitals and everyday conveniences",
      "Well connected to the wider Coimbatore road network"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010."
    },
    metaTitle: "Meenakshi Vishranth | Apartments in Pari Nagar",
    metaDescription: "Completed apartment community by Nivasan Homes in Pari Nagar, Coimbatore.",
    keywords: ["Meenakshi Vishranth", "apartments Pari Nagar", "residential apartments Coimbatore"]
  },
`;

const detailsFile = path.resolve('c:/WayoraEnterprices/nivasan/src/app/projects/[id]/page.tsx');
let detailsContent = fs.readFileSync(detailsFile, 'utf8');

const springsReplacement = `  "nivasan-springs": {
    id: "nivasan-springs",
    name: "Nivasan Springs",
    status: "Completed",
    location: "Gandhi Nagar, Vilankurichi, Coimbatore",
    aioSentence: "Nivasan Springs is a premium apartment development located in the prime residential area of Gandhi Nagar, Vilankurichi, Coimbatore.",
    description: "Nivasan Springs is a completed premium 2 BHK apartment community located in Gandhi Nagar, Vilankurichi, Coimbatore, close to schools, hospitals and shopping centres. It was designed for the lifestyle of emerging millennials, with exciting configurations that balance functional needs and lifestyle aspirations.\\n\\nThe project follows a futuristic design approach intended to promote a healthy neighbourhood while delivering high quality, comfort and safety. Premium specifications, finishes and fixtures are engineered throughout, culminating in an authentic contemporary structure — close to every convenience, yet private in every way.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1417086820515!2d77.0185984!3d11.0183141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzA1LjkiTiA3N8KwMDEnMDcuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    images: ["/completed/p7/image.png"],
    specs: [
      { label: "Type", value: "20 Premium Apartments (2 BHK)" },
      { label: "Location", value: "Gandhi Nagar, Vilankurichi, Coimbatore" },
      { label: "Blocks / Floors", value: "1 Block, 4 Floors" },
      { label: "Area Range", value: "712 – 898 sq.ft." },
      { label: "RERA No.", value: "TN/11/Building/182/2020" },
      { label: "Status", value: "Completed" },
      { label: "Structure", value: "Earthquake-Resistant RCC Frame" },
      { label: "Flooring", value: "Vitrified Tiles (2'x2')" },
      { label: "Kitchen", value: "Ceramic Tile Dado, Granite Counter" },
      { label: "Power Backup", value: "1 KW per Unit / 100% Common Areas" }
    ],
    amenities: [
      "Earthquake-Resistant RCC Framed Structure",
      "UPVC Windows with Provision for Exhaust Fans",
      "TV & A/C Points in Living Room and All Bedrooms",
      "Provision for Chimney / Hob / Water Purifier in Kitchen",
      "Provision for Geyser & Exhaust Fan in All Toilets",
      "Provision for Washing Machine in Utility Area",
      "6-Passenger Lift",
      "DG Power Backup for Common Areas & Individual Units",
      "Water Treatment Plant",
      "Landscaped Common Areas"
    ],
    locationAdvantages: [
      "Prime residential location in Gandhi Nagar, Vilankurichi",
      "Close proximity to schools, hospitals and shopping centres",
      "Tranquil setting while remaining well connected to the rest of Coimbatore"
    ],
    aboutDeveloper: {
      title: "About Nivasan Homes",
      content: "Nivasan Homes is one of Coimbatore's most trusted real estate developers, delivering premium villas and apartments since 2010."
    },
    metaTitle: "Nivasan Springs | Premium Apartments in Gandhi Nagar",
    metaDescription: "Completed premium residential apartments at Nivasan Springs in Gandhi Nagar, Vilankurichi, Coimbatore.",
    keywords: ["Nivasan Springs", "apartments in Vilankurichi Coimbatore", "premium flats Gandhi Nagar", "Nivasan Homes"]
  }`;

const springsRegex = /"nivasan-springs":\s*{[^{}]*(?:{[^{}]*}[^{}]*)*}/s;
detailsContent = detailsContent.replace(springsRegex, springsReplacement);

detailsContent = detailsContent.replace(
  'const projectsData: Record<string, ProjectDetails> = {',
  'const projectsData: Record<string, ProjectDetails> = {\n\n' + newDataForDetails
);

fs.writeFileSync(detailsFile, detailsContent, 'utf8');
console.log('Done mapping.');
