export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Main image (first image for backwards compatibility)
  images: string[]; // Multiple images (1-5 images) - MANDATORY
  videos: string[]; // Product videos (1-2 videos) - OPTIONAL
  colors: string[];
  category: 'Custom Gifts' | 'Toys' | 'keychains' | 'Home & Desk decor' | 'Jewellery' | "Valentine's Collection";
  description: string;
  material: string;
  sizes: string[];
  status?: 'draft' | 'published'; // Product status: draft or published (default: published for backwards compatibility)
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Cute Animal Figurine',
    price: 149,
    image: 'https://images.unsplash.com/photo-1763905145495-6e7d3f9b22a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYW5pbWFsJTIwZmlndXJpbmUlMjB0b3l8ZW58MXx8fHwxNzcwODc4ODUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1763905145495-6e7d3f9b22a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYW5pbWFsJTIwZmlndXJpbmUlMjB0b3l8ZW58MXx8fHwxNzcwODc4ODUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1763905145495-6e7d3f9b22a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwYW5pbWFsJTIwZmlndXJpbmUlMjB0b3l8ZW58MXx8fHwxNzcwODc4ODUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['White', 'Blue', 'Pink', 'Green'],
    category: 'Toys',
    description: 'Adorable 3D-printed animal figurines perfect for kids and collectors.',
    material: 'PLA (eco-friendly)',
    sizes: ['Small (5cm)', 'Medium (10cm)', 'Large (15cm)']
  },
  {
    id: '2',
    name: 'Modern Vase',
    price: 299,
    image: 'https://images.unsplash.com/photo-1730267244908-3ba71e34d073?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkZWNvcnxlbnwxfHx8fDE3NjczODE2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1730267244908-3ba71e34d073?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkZWNvcnxlbnwxfHx8fDE3NjczODE2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1730267244908-3ba71e34d073?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkZWNvcnxlbnwxfHx8fDE3NjczODE2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['White', 'Black', 'Teal', 'Orange'],
    category: 'Home & Desk decor',
    description: 'Elegant geometric vase to elevate your home décor.',
    material: 'PLA (eco-friendly)',
    sizes: ['Standard (20cm)']
  },
  {
    id: '3',
    name: 'Octopus Flexi Keychain',
    price: 99,
    image: 'https://images.unsplash.com/photo-1759843214275-32e74fe669f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY3RvcHVzJTIwa2V5Y2hhaW4lMjB0b3l8ZW58MXx8fHwxNzcwNzg5NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1759843214275-32e74fe669f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY3RvcHVzJTIwa2V5Y2hhaW4lMjB0b3l8ZW58MXx8fHwxNzcwNzg5NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1759843214275-32e74fe669f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY3RvcHVzJTIwa2V5Y2hhaW4lMjB0b3l8ZW58MXx8fHwxNzcwNzg5NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Purple', 'Orange', 'Blue', 'Pink'],
    category: 'keychains',
    description: 'Cute and flexible 3D-printed octopus keychain with movable tentacles. Fun fidget toy that doubles as a practical accessory for your keys or bag.',
    material: 'Flexible TPU',
    sizes: ['Standard (6cm)']
  },
  {
    id: '4',
    name: 'Starfish Flexi Keychain',
    price: 99,
    image: 'https://images.unsplash.com/photo-1609942821011-bdfe750c8862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyZmlzaCUyMGtleWNoYWluJTIwYWNjZXNzb3J5fGVufDF8fHx8MTc3MDc4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1609942821011-bdfe750c8862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyZmlzaCUyMGtleWNoYWluJTIwYWNjZXNzb3J5fGVufDF8fHx8MTc3MDc4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1609942821011-bdfe750c8862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyZmlzaCUyMGtleWNoYWluJTIwYWNjZXNzb3J5fGVufDF8fHx8MTc3MDc4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Yellow', 'Coral', 'Blue', 'White'],
    category: 'keychains',
    description: 'Adorable flexible starfish keychain with articulated arms. Beach-inspired design perfect for ocean lovers and a great conversation starter.',
    material: 'Flexible TPU',
    sizes: ['Standard (6cm)']
  },
  {
    id: '5',
    name: 'Knitted Heart Keychain',
    price: 79,
    image: 'https://images.unsplash.com/photo-1680032404374-4ad0b74244db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0dGVkJTIwaGVhcnQlMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1680032404374-4ad0b74244db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0dGVkJTIwaGVhcnQlMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1680032404374-4ad0b74244db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0dGVkJTIwaGVhcnQlMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Red', 'Pink', 'White', 'Purple'],
    category: "Valentine's Collection",
    description: 'Romantic heart-shaped keychain with beautiful knitted texture pattern. Perfect Valentine\'s Day gift or everyday accessory to show your love.',
    material: 'PLA (eco-friendly)',
    sizes: ['Standard (5cm)']
  },
  {
    id: '6',
    name: 'Penguin Flexi Keychain',
    price: 99,
    image: 'https://images.unsplash.com/photo-1634311689077-028d5eebb401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ndWluJTIwa2V5Y2hhaW4lMjBjdXRlfGVufDF8fHx8MTc3MDc4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1634311689077-028d5eebb401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ndWluJTIwa2V5Y2hhaW4lMjBjdXRlfGVufDF8fHx8MTc3MDc4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1634311689077-028d5eebb401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ndWluJTIwa2V5Y2hhaW4lMjBjdXRlfGVufDF8fHx8MTc3MDc4OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Black & White', 'Blue', 'Pink'],
    category: 'keychains',
    description: 'Super cute flexible penguin keychain with movable flippers and head. Charming accessory that brings a smile to your face every time you grab your keys.',
    material: 'Flexible TPU',
    sizes: ['Standard (6cm)']
  },
  {
    id: '7',
    name: 'Heart Spinner Keychain',
    price: 129,
    image: 'https://images.unsplash.com/photo-1769790604706-d055431bce1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMHNwaW5uZXIlMjBmaWRnZXR8ZW58MXx8fHwxNzcwNzg5NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1769790604706-d055431bce1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMHNwaW5uZXIlMjBmaWRnZXR8ZW58MXx8fHwxNzcwNzg5NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1769790604706-d055431bce1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMHNwaW5uZXIlMjBmaWRnZXR8ZW58MXx8fHwxNzcwNzg5NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Red', 'Pink', 'Rose Gold', 'Silver'],
    category: "Valentine's Collection",
    description: 'Satisfying heart-shaped fidget spinner keychain. Perfect stress-relief tool with smooth ball-bearing spin. Great Valentine\'s gift for fidget lovers.',
    material: 'PLA with bearings',
    sizes: ['Standard (6cm)']
  },
  {
    id: '8',
    name: 'Wheel Spinner Keychain',
    price: 119,
    image: 'https://images.unsplash.com/photo-1696692372268-efb2ed03dd29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbCUyMHNwaW5uZXIlMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1696692372268-efb2ed03dd29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbCUyMHNwaW5uZXIlMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1696692372268-efb2ed03dd29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbCUyMHNwaW5uZXIlMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Black', 'Blue', 'Green', 'Red'],
    category: 'keychains',
    description: 'Classic wheel-design fidget spinner keychain with ultra-smooth rotation. Compact and portable stress-relief companion that fits perfectly on your keyring.',
    material: 'PLA with bearings',
    sizes: ['Standard (5cm)']
  },
  {
    id: '9',
    name: 'Dog Paw Spinner Keychain',
    price: 119,
    image: 'https://images.unsplash.com/photo-1572987668898-0082f2567a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwYXclMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1572987668898-0082f2567a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwYXclMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1572987668898-0082f2567a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwYXclMjBrZXljaGFpbnxlbnwxfHx8fDE3NzA3ODk2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Brown', 'Black', 'Pink', 'Gold'],
    category: 'keychains',
    description: 'Adorable dog paw-shaped fidget spinner keychain perfect for pet lovers. Smooth spinning action with a cute paw print design that celebrates your furry friend.',
    material: 'PLA with bearings',
    sizes: ['Standard (5cm)']
  },
  {
    id: '10',
    name: 'Smiley Spinner Keychain',
    price: 119,
    image: 'https://images.unsplash.com/photo-1762613875432-1b80b1682905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsZXklMjBmYWNlJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzcwNzg5NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1762613875432-1b80b1682905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsZXklMjBmYWNlJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzcwNzg5NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762613875432-1b80b1682905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsZXklMjBmYWNlJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzcwNzg5NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Yellow', 'Pink', 'Blue', 'Orange'],
    category: 'keychains',
    description: 'Happy smiley face fidget spinner keychain that brings joy and relieves stress. Fun retro design with smooth spinning motion to brighten your day.',
    material: 'PLA with bearings',
    sizes: ['Standard (5cm)']
  },
  {
    id: '11',
    name: 'Knitted Dog Keychain',
    price: 89,
    image: 'https://images.unsplash.com/photo-1558579015-9ff7923c1e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0dGVkJTIwZG9nJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzcwNzg5NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1558579015-9ff7923c1e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0dGVkJTIwZG9nJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzcwNzg5NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1558579015-9ff7923c1e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrbml0dGVkJTIwZG9nJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzcwNzg5NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Brown', 'Golden', 'Black', 'White'],
    category: 'keychains',
    description: 'Cute dog-shaped keychain with detailed knitted texture. Perfect gift for dog lovers featuring a charming canine silhouette with beautiful surface detail.',
    material: 'PLA (eco-friendly)',
    sizes: ['Standard (6cm)']
  },
  {
    id: '12',
    name: 'Flower Plate Keychain',
    price: 79,
    image: 'https://images.unsplash.com/photo-1725826474457-d4dc3d6d8abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBwbGF0ZSUyMGtleWNoYWlufGVufDF8fHx8MTc3MDc4OTY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1725826474457-d4dc3d6d8abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBwbGF0ZSUyMGtleWNoYWlufGVufDF8fHx8MTc3MDc4OTY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1725826474457-d4dc3d6d8abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBwbGF0ZSUyMGtleWNoYWlufGVufDF8fHx8MTc3MDc4OTY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Pink', 'White', 'Lavender', 'Mint Green'],
    category: "Valentine's Collection",
    description: 'Elegant floral-design plate keychain with delicate flower patterns. Sophisticated accessory perfect for spring or Valentine\'s Day celebrations.',
    material: 'PLA (eco-friendly)',
    sizes: ['Standard (5cm)']
  },
  {
    id: '13',
    name: 'Name Keychain',
    price: 149,
    image: 'https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYW1lJTIwa2V5Y2hhaW4lMjBwZXJzb25hbGl6ZWR8ZW58MXx8fHwxNzcwNzg5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYW1lJTIwa2V5Y2hhaW4lMjBwZXJzb25hbGl6ZWR8ZW58MXx8fHwxNzcwNzg5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1562770584-eaf50b017307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYW1lJTIwa2V5Y2hhaW4lMjBwZXJzb25hbGl6ZWR8ZW58MXx8fHwxNzcwNzg5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Black', 'White', 'Red', 'Blue', 'Gold'],
    category: 'Custom Gifts',
    description: 'Personalized name keychain custom-printed with any name you choose. Thoughtful gift that makes keys uniquely yours or perfect present for loved ones.',
    material: 'PLA (eco-friendly)',
    sizes: ['Standard (8cm)']
  },
  {
    id: '14',
    name: 'Text Child Keychain',
    price: 149,
    image: 'https://images.unsplash.com/photo-1682019652913-b61a48eeba4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGtleWNoYWluJTIwY3VzdG9tJTIwdGV4dHxlbnwxfHx8fDE3NzA3ODk2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1682019652913-b61a48eeba4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGtleWNoYWluJTIwY3VzdG9tJTIwdGV4dHxlbnwxfHx8fDE3NzA3ODk2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1682019652913-b61a48eeba4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGtleWNoYWluJTIwY3VzdG9tJTIwdGV4dHxlbnwxfHx8fDE3NzA3ODk2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    videos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
    ],
    colors: ['Rainbow', 'Pink', 'Blue', 'Yellow', 'Green'],
    category: 'Custom Gifts',
    description: 'Customizable children\'s keychain with fun text and playful design. Great for backpacks, lunch boxes, or as a special gift with their name or favorite words.',
    material: 'PLA (eco-friendly)',
    sizes: ['Standard (7cm)']
  }
];