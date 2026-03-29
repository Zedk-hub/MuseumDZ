import { Museum } from '../types';

export const museums: Museum[] = [
  {
    id: '1',
    name: 'National Museum of Bardo',
    arabicName: 'المتحف الوطني باردو',
    wilaya: 'Algiers',
    arabicWilaya: 'الجزائر العاصمة',
    category: 'History',
    description: 'Housed in a magnificent 18th-century Ottoman palace, the Bardo Museum is a sanctuary of Algerian prehistory and ethnography. Its intricate Moorish architecture, lush courtyards, and world-class collections offer a profound journey through the nation\'s diverse cultural tapestry.',
    arabicDescription: 'يقع في قصر عثماني رائع من القرن الثامن عشر، ويعتبر متحف باردو ملاذاً لما قبل التاريخ والإثنوغرافيا الجزائرية. القصر نفسه هو تحفة معمارية متوسطية.',
    imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1600',
    openingHours: { open: '09:00', close: '17:00' },
    location: { lat: 36.7538, lng: 3.0488 },
    rating: 4.9,
    visitors: 125000,
    ticketPrice: { adult: 200, student: 100, child: 50, currency: 'DZD' },
    artifacts: [
      {
        id: 'a1',
        name: 'Traditional Kabyle Jewelry',
        arabicName: 'الحلي القبائلية التقليدية',
        imageUrl: 'https://images.unsplash.com/photo-1535633302743-20926dfa2b40?auto=format&fit=crop&q=80&w=800',
        description: 'Exquisite silver jewelry with coral and enamel, representing the rich Berber heritage of the Kabylie region.',
        arabicDescription: 'حلي فضية رائعة مرصعة بالمرجان والمينا، تمثل التراث الأمازيغي الغني لمنطقة القبائل.',
        period: '19th Century'
      }
    ]
  },
  {
    id: '2',
    name: 'National Museum of Fine Arts',
    arabicName: 'المتحف الوطني للفنون الجميلة',
    wilaya: 'Algiers',
    arabicWilaya: 'الجزائر العاصمة',
    category: 'Arts',
    description: 'The largest art museum in the Maghreb and Africa, overlooking the iconic Jardin d\'Essai du Hamma. Its galleries boast an extensive collection of European and Algerian masterpieces.',
    arabicDescription: 'أكبر متحف فني في المغرب العربي وأفريقيا، يطل على حديقة التجارب الشهيرة بالحامة. تضم أروقته مجموعة واسعة من الروائع الأوروبية والجزائرية.',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1600',
    openingHours: { open: '10:00', close: '18:00' },
    location: { lat: 36.7461, lng: 3.0601 },
    rating: 4.8,
    visitors: 150000,
    ticketPrice: { adult: 300, student: 150, child: 100, currency: 'DZD' },
    artifacts: [
      {
        id: 'a5',
        name: 'The Algerian Miniature',
        arabicName: 'المنمنمات الجزائرية',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800',
        description: 'Masterpieces by Mohammed Racim, who revived the art of Persian and Mughal miniatures with Algerian themes.',
        arabicDescription: 'روائع محمد راسم، الذي أحيا فن المنمنمات الفارسية والمغولية بمواضيع جزائرية.',
        period: '20th Century'
      }
    ]
  },
  {
    id: '3',
    name: 'Tipaza Archaeological Park',
    arabicName: 'الحديقة الأثرية بتيبازة',
    wilaya: 'Tipaza',
    arabicWilaya: 'تيبازة',
    category: 'Archaeology',
    description: 'A UNESCO World Heritage site where ancient Roman ruins meet the turquoise Mediterranean. Features remarkably preserved basilicas, theaters, and villas.',
    arabicDescription: 'موقع تراث عالمي لليونسكو حيث تلتقي الأطلال الرومانية القديمة بالبحر الأبيض المتوسط الفيروزي. يتميز هذا المنتزه الأثري المترامي الأطراف بكنائس ومسارح وفيلات محفوظة بشكل رائع.',
    imageUrl: 'https://images.unsplash.com/photo-1505015920881-0f83c2f7c95e?auto=format&fit=crop&q=80&w=1600',
    openingHours: { open: '08:00', close: '18:00' },
    location: { lat: 36.5942, lng: 2.4430 },
    rating: 4.9,
    visitors: 250000,
    ticketPrice: { adult: 150, student: 80, child: 40, currency: 'DZD' },
    artifacts: [
      {
        id: 'a3',
        name: 'Roman Mosaic of the Ten Martyrs',
        arabicName: 'فسيفساء الشهداء العشرة الرومانية',
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800',
        description: 'A beautifully preserved mosaic floor from the Great Basilica of Tipaza, depicting early Christian symbolism.',
        arabicDescription: 'أرضية فسيفساء محفوظة بشكل جميل من كنيسة تيبازة الكبرى، تصور الرمزية المسيحية المبكرة.',
        period: '4th Century AD'
      }
    ]
  },
  {
    id: '4',
    name: 'National Museum of Cirta',
    arabicName: 'المتحف الوطني سيرتا',
    wilaya: 'Constantine',
    arabicWilaya: 'قسنطينة',
    category: 'Archaeology',
    description: 'Perched in the "City of Bridges," the Cirta Museum is one of Algeria\'s oldest and most prestigious institutions. It houses an extraordinary collection of Numidian, Roman, and Islamic artifacts.',
    arabicDescription: 'يقع في "مدينة الجسور"، ويعد متحف سيرتا أحد أقدم وأعرق المؤسسات في الجزائر. يضم مجموعة استثنائية من الآثار النوميدية والرومانية والإسلامية.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1600',
    openingHours: { open: '09:00', close: '16:30' },
    location: { lat: 36.3650, lng: 6.6147 },
    rating: 4.8,
    visitors: 89000,
    ticketPrice: { adult: 200, student: 100, child: 50, currency: 'DZD' },
    artifacts: [
      {
        id: 'a4',
        name: 'Numidian Silver Drachma',
        arabicName: 'دراخما فضية نوميدية',
        imageUrl: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=800',
        description: 'A rare coin from the reign of King Juba II, showcasing the advanced Numidian economy.',
        arabicDescription: 'عملة نادرة من عهد الملك يوبا الثاني، تظهر الاقتصاد النوميدي المتقدم والتأثير الفني.',
        period: '1st Century BC'
      }
    ]
  },
  {
    id: '5',
    name: 'National Museum of Mujahid',
    arabicName: 'المتحف الوطني للمجاهد',
    wilaya: 'Algiers',
    arabicWilaya: 'الجزائر العاصمة',
    category: 'History',
    description: 'Located under the Maqam Echahid monument, this museum preserves the memory of the Algerian struggle for independence with over 50,000 artifacts.',
    arabicDescription: 'يقع تحت نصب مقام الشهيد، ويحفظ هذا المتحف ذاكرة النضال الجزائري من أجل الاستقلال مع أكثر من 50,000 قطعة أثرية.',
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=1200',
    openingHours: { open: '09:00', close: '17:00' },
    location: { lat: 36.7458, lng: 3.0597 },
    rating: 4.9,
    visitors: 320000,
    ticketPrice: { adult: 100, student: 50, child: 20, currency: 'DZD' },
    artifacts: [
      {
        id: 'a10',
        name: 'Revolutionary Flag',
        arabicName: 'علم الثورة',
        imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800',
        description: 'An original flag used during the 1st of November 1954 operations.',
        arabicDescription: 'علم أصلي استخدم خلال عمليات الأول من نوفمبر 1954.',
        period: '1954'
      }
    ]
  },
  {
    id: '6',
    name: 'Timgad Archaeological Museum',
    arabicName: 'متحف تيمقاد الأثري',
    wilaya: 'Batna',
    arabicWilaya: 'باتنة',
    category: 'Archaeology',
    description: 'Timgad, the "Pompeii of Africa," features a museum with one of the most beautiful collections of Roman mosaics in the world.',
    arabicDescription: 'تيمقاد، "بومبي أفريقيا"، تضم متحفاً يحتوي على واحدة من أجمل مجموعات الفسيفساء الرومانية في العالم.',
    imageUrl: 'https://images.unsplash.com/photo-1599733589046-9b8308b5b50d?auto=format&fit=crop&q=80&w=1600',
    openingHours: { open: '08:30', close: '17:30' },
    location: { lat: 35.4851, lng: 6.4674 },
    rating: 4.9,
    visitors: 180000,
    ticketPrice: { adult: 150, student: 80, child: 40, currency: 'DZD' },
    artifacts: [
      {
        id: 'a11',
        name: 'Mosaic of Neptune',
        arabicName: 'فسيفساء نبتون',
        imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800',
        description: 'A massive, detailed mosaic depicting the Roman god of the sea.',
        arabicDescription: 'فسيفساء ضخمة ومفصلة تصور إله البحر الروماني.',
        period: '3rd Century AD'
      }
    ]
  },
  {
    id: '7',
    name: 'National Museum of Cherchell',
    arabicName: 'المتحف الوطني لشرشال',
    wilaya: 'Tipaza',
    arabicWilaya: 'تيبازة',
    category: 'Archaeology',
    description: 'Cherchell, the ancient Caesarea of Mauretania, houses a museum with exceptional Roman sculptures, including the famous Apollo of Cherchell.',
    arabicDescription: 'شرشال، قيصرية موريتانيا القديمة، تضم متحفاً يحتوي على منحوتات رومانية استثنائية، بما في ذلك تمثال أبولو الشهير.',
    imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1600',
    openingHours: { open: '09:00', close: '16:00' },
    location: { lat: 36.6067, lng: 2.1833 },
    rating: 4.8,
    visitors: 95000,
    ticketPrice: { adult: 200, student: 100, child: 50, currency: 'DZD' },
    artifacts: [
      {
        id: 'a12',
        name: 'Apollo of Cherchell',
        arabicName: 'أبولو شرشال',
        imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=800',
        description: 'A magnificent Roman marble statue of the god Apollo.',
        arabicDescription: 'تمثال روماني رائع من الرخام للإله أبولو.',
        period: '2nd Century AD'
      }
    ]
  },
  {
    id: '8',
    name: 'Guelma Archaeological Museum',
    arabicName: 'متحف قالمة الأثري',
    wilaya: 'Guelma',
    arabicWilaya: 'قالمة',
    category: 'Archaeology',
    description: 'Located within the ancient Roman theater of Guelma, this museum showcases a rich collection of Roman artifacts from the region.',
    arabicDescription: 'يقع داخل المسرح الروماني القديم في قالمة، ويعرض هذا المتحف مجموعة غنية من الآثار الرومانية من المنطقة.',
    imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1600',
    openingHours: { open: '08:00', close: '17:00' },
    location: { lat: 36.4621, lng: 7.4261 },
    rating: 4.7,
    visitors: 65000,
    ticketPrice: { adult: 100, student: 50, child: 20, currency: 'DZD' },
    artifacts: [
      {
        id: 'a13',
        name: 'Roman Theatre Statue',
        arabicName: 'تمثال المسرح الروماني',
        imageUrl: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=800',
        description: 'A statue found during the excavation of the Roman theater.',
        arabicDescription: 'تمثال تم العثور عليه أثناء التنقيب في المسرح الروماني.',
        period: '2nd Century AD'
      }
    ]
  }
];

export const regions = [
  { id: 'north', name: 'North', arabicName: 'الشمال', museumCount: 45 },
  { id: 'east', name: 'East', arabicName: 'الشرق', museumCount: 28 },
  { id: 'west', name: 'West', arabicName: 'الغرب', museumCount: 22 },
  { id: 'south', name: 'South', arabicName: 'الجنوب', museumCount: 12 },
];
