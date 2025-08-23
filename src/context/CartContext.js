import { createContext, useState, useEffect, useContext } from 'react';
import { LoginContext } from './LoginContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { loggedIn, token } = useContext(LoginContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCart = async () => {
      if (!loggedIn) {
        // Load guest cart from localStorage
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        setCart(guestCart);
        return;
      }

      // Fetch authenticated user's cart
      try {
        const response = await fetch(`${baseUrl}/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [loggedIn, token]);

  // Function to merge guest cart with user cart after login
  const mergeGuestCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    if (guestCart.length === 0) return;

    try {
      await Promise.all(guestCart.map(item => 
        fetch(`${baseUrl}/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity
          })
        })
      ));

      // Clear guest cart after successful merge
      localStorage.removeItem('guestCart');
    } catch (error) {
      console.error('Failed to merge guest cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, mergeGuestCart }}>
      {children}
    </CartContext.Provider>
  );
}