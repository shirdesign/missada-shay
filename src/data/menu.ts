import { MenuItem, BreadChoice, CookingLevel, Extra } from '../types'

export const MENU_ITEMS: MenuItem[] = [
  // Burgers
  {
    id: 'b1', name: 'המבורגר קלאסי', category: 'burgers',
    description: 'קציצת בקר 220 גרם, חסה, עגבנייה, בצל סגול, חמוצים ורוטב הבית.',
    price: 59, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    bestseller: true, customizable: true,
  },
  {
    id: 'b2', name: "צ'יזבורגר", category: 'burgers',
    description: "המבורגר בקר עם גבינת צ'דר מותכת וירקות טריים.",
    price: 64, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
    bestseller: true, customizable: true,
  },
  {
    id: 'b3', name: 'דאבל בורגר', category: 'burgers',
    description: "שתי קציצות בקר, גבינת צ'דר כפולה ורטב הבית.",
    price: 79, image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80',
    featured: true, customizable: true,
  },
  {
    id: 'b4', name: 'BBQ Smoke', category: 'burgers',
    description: 'המבורגר בקר, בצל מקורמל, רוטב ברביקיו ובייקון בקר.',
    price: 72, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80',
    featured: true, customizable: true,
  },
  {
    id: 'b5', name: 'ספייסי מקס', category: 'burgers',
    description: "המבורגר חריף עם חלפיניו, צ'ילי מתוק ומיונז פיקנטי.",
    price: 68, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80',
    tags: ['spicy'], customizable: true,
  },
  {
    id: 'b6', name: 'טראפל בורגר', category: 'burgers',
    description: 'המבורגר פרימיום עם איולי כמהין, פטריות מוקפצות ובצל מקורמל.',
    price: 78, image: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?w=600&q=80',
    featured: true, chefsPick: true, customizable: true,
  },
  {
    id: 'b7', name: "וג'י בורגר", category: 'burgers',
    description: 'קציצת ירקות איכותית עם חסה, עגבנייה ואיולי שום.',
    price: 58, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80',
    tags: ['vegetarian', 'vegan'], customizable: true,
  },
  // Sides
  {
    id: 's1', name: "צ'יפס קלאסי", category: 'sides',
    description: 'צ\'יפס פריך וזהוב',
    price: 18, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
  },
  {
    id: 's2', name: 'צ\'יפס בטטה', category: 'sides',
    description: 'צ\'יפס בטטה קריספי עם תיבול ביתי',
    price: 22, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&q=80',
    tags: ['vegan'],
  },
  {
    id: 's3', name: 'טבעות בצל', category: 'sides',
    description: 'טבעות בצל בציפוי פריך',
    price: 24, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
  },
  {
    id: 's4', name: 'כדורי פירה', category: 'sides',
    description: 'כדורי פירה קרמי ופריך מבחוץ',
    price: 24, image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80',
  },
  {
    id: 's5', name: 'כנפיים ברוטב BBQ (6 יחידות)', category: 'sides',
    description: 'כנפיים עסיסיות ברוטב ברביקיו מתוק-חריף',
    price: 34, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80',
  },
  {
    id: 's6', name: 'כנפיים חריפות (6 יחידות)', category: 'sides',
    description: 'כנפיים עסיסיות ברוטב חריף מיוחד',
    price: 34, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80',
    tags: ['spicy'],
  },
  // Drinks
  {
    id: 'd1', name: 'קוקה קולה', category: 'drinks',
    description: '', price: 12,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
  },
  {
    id: 'd2', name: 'קוקה קולה זירו', category: 'drinks',
    description: '', price: 12,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
  },
  {
    id: 'd3', name: 'ספרייט', category: 'drinks',
    description: '', price: 12,
    image: 'https://images.unsplash.com/photo-1624552184280-9e48f3a87f5f?w=600&q=80',
  },
  {
    id: 'd4', name: 'פיוז טי', category: 'drinks',
    description: '', price: 12,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
  {
    id: 'd5', name: 'תפוזים', category: 'drinks',
    description: '', price: 12,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80',
  },
  {
    id: 'd6', name: 'ענבים', category: 'drinks',
    description: '', price: 12,
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&q=80',
  },
  {
    id: 'd7', name: 'מים מינרליים', category: 'drinks',
    description: '', price: 10,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80',
  },
  {
    id: 'd8', name: 'סודה', category: 'drinks',
    description: '', price: 10,
    image: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=600&q=80',
  },
  // Beer
  {
    id: 'beer1', name: 'גולדסטאר', category: 'beer',
    description: '', price: 24,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80',
  },
  {
    id: 'beer2', name: 'היינקן', category: 'beer',
    description: '', price: 28,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80',
  },
  {
    id: 'beer3', name: 'ווינשטפן', category: 'beer',
    description: '', price: 32,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80',
  },
  {
    id: 'beer4', name: 'קרלסברג', category: 'beer',
    description: '', price: 28,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80',
  },
  // Desserts
  {
    id: 'des1', name: 'עוגת שוקולד חמה', category: 'desserts',
    description: 'עוגת שוקולד חמה עם גלידת וניל',
    price: 34, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  },
  {
    id: 'des2', name: 'וופל בלגי', category: 'desserts',
    description: 'וופל בלגי עם קצפת ופירות יער',
    price: 38, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80',
    tags: ['vegetarian'],
  },
  {
    id: 'des3', name: 'גלידת וניל עם שוקולד חם', category: 'desserts',
    description: 'גלידת וניל פרמיום עם ציפוי שוקולד חם',
    price: 32, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
    tags: ['vegetarian'],
  },
  {
    id: 'des4', name: "צ'ורוס עם רוטב שוקולד", category: 'desserts',
    description: "צ'ורוס פריך עם רוטב שוקולד עשיר",
    price: 34, image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80',
    tags: ['vegetarian'],
  },
  // Deals
  {
    id: 'deal1', name: 'ארוחת יחיד', category: 'deals',
    description: "המבורגר קלאסי + צ'יפס + שתייה",
    price: 79, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
    bestseller: true,
  },
  {
    id: 'deal2', name: 'ארוחת פרימיום', category: 'deals',
    description: "כל המבורגר + צ'יפס בטטה או טבעות בצל + שתייה",
    price: 99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
  },
  {
    id: 'deal3', name: 'דאבל דיל', category: 'deals',
    description: "2 המבורגרים + 2 צ'יפס + 2 שתייה",
    price: 149, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
  },
  {
    id: 'deal4', name: 'ארוחה משפחתית', category: 'deals',
    description: "4 המבורגרים + 2 צ'יפס גדולים + 2 טבעות בצל + 4 שתייה",
    price: 279, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
  },
  {
    id: 'deal5', name: 'קומבו זוגי', category: 'deals',
    description: "2 המבורגרים + צ'יפס גדול + 2 שתייה + קינוח",
    price: 179, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
  },
]

export const BREAD_CHOICES: BreadChoice[] = [
  { id: 'regular', name: 'לחמנייה רגילה' },
  { id: 'brioche', name: 'לחמניית בריוש' },
  { id: 'none', name: 'ללא לחמנייה' },
]

export const COOKING_LEVELS: CookingLevel[] = [
  { id: 'rare', name: 'Rare' },
  { id: 'medium-rare', name: 'Medium Rare' },
  { id: 'medium', name: 'Medium' },
  { id: 'medium-well', name: 'Medium Well' },
  { id: 'well-done', name: 'Well Done' },
]

export const EXTRAS: Extra[] = [
  { id: 'cheddar', name: "גבינת צ'דר", price: 6 },
  { id: 'egg', name: 'ביצת עין', price: 8 },
  { id: 'caramelized-onion', name: 'בצל מקורמל', price: 5 },
  { id: 'mushrooms', name: 'פטריות מוקפצות', price: 7 },
  { id: 'beef-bacon', name: 'בייקון בקר', price: 12 },
  { id: 'jalapeno', name: 'חלפיניו', price: 4 },
]

export const REMOVABLE_INGREDIENTS = [
  'עגבנייה', 'בצל', 'חמוצים', 'חסה', 'רטבים',
]
