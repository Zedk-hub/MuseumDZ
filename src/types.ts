export type Language = 'en' | 'ar' | 'fr';

export type Category = 'Archaeology' | 'Arts' | 'History' | 'Ethnography' | 'Natural History';

export interface Artifact {
  id: string;
  name: string;
  arabicName: string;
  imageUrl: string;
  description: string;
  arabicDescription: string;
  period: string;
}

export interface Museum {
  id: string;
  name: string;
  arabicName?: string;
  wilaya: string;
  arabicWilaya?: string;
  category: Category;
  description: string;
  arabicDescription?: string;
  imageUrl: string;
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
  artifacts?: Artifact[];
}

export interface Region {
  id: string;
  name: string;
  arabicName: string;
  museumCount: number;
}
