export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  spiceLevel: number; // 1-3
  rating: number;
  prepTime: number; // in minutes
}

export const menuData = {
  veg: [
    {
      id: 1,
      name: "Paneer Tikka Masala Supreme",
      price: 485,
      image: "https://tse3.mm.bing.net/th/id/OIP.X6g5U7bNgbmzwO3FIgUgyAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Tender cottage cheese cubes marinated in aromatic spices, grilled to perfection and simmered in rich tomato-cashew gravy",
      category: "main course",
      spiceLevel: 2,
      rating: 4.8,
      prepTime: 25
    },
    {
      id: 2,
      name: "Truffle Mushroom Risotto",
      price: 650,
      image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
      description: "Creamy arborio rice cooked with wild mushrooms, truffle oil, and finished with parmesan and fresh herbs",
      category: "main course",
      spiceLevel: 1,
      rating: 4.9,
      prepTime: 30
    },
    {
      id: 3,
      name: "Stuffed Bell Pepper Delight",
      price: 425,
      image: "https://tse2.mm.bing.net/th/id/OIP.xFZZ3wI_zTIAZ1mw16GdkQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Colorful bell peppers stuffed with quinoa, vegetables, and Indian spices, topped with cheese",
      category: "main course",
      spiceLevel: 2,
      rating: 4.6,
      prepTime: 35
    },
    {
      id: 4,
      name: "Dal Makhani Royal",
      price: 385,
      image: "https://tse2.mm.bing.net/th/id/OIP.NIAx3JlWrI7UoQGFDLPa5gHaGX?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Slow-cooked black lentils in rich butter and cream sauce with aromatic spices",
      category: "main course",
      spiceLevel: 2,
      rating: 4.7,
      prepTime: 20
    },
    {
      id: 5,
      name: "Avocado Toast Gourmet",
      price: 285,
      image: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg",
      description: "Artisanal sourdough topped with smashed avocado, cherry tomatoes, and hemp seeds",
      category: "appetizer",
      spiceLevel: 1,
      rating: 4.4,
      prepTime: 10
    },
    {
      id: 6,
      name: "Mediterranean Quinoa Bowl",
      price: 545,
      image: "https://feedingourfaces.com/wp-content/uploads/2021/01/up-close-mediterranean-chicken-and-quinoa-bowl-with-romesco-sauce-819x1024.jpg",
      description: "Protein-rich quinoa with roasted vegetables, olives, feta cheese, and tahini dressing",
      category: "salad",
      spiceLevel: 1,
      rating: 4.5,
      prepTime: 15
    },
    {
      id: 7,
      name: "Spicy Penne Arrabbiata",
      price: 465,
      image: "https://tse3.mm.bing.net/th/id/OIP.YcTDlryqeBixltOSsrbnpQHaLQ?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Al dente penne pasta in spicy tomato sauce with garlic, red chilies, and fresh basil",
      category: "pasta",
      spiceLevel: 3,
      rating: 4.6,
      prepTime: 18
    },
    {
      id: 8,
      name: "Chocolate Lava Cake",
      price: 225,
      image: "https://www.cookingclassy.com/wp-content/uploads/2022/02/molten-lava-cake-17.jpg",
      description: "Decadent warm chocolate cake with molten center, served with vanilla ice cream",
      category: "dessert",
      spiceLevel: 3,
      rating: 4.9,
      prepTime: 12
    },
    {
      id: 9,
      name: "Veg Biryani",
      price: 225,
      image: "https://www.cookwithmanali.com/wp-content/uploads/2019/09/Vegetable-Biryani-Restaurant-Style.jpg",
      description: "Decadent warm chocolate cake with molten center, served with vanilla ice cream",
      category: "dessert",
      spiceLevel: 3,
      rating: 4.9,
      prepTime: 12
    }
  ],
  "non-veg": [
    {
      id: 9,
      name: "Butter Chicken Premium",
      price: 625,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      description: "Tender chicken pieces in rich, creamy tomato-based curry with aromatic Indian spices",
      category: "main course",
      spiceLevel: 2,
      rating: 4.9,
      prepTime: 25
    },
    {
      id: 10,
      name: "Grilled Salmon Teriyaki",
      price: 785,
      image: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg",
      description: "Fresh Atlantic salmon grilled to perfection with teriyaki glaze and sesame seeds",
      category: "seafood",
      spiceLevel: 1,
      rating: 4.8,
      prepTime: 20
    },
    {
      id: 11,
      name: "Lamb Rogan Josh",
      price: 725,
      image: "https://cdn.shopify.com/s/files/1/2313/8987/articles/Rogan_Josh_01_copy_1000x1000.jpg?v=1625548245",
      description: "Tender lamb cooked in traditional Kashmiri style with yogurt and aromatic spices",
      category: "main course",
      spiceLevel: 3,
      rating: 4.7,
      prepTime: 45
    },
    {
      id: 12,
      name: "Tandoori Chicken",
      price: 565,
      image: "https://tse1.mm.bing.net/th/id/OIP.u8NDx8rm9aRPrHcVsSyTeAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Half chicken marinated in yogurt and spices, cooked in traditional clay oven",
      category: "tandoor",
      spiceLevel: 2,
      rating: 4.6,
      prepTime: 30
    },
    {
      id: 13,
      name: "Prawn Curry Coastal",
      price: 685,
      image: "https://as1.ftcdn.net/v2/jpg/08/33/36/50/1000_F_833365010_2RhlYfTTQywmV3TpfJ87jKHkw3kSRVOy.jpg",
      description: "Fresh prawns cooked in coconut milk with curry leaves and coastal spices",
      category: "seafood",
      spiceLevel: 3,
      rating: 4.8,
      prepTime: 22
    },
    {
      id: 14,
      name: "Chicken Biryani Royal",
      price: 545,
      image: "https://img.freepik.com/premium-photo/chicken-biryani-indian-food-photography_1032986-1447.jpg",
      description: "Fragrant basmati rice layered with spiced chicken, saffron, and fried onions",
      category: "rice",
      spiceLevel: 2,
      rating: 4.9,
      prepTime: 35
    },
    {
      id: 15,
      name: "Fish Tikka",
      price: 485,
      image: "https://nishkitchen.com/wp-content/uploads/2019/02/Fish-tikka-1B.jpg",
      description: "Marinated fish cubes grilled with mint chutney and onion rings",
      category: "appetizer",
      spiceLevel: 2,
      rating: 4.5,
      prepTime: 18
    },
    {
      id: 16,
      name: "Chicken Wings Buffalo",
      price: 385,
      image: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg",
      description: "Crispy chicken wings tossed in spicy buffalo sauce with celery sticks",
      category: "appetizer",
      spiceLevel: 3,
      rating: 4.4,
      prepTime: 15
    }
  ]
};