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
      "https://gym-connect-bucket.s3.us-east-1.amazonaws.com/img/satelites/PRCmini.jpg",
    location: "Pereira, Risaralda",
    instagram: "https://instagram.com/pereirarunningculture",
    productIds: ["17"],
  },
];
