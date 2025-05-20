// src/services/productService.js

// Get API base from environment
const API_BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL || `${API_BASE_URL}/../uploads/images`;

const fallbackImage = "https://via.placeholder.com/600x400?text=No+Image";

// Product Service
export const productService = {
  getCategories: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api_categories.php`);
      const data = await res.json();

      if (!data.status)
        throw new Error(data.message || "Failed to fetch categories");

      return data.data.map((category) => ({
        id: category.category_id,
        name: category.category_name,
        description: category.category_description || "",
        image: category.category_image
          ? `${IMAGE_BASE_URL}/${category.category_image}`
          : fallbackImage,
      }));
    } catch (error) {
      console.warn("Category fetch error:", error);
      return []; // fallback
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api_products_by_category.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_id: categoryId }),
      });

      const data = await res.json();
      if (!data.status || !data.data)
        throw new Error(data.message || "Fetch error");

      return data.data.products.map((product) => {
        const firstVariant = product.variations?.[0] || null;

        return {
          id: product.product_id,
          name: product.product_name,
          category: data.data.category_info.category_id,
          description: product.product_description || "",
          price: firstVariant
            ? parseFloat(firstVariant.variant_purchasing_price)
            : 0,
          size: firstVariant?.variant_name || "",
          image: product.product_image
            ? `${IMAGE_BASE_URL}/${product.product_image}`
            : fallbackImage,
          inStock: data.data.category_info.category_status === "active",
        };
      });
    } catch (error) {
      console.warn("Product fetch error:", error);
      return [];
    }
  },

  getIndividualProduct: async (productId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api_single_product.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await res.json();
      if (!data.success || !data.data)
        throw new Error(data.message || "Fetch error");

      const p = data.data;
      const firstVariant = p.variations?.[0] || null;

      return {
        id: p.product_id,
        name: p.product_name,
        brand: "", // optionally fetch later
        category: p.brand_id,
        category_id: p.category_id,
        description: p.product_description || "",
        price: firstVariant
          ? parseFloat(firstVariant.variant_purchasing_price)
          : 0,
        size: firstVariant?.variant_name || "",
        image: p.product_image
          ? `${IMAGE_BASE_URL}/${p.product_image}`
          : fallbackImage,
        inStock: firstVariant?.variant_quantity > 0,
        variation_id: firstVariant?.variant_id || null,
        product_id: p.product_id,
        variations: p.variations || [],
      };
    } catch (error) {
      console.error("Single product error:", error);
      throw error;
    }
  },
};
