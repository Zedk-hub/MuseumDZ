export type Language = 'en' | 'ar' | 'fr';

export type Category = 'Archaeology' | 'Arts' | 'History' | 'Ethnography' | 'Natural History';

export interface Artifact {
  id: string;
  name: string;
  arabicName: string;
  frenchName?: string;
  imageUrl: string;
  description: string;
  arabicDescription: string;
  frenchDescription?: string;
  period: string;
  arabicPeriod?: string;
  frenchPeriod?: string;
}

export interface Museum {
  id: string;
  name: string;
  arabicName?: string;
  frenchName?: string;
  wilaya: string;
  arabicWilaya?: string;
  frenchWilaya?: string;
  category: Category;
  arabicCategory?: string;
  frenchCategory?: string;
  period?: string;
  arabicPeriod?: string;
  frenchPeriod?: string;
  description: string;
  arabicDescription?: string;
  frenchDescription?: string;
  imageUrl: string;
  gallery?: string[];
  openingHours: {
    open: string;
    close: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  visitors: number;
  ticketPrice?: {
    adult: number;
    student: number;
    child: number;
    currency: string;
  };
  phone?: string;
  mapLink?: string;
  photographyAllowed?: boolean;
  artifacts?: Artifact[];
}

export interface Era {
  id: string;
  year: string;
  arabicYear: string;
  frenchYear?: string;
  title: string;
  arabicTitle: string;
  frenchTitle?: string;
  description: string;
  arabicDescription: string;
  frenchDescription?: string;
  content?: string;
  arabicContent?: string;
  frenchContent?: string;
  image: string;
  color: string;
}

export interface Region {
  id: string;
  name: string;
  arabicName: string;
  museumCount: number;
}
