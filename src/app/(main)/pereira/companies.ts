export interface LocalCompany {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  location: string;
  instagram?: string;
  productIds: string[];
}

export const LOCAL_COMPANIES: LocalCompany[] = [
  {
    id: "pereira-running-culture",
    name: "Pereira Running Culture",
    tagline: "Comunidad de corredores",
    description:
      "Un colectivo de runners pereiranos que impulsa la cultura del running en la ciudad con entrenamientos, comunidad y productos pensados para quienes viven corriendo.",
    image:
      "https://images.unsplash.com/photo-1502224562085-639556652f33?w=1200",
    location: "Pereira, Risaralda",
    instagram: "https://instagram.com/pereirarunningculture",
    productIds: ["17"],
  },
];
