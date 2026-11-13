/**
 * ROCHELLES Streetwear - Gerenciador da Sacola de Compras (Cart)
 * Demonstração funcional para apresentação acadêmica e portfólio
 */

class CartManager {
  constructor() {
    this.storageKey = "rochelles_cart_items_v1";
    this.items = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Não foi possível carregar o carrinho do localStorage:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Não foi possível salvar o carrinho no localStorage:", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getState());
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  getState() {
    const totalCount = this.items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const freeShippingThreshold = 199.0;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

    return {
      items: [...this.items],
      totalCount,
      subtotal,
      freeShippingThreshold,
      remainingForFreeShipping,
      shippingProgress,
      isFreeShipping: subtotal >= freeShippingThreshold && totalCount > 0
    };
  }

  addItem(productId, size, quantity = 1) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return { success: false, error: "Produto não encontrado" };

    if (!size) {
      return { success: false, error: "Por favor, selecione um tamanho antes de adicionar." };
    }

    const existingIndex = this.items.findIndex(
      (item) => item.id === productId && item.size === size
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        categoryLabel: product.categoryLabel,
        price: product.price,
        image: product.frontImage || product.fullImage,
        size: size,
        quantity: quantity
      });
    }

    this.saveCart();
    return {
      success: true,
      product,
      size,
      quantity,
      message: `${product.name} (${size}) adicionado à sacola!`
    };
  }

  updateQuantity(productId, size, delta) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === productId && item.size === size
    );
    if (itemIndex === -1) return;

    this.items[itemIndex].quantity += delta;
    if (this.items[itemIndex].quantity <= 0) {
      this.items.splice(itemIndex, 1);
    }

    this.saveCart();
  }

  removeItem(productId, size) {
    this.items = this.items.filter(
      (item) => !(item.id === productId && item.size === size)
    );
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }
}

// Instância global do carrinho
const cart = new CartManager();
