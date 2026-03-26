// Prices in Iraqi Dinar (IQD) - approximately 1 USD = 1,300 IQD
export const products = [
  {
    id: 1,
    name: "روج ماط طويل الأمد",
    brand: "GrayHut",
    price: 45000,
    originalPrice: 58500,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
    category: "makeup",
    type: "lipstick",
    description: "روج ماط فاخر يدوم حتى 24 ساعة مع لون غني",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 2,
    name: "ماسكارا حجم مضاعف",
    brand: "GrayHut",
    price: 35000,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&q=80",
    category: "makeup",
    type: "mascara",
    description: "ماسكارا تمنحك رموشاً كثيفة ومظهراً درامياً",
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: 3,
    name: "كريم مرطب لليدين",
    brand: "GrayHut",
    price: 25000,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    category: "skincare",
    type: "moisturizer",
    description: "كريم مرطب غني بحليب الغنم وزبدة الشيا",
    inStock: true,
    isFeatured: false,
    isNew: false
  },
  {
    id: 4,
    name: "عطر أوود ملكي",
    brand: "GrayHut",
    price: 125000,
    originalPrice: 156000,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    category: "fragrance",
    type: "perfume",
    description: "عطر فاخر برائحة أوود عربية أصيلة",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 5,
    name: "شامبو بروتين الحرير",
    brand: "GrayHut",
    price: 18000,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80",
    category: "hair",
    type: "shampoo",
    description: "شامبو غني بالبروتينات لعلاج الشعر التالف",
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: 6,
    name: "سيروم فيتامين سي",
    brand: "GrayHut",
    price: 65000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    category: "skincare",
    type: "serum",
    description: "سيروم مشرق للبشرة بفيتامين سي المركز",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 7,
    name: "باليت ظلال العيون",
    brand: "GrayHut",
    price: 75000,
    originalPrice: 91000,
    image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&q=80",
    category: "makeup",
    type: "eyeshadow",
    description: "باليت ظلال عيون بـ 12 درجة من الألوان النude",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 8,
    name: "بودرة ثابتة للوجه",
    brand: "GrayHut",
    price: 38000,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    category: "makeup",
    type: "foundation",
    description: "بودرة ثابتة تمنحك مظهراً ماتٍ مثالياً",
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: 9,
    name: "زيت الشعر المغذي",
    brand: "GrayHut",
    price: 28000,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    category: "hair",
    type: "oil",
    description: "زيت مغذي للعناية بالشعر الجاف والتالف",
    inStock: true,
    isFeatured: false,
    isNew: false
  },
  {
    id: 10,
    name: "عطر فلورالة باريس",
    brand: "GrayHut",
    price: 95000,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    category: "fragrance",
    type: "perfume",
    description: "عطر أنثوي برائحة زهربية فرنسية كلاسيكية",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 11,
    name: "كريم واقي من الشمس",
    brand: "GrayHut",
    price: 42000,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    category: "skincare",
    type: "sunscreen",
    description: "كريم واقي SPF 50 لحماية البشرة من الشمس",
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: 12,
    name: "مزيل عرق ستارك",
    brand: "GrayHut",
    price: 15000,
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&q=80",
    category: "body",
    type: "deodorant",
    description: "مزيل عرق يدوم 48 ساعة برائحة منعشة",
    inStock: true,
    isFeatured: false,
    isNew: false
  }
];

export const categories = [
  {
    id: 1,
    name: "المكياج",
    nameEn: "Makeup",
    slug: "makeup",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    description: "روج، ظلال عيون، ماسكارا والمزيد"
  },
  {
    id: 2,
    name: "العناية بالبشرة",
    nameEn: "Skincare",
    slug: "skincare",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=800&q=80",
    description: "مرطبات، سيرومات، واقيات شمس"
  },
  {
    id: 3,
    name: "العناية بالشعر",
    nameEn: "Hair Care",
    slug: "hair",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80",
    description: "شامبو، بلسم، زيت للشعر"
  },
  {
    id: 4,
    name: "العطور",
    nameEn: "Fragrance",
    slug: "fragrance",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    description: "عطور فاخرة وأوود عربية"
  },
  {
    id: 5,
    name: "العناية بالجسم",
    nameEn: "Body Care",
    slug: "body",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
    description: "مزيلات عرق، لوشن الجسم"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "سارة محمد",
    title: "مهندسة، بغداد",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "منتجات GrayHut ممتازة! كريم المرطب غيّر بشرتي تماماً. أنصح بها الجميع."
  },
  {
    id: 2,
    name: "أحمد خليل",
    title: "صيدلي، البصرة",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    text: "عطر الأوود الملكي لا يُقاوم. رائحة فاخرة تدوم طويلاً. أفضل عطر استخدمته."
  },
  {
    id: 3,
    name: "نور الدين",
    title: "رائد أعمال، أربيل",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "خدمة ممتازة ومنتجات أصلية 100%. الشحن كان سريعاً أيضاً. شكراً GrayHut!"
  },
  {
    id: 4,
    name: "زينب العلي",
    title: "طبيبة، النجف",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    rating: 5,
    text: "باليت الظلال رائع والألوان很漂亮. مكياجي الآن يبدو احترافياً!"
  }
];

export const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 7);
