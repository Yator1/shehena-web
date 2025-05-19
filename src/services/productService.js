const API_BASE = "http://localhost/shehena.co.ke/www/endpoints";

const fallbackImage = "https://via.placeholder.com/600x400?text=No+Image";

// Mock product service - to be replaced with actual API calls

// // Categories
// const categories = [
//   {
//     id: 'beer',
//     name: 'Beer',
//     description: 'Crisp and refreshing craft and commercial beers',
//     image: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 'wine',
//     name: 'Wine',
//     description: 'Fine wines from around the world',
//     image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 'whiskey',
//     name: 'Whiskey',
//     description: 'Premium single malts and blended whiskeys',
//     image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 'vodka',
//     name: 'Vodka',
//     description: 'Crystal clear vodkas for cocktails and shots',
//     image: 'https://images.pexels.com/photos/613182/pexels-photo-613182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 'gin',
//     name: 'Gin',
//     description: 'Botanical gins for the perfect G&T',
//     image: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   },
//   {
//     id: 'rum',
//     name: 'Rum',
//     description: 'Dark and light rums for tropical cocktails',
//     image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
//   }
// ]

// // Products
// const products = [
//   // Beer
//   {
//     id: "b1",
//     name: "Tusker Lager",
//     brand: "Tusker",
//     category: "beer",
//     description: "Kenya's iconic lager with a crisp, refreshing taste.",
//     price: 250,
//     size: "500ml",
//     image:
//       "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "4.2%",
//     inStock: true,
//     featured: true,
//   },
//   {
//     id: "b2",
//     name: "Heineken Premium",
//     brand: "Heineken",
//     category: "beer",
//     description: "International premium lager with distinctive flavor.",
//     price: 300,
//     size: "500ml",
//     image:
//       "https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "5%",
//     inStock: true,
//     featured: false,
//   },
//   {
//     id: "b3",
//     name: "Guinness Foreign Extra",
//     brand: "Guinness",
//     category: "beer",
//     description: "The bold, iconic stout with rich flavor profile.",
//     price: 350,
//     size: "500ml",
//     image: "https://patspints.com/wp-content/uploads/2022/03/0315222021.jpg",
//     alcoholContent: "6.3%",
//     inStock: true,
//     featured: true,
//   },

//   // Wine
//   {
//     id: "w1",
//     name: "Cabernet Sauvignon",
//     brand: "Four Cousins",
//     category: "wine",
//     description: "Full-bodied red wine with notes of blackberry and cedar.",
//     price: 1200,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "13.5%",
//     inStock: true,
//     featured: true,
//   },
//   {
//     id: "w2",
//     name: "Chardonnay",
//     brand: "Nederburg",
//     category: "wine",
//     description: "Elegant white wine with tropical fruit notes and subtle oak.",
//     price: 1500,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/1479706/pexels-photo-1479706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "13%",
//     inStock: true,
//     featured: false,
//   },

//   // Whiskey
//   {
//     id: "wh1",
//     name: "Jameson Irish Whiskey",
//     brand: "Jameson",
//     category: "whiskey",
//     description: "Triple-distilled smoothness with hints of vanilla and spice.",
//     price: 2800,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "40%",
//     inStock: true,
//     featured: true,
//   },
//   {
//     id: "wh2",
//     name: "Jack Daniel's Old No. 7",
//     brand: "Jack Daniel's",
//     category: "whiskey",
//     description: "Charcoal-mellowed Tennessee whiskey with a smooth character.",
//     price: 3500,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "40%",
//     inStock: true,
//     featured: false,
//   },

//   // Vodka
//   {
//     id: "v1",
//     name: "Smirnoff Red Label",
//     brand: "Smirnoff",
//     category: "vodka",
//     description: "Triple distilled for exceptional smoothness and clarity.",
//     price: 1800,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/613182/pexels-photo-613182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "37.5%",
//     inStock: true,
//     featured: true,
//   },
//   {
//     id: "v2",
//     name: "Grey Goose",
//     brand: "Grey Goose",
//     category: "vodka",
//     description: "Premium French vodka made from the finest wheat.",
//     price: 4500,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/2570259/pexels-photo-2570259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "40%",
//     inStock: true,
//     featured: true,
//   },

//   // Gin
//   {
//     id: "g1",
//     name: "Bombay Sapphire",
//     brand: "Bombay",
//     category: "gin",
//     description:
//       "Infused with 10 hand-selected botanicals for a balanced flavor.",
//     price: 2500,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "40%",
//     inStock: true,
//     featured: false,
//   },
//   {
//     id: "g2",
//     name: "Hendrick's Gin",
//     brand: "Hendrick's",
//     category: "gin",
//     description:
//       "Uniquely infused with rose and cucumber for a distinctive taste.",
//     price: 4200,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/5947019/pexels-photo-5947019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "41.4%",
//     inStock: true,
//     featured: true,
//   },

//   // Rum
//   {
//     id: "r1",
//     name: "Captain Morgan Original Spiced",
//     brand: "Captain Morgan",
//     category: "rum",
//     description: "Caribbean rum enriched with spices and natural flavors.",
//     price: 2200,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "35%",
//     inStock: true,
//     featured: false,
//   },
//   {
//     id: "r2",
//     name: "Bacardi Superior",
//     brand: "Bacardi",
//     category: "rum",
//     description: "Light and clean white rum ideal for cocktails.",
//     price: 1900,
//     size: "750ml",
//     image:
//       "https://images.pexels.com/photos/5947028/pexels-photo-5947028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     alcoholContent: "37.5%",
//     inStock: true,
//     featured: true,
//   },
// ];

export const productService = {
  // Get all categories
  getCategories: async () => {
    try {
      const res = await fetch(`${API_BASE}/api_categories.php`);
      const data = await res.json();

      console.log("Categories data:", data);

      if (!data.status) {
        throw new Error(data.message || "Failed to fetch categories");
      }

      return data.data.map((category) => ({
        id: category.category_id,
        name: category.category_name,
        description: category.category_description || "",
        image: category.category_image
          ? `http://localhost/shehena.co.ke/www/uploads/images/${category.category_image}`
          : fallbackImage,
      }));
    } catch (error) {
      console.warn("Using dummy categories due to error:");
      return []; // fallback
    }

    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve(categories)
    //   }, 500)
    // })
  },

  // Get all products
  getAllProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 800);
    });
  },

  // Get featured products
  // getFeaturedProducts: async () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(products.filter((product) => product.featured));
  //     }, 600);
  //   });
  // },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const res = await fetch(`${API_BASE}/api_products_by_category.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_id: categoryId }),
      });

      const data = await res.json();

      if (!data.status || !data.data) {
        throw new Error(data.message || "Failed to fetch products");
      }

      const products = data.data.products.map((product) => {
        const firstVariant =
          product.variations && product.variations.length > 0
            ? product.variations[0]
            : null;

        return {
          id: product.product_id,
          name: product.product_name,
          // brand: "", // Optionally fetch or leave empty
          category: data.data.category_info.category_id,
          description: product.product_description || "",
          price: firstVariant
            ? parseFloat(firstVariant.variant_purchasing_price)
            : 0,
          size: firstVariant?.variant_name || "",
          image: product.product_image
            ? `http://localhost/shehena.co.ke/www/uploads/images/${product.product_image}`
            : fallbackImage,
          // alcoholContent: "", // Optionally leave blank or extend your backend
          inStock: data.data.category_info.category_status === "active",
          // featured: false, // or adjust logic if needed
        };
      });

      return products;
    } catch (error) {
      console.warn("Using dummy products due to error:", error);
      return products; // fallback dummy data
    }
  },

  // Get product by ID
  getIndividualProduct: async (productId) => {
    try {
      const response = await fetch(`${API_BASE}/api_single_product.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });
  
      const data = await response.json();
  
      if (!data.success || !data.data) {
        throw new Error(data.message || "Failed to fetch product");
      }
  
      const p = data.data;
      const firstVariant = p.variations?.[0] || null;
  
      return {
        id: p.product_id,
        name: p.product_name,
        brand: "", // Optionally fetch brand if needed
        category: p.brand_id,
        category_id: p.category_id, // if you extract this elsewhere
        description: p.product_description || "",
        price: firstVariant ? parseFloat(firstVariant.variant_purchasing_price) : 0,
        size: firstVariant?.variant_name || "",
        image: p.product_image
          ? `http://localhost/shehena.co.ke/www/uploads/images/${p.product_image}`
          : fallbackImage,
        alcoholContent: "",
        inStock: firstVariant?.variant_quantity > 0,
        variation_id: firstVariant?.variant_id || null, // ✅ Required
        product_id: p.product_id, // ✅ Required
        variations: p.variations || [], // ✅ Include full list for later use
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },
  

  // Search products
  // searchProducts: async (query) => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       const searchResults = products.filter(product =>
  //         product.name.toLowerCase().includes(query.toLowerCase()) ||
  //         product.brand.toLowerCase().includes(query.toLowerCase()) ||
  //         product.description.toLowerCase().includes(query.toLowerCase())
  //       )
  //       resolve(searchResults)
  //     }, 600)
  //   })
  // }
};