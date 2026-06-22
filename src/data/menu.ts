import { MenuItem, BreadChoice, Extra } from '../types'

// 🪙 מטבעות שי - not real money!
export const COIN = '🪙'

export const MENU_ITEMS: MenuItem[] = [
  // 🥪 כריכים
  {
    id: 'k1', name: 'כריך גבינה מיוחד', category: 'burgers',
    description: 'לחם לבן, גבינה צהובה מותכת, עגבנייה ומלפפון. קלאסיק של שי!',
    price: 4, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80',
    bestseller: true, customizable: true,
  },
  {
    id: 'k2', name: 'טוסט שי', category: 'burgers',
    description: 'טוסט חם עם גבינה נמסה וקטשופ. יוצא מושלם תמיד!',
    price: 3, image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=600&q=80',
    bestseller: true, customizable: true,
  },
  {
    id: 'k3', name: 'כריך ממרח שוקולד', category: 'burgers',
    description: 'לחם טרי עם ממרח שוקולד ואגוזים. הכי טוב בבוקר!',
    price: 3, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    featured: true, customizable: true,
  },
  {
    id: 'k4', name: 'כריך חמאת בוטנים', category: 'burgers',
    description: 'לחם עם חמאת בוטנים ודבש. שילוב מנצח!',
    price: 3, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    featured: true, customizable: true,
  },
  {
    id: 'k5', name: 'פרנץ׳ טוסט', category: 'burgers',
    description: 'ביצה, חלב, לחם על המחבת. מפדר אבל כיף להכין!',
    price: 5, image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80',
    chefsPick: true, customizable: true,
  },
  {
    id: 'k6', name: 'כריך ביצה מקושקשת', category: 'burgers',
    description: 'ביצה מקושקשת רכה עם מלח ופלפל על לחם. שי עשה לבד!',
    price: 4, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
    featured: true, customizable: true,
  },
  {
    id: 'k7', name: 'פיתה עם חומוס', category: 'burgers',
    description: 'פיתה חמה עם חומוס וסלט ירקות. פשוט ומעולה!',
    price: 3, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb0?w=600&q=80',
    tags: ['vegetarian', 'vegan'], customizable: true,
  },

  // 🥗 תוספות
  {
    id: 's1', name: 'סלט ירקות של שי', category: 'sides',
    description: 'עגבנייה, מלפפון, גזר וזיתים. שי חותך הכל לבד!',
    price: 2, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    tags: ['vegan'],
  },
  {
    id: 's2', name: 'קורנפלקס במיצוע', category: 'sides',
    description: 'קורנפלקס עם חלב קר. ארוחה שלמה בשתי דקות!',
    price: 2, image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=600&q=80',
    tags: ['vegetarian'],
  },
  {
    id: 's3', name: 'פירות חתוכים', category: 'sides',
    description: 'תפוח, בננה ותפוז. שי חותך ומגיש!',
    price: 3, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&q=80',
    tags: ['vegan'],
  },
  {
    id: 's4', name: 'עגבנייה שרי', category: 'sides',
    description: 'עגבניות שרי צבעוניות עם מעט מלח. מתוקות ומרעננות!',
    price: 1, image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80',
    tags: ['vegan'],
  },
  {
    id: 's5', name: 'לחם עם גבינה ועגבנייה', category: 'sides',
    description: 'פרוסות לחם עם גבינה קוטג׳ ועגבנייה. בריא וטעים!',
    price: 2, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
    tags: ['vegetarian'],
  },

  // 🥤 שתייה
  {
    id: 'd1', name: 'שוקו של שי', category: 'drinks',
    description: 'חלב עם שלוש כפיות שוקו. שי מערבב חזק!',
    price: 2, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
    bestseller: true,
  },
  {
    id: 'd2', name: 'מיץ תפוזים טרי', category: 'drinks',
    description: 'שי סוחט תפוזים בעצמו. 3 תפוזים בכוס אחת!',
    price: 3, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80',
  },
  {
    id: 'd3', name: 'לימונדה ביתית', category: 'drinks',
    description: 'לימון + מים + סוכר + קרח. קיץ בכוס!',
    price: 2, image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=80',
    tags: ['vegan'],
  },
  {
    id: 'd4', name: 'מים עם קרח', category: 'drinks',
    description: 'מים קרים מהמקרר. בריא ומרענן!',
    price: 0, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80',
    tags: ['vegan'],
  },
  {
    id: 'd5', name: 'חלב עם ממרח', category: 'drinks',
    description: 'כוס חלב קר בצד הכריך. שילוב מנצח!',
    price: 1, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80',
    tags: ['vegetarian'],
  },

  // 🍭 מתוקים
  {
    id: 'sw1', name: 'עוגיות שוקולד צ׳יפס', category: 'beer',
    description: 'שי אפה אתמול! (עם עזרה קטנה). פריכות ומתוקות!',
    price: 4, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80',
    bestseller: true,
  },
  {
    id: 'sw2', name: 'גלידה כדור', category: 'beer',
    description: 'כדור גלידה שוקולד או וניל מהמקפיא!',
    price: 2, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
    tags: ['vegetarian'],
  },
  {
    id: 'sw3', name: 'יוגורט עם דבש', category: 'beer',
    description: 'יוגורט לבן עם דבש וגרנולה. בריא ומתוק!',
    price: 3, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
    tags: ['vegetarian'],
  },
  {
    id: 'sw4', name: 'בננה עם ממרח שוקולד', category: 'beer',
    description: 'בננה שקולפת בקלות עם ממרח שוקולד. 30 שניות!',
    price: 2, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80',
    tags: ['vegetarian'],
  },

  // 🍳 ארוחות
  {
    id: 'des1', name: 'פנקייק שי', category: 'desserts',
    description: 'קמח, ביצה, חלב וסוכר ונחוצ׳! שי מכין ואמא עוזרת קצת עם הכיריים.',
    price: 6, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    featured: true, chefsPick: true,
  },
  {
    id: 'des2', name: 'פסטה ברוטב עגבניות', category: 'desserts',
    description: 'פסטה מבושלת עם רוטב עגבניות מהצנצנת. שי בישל לבד!',
    price: 5, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    tags: ['vegetarian'],
  },
  {
    id: 'des3', name: 'גרנולה עם חלב', category: 'desserts',
    description: 'גרנולה פריכה, פירות יבשים וחלב קר. ארוחת בוקר כמו מלך!',
    price: 3, image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=600&q=80',
    tags: ['vegetarian'],
  },

  // 🌟 מנות מיוחדות
  {
    id: 'deal1', name: 'ארוחת שי המיוחדת', category: 'deals',
    description: 'כריך גבינה + סלט ירקות + שוקו. הכי כיף!',
    price: 7, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
    bestseller: true,
  },
  {
    id: 'deal2', name: 'ארוחת בוקר מלאה', category: 'deals',
    description: 'פרנץ׳ טוסט + פירות + מיץ תפוזים. יום טוב מתחיל כאן!',
    price: 10, image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80',
  },
  {
    id: 'deal3', name: 'ארוחת חברים', category: 'deals',
    description: '2 כריכים + 2 שתייה + עוגיות. לשני חברים הכי טובים!',
    price: 12, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80',
  },
  {
    id: 'deal4', name: 'מגש משפחתי', category: 'deals',
    description: '4 כריכים + סלט + 4 שתייה. לכל המשפחה!',
    price: 20, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80',
  },
  {
    id: 'deal5', name: 'ארוחת מתוקים', category: 'deals',
    description: 'פנקייק + גלידה + שוקו. לשבת בבוקר!',
    price: 9, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
  },
]

export const BREAD_CHOICES: BreadChoice[] = [
  { id: 'white', name: 'לחם לבן' },
  { id: 'whole', name: 'לחם מלא' },
  { id: 'pita', name: 'פיתה' },
]

export const EXTRAS: Extra[] = [
  { id: 'chocolate', name: 'ממרח שוקולד', price: 1 },
  { id: 'cheese', name: 'גבינה צהובה', price: 1 },
  { id: 'tomato', name: 'עגבנייה', price: 0 },
  { id: 'cucumber', name: 'מלפפון', price: 0 },
  { id: 'ketchup', name: 'קטשופ', price: 0 },
  { id: 'honey', name: 'דבש', price: 1 },
]

export const REMOVABLE_INGREDIENTS = [
  'עגבנייה', 'מלפפון', 'גבינה', 'חסה', 'רטבים',
]
