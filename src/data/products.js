export const products = [
  {
    id: 1,
    name: "Midnight Noir",
    brand: "NOIR ESSENCE",
    price: 295,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    category: "luxury",
    gender: "unisex",
    notes: {
      top: "Bergamot, Black Pepper",
      middle: "Oud, Rose Absolute",
      base: "Amber, Musk, Vanilla"
    },
    description: "A mysterious blend that captures the essence of midnight. Rich oud meets romantic rose, creating an unforgettable signature.",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 2,
    name: "Velvet Orchid",
    brand: "NOIR ESSENCE",
    price: 245,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
    category: "women",
    gender: "female",
    notes: {
      top: "Pink Pepper, Lychee",
      middle: "Turkish Rose, Peony",
      base: "Patchouli, White Musk"
    },
    description: "An elegant floral bouquet wrapped in sensual warmth. Perfect for the woman who commands attention effortlessly.",
    inStock: true,
    isFeatured: true,
    isNew: true
  },
  {
    id: 3,
    name: "Royal Oud",
    brand: "NOIR ESSENCE",
    price: 450,
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
    category: "arabian",
    gender: "male",
    notes: {
      top: "Saffron, Cardamom",
      middle: "Rare Oud, Sandalwood",
      base: "Amber, Leather"
    },
    description: "A masterpiece of Arabian perfumery. Rare oud wood aged to perfection, reserved for royalty.",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 4,
    name: "Citrus Dynasty",
    brand: "NOIR ESSENCE",
    price: 195,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    category: "luxury",
    gender: "male",
    notes: {
      top: "Lemon, Grapefruit, Bergamot",
      middle: "Neroli, Orange Blossom",
      base: "White Cedar, Sheer Musk"
    },
    description: "Fresh Mediterranean citrus elevated to regal heights. A sophisticated daytime scent for the modern gentleman.",
    inStock: true,
    isFeatured: false,
    isNew: true
  },
  {
    id: 5,
    name: "Crimson Rose",
    brand: "NOIR ESSENCE",
    price: 275,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
    category: "women",
    gender: "female",
    notes: {
      top: "Raspberry, Pepper",
      middle: "Damascus Rose, Peony",
      base: "Patchouli, Soft Woods"
    },
    description: "A passionate embrace of Bulgarian roses. Deep, intoxicating, and utterly unforgettable.",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 6,
    name: "Desert Storm",
    brand: "NOIR ESSENCE",
    price: 320,
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&q=80",
    category: "arabian",
    gender: "unisex",
    notes: {
      top: "Cardamom, Ginger",
      middle: "Agarwood, Incense",
      base: "Sandalwood, Benzoin"
    },
    description: "The spirit of Arabian nights captured in a bottle. Mysterious, warm, and utterly magnetic.",
    inStock: true,
    isFeatured: false,
    isNew: false
  },
  {
    id: 7,
    name: "Silk & Smoke",
    brand: "NOIR ESSENCE",
    price: 285,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80",
    category: "luxury",
    gender: "unisex",
    notes: {
      top: "Whiskey, Saffron",
      middle: "Iris, Tobacco",
      base: "Leather, Myrrh"
    },
    description: "An opulent dance of smoky iris and aged leather. For those who appreciate the finer things.",
    inStock: true,
    isFeatured: true,
    isNew: false
  },
  {
    id: 8,
    name: "Golden Elixir",
    brand: "NOIR ESSENCE",
    price: 395,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
    category: "luxury",
    gender: "unisex",
    notes: {
      top: "Mandarin, Frankincense",
      middle: "Jasmine, Ylang Ylang",
      base: "Vanilla, Gold Amber"
    },
    description: "Liquid gold for the skin. A radiant blend that exudes wealth and sophistication.",
    inStock: true,
    isFeatured: false,
    isNew: true
  }
];

export const categories = [
  {
    id: 1,
    name: "For Him",
    slug: "men",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    description: "Bold, distinctive scents"
  },
  {
    id: 2,
    name: "For Her",
    slug: "women",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    description: "Elegant, captivating fragrances"
  },
  {
    id: 3,
    name: "Unisex",
    slug: "unisex",
    image: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=800&q=80",
    description: "Beyond boundaries"
  },
  {
    id: 4,
    name: "Arabian",
    slug: "arabian",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=80",
    description: "Rare oud & incense"
  },
  {
    id: 5,
    name: "Luxury Exclusive",
    slug: "luxury",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80",
    description: "Limited editions"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Alexandra Sterling",
    title: "Fashion Editor, Vogue",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "NOIR ESSENCE has completely transformed my perception of luxury fragrances. The Velvet Orchid is my signature scent now - absolutely intoxicating."
  },
  {
    id: 2,
    name: "James Chen",
    title: "CEO, Meridian Holdings",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    text: "The Royal Oud is unparalleled in its complexity and longevity. I receive compliments every single time I wear it. Worth every penny."
  },
  {
    id: 3,
    name: "Isabella Martinez",
    title: "Luxury Lifestyle Influencer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "From the elegant packaging to the exquisite scent, everything about NOIR ESSENCE screams luxury. Their Midnight Noir is simply divine."
  },
  {
    id: 4,
    name: "Victoria Laurent",
    title: "Creative Director",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    rating: 5,
    text: "I've worn luxury perfumes my entire adult life. NOIR ESSENCE surpasses many of the prestigious houses I once favored. Exquisite quality."
  }
];

export const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 7);
