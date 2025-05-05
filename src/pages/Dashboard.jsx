
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, CakeSlice, Utensils, Pizza, IceCream, Soup, Salad, Beer, History, LogOut } from "lucide-react";

// Import the menuItems and categoryColors from a separate file
import { menuItems, categoryColors } from "@/lib/menuData";

function generateToken() {
  const date = new Date();
  const tokenPrefix = date.getFullYear().toString().slice(-2) +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${tokenPrefix}-${randomNum}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [menuList, setMenuList] = useState(menuItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentBill, setCurrentBill] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your order.`,
    });
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleUpdatePrice = (itemId, newPrice) => {
    setMenuList(
      menuList.map((item) =>
        item.id === itemId ? { ...item, price: parseFloat(newPrice) } : item
      )
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty!",
        variant: "destructive",
      });
      return;
    }

    const token = generateToken();
    const bill = {
      token,
      items: cart,
      total: calculateTotal(),
      timestamp: new Date().toLocaleString(),
    };
    setCurrentBill(bill);

    // Save to order history
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    localStorage.setItem("orderHistory", JSON.stringify([bill, ...orderHistory]));
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your token number is: ${token}`,
    });
  };

  const filteredMenu = selectedCategory === "All" 
    ? menuList 
    : menuList.filter(item => item.category === selectedCategory);

  const categories = ["All", ...new Set(menuList.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.header 
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
            Café Manager
          </h1>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/history")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              Order History
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Menu Section */}
          <section className="glass-effect rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Our Menu</h2>
              <Button
                onClick={() => setIsEditingMenu(!isEditingMenu)}
                variant="outline"
                className="hover:bg-amber-50"
              >
                {isEditingMenu ? "Done Editing" : "Edit Menu"}
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
              {filteredMenu.map((item) => {
                const Icon = item.icon;
                return (
                <motion.div
                  key={item.id}
                  className={`menu-card bg-gradient-to-br ${categoryColors[item.category]} shadow-md`}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                    </div>
                    {isEditingMenu ? (
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleUpdatePrice(item.id, e.target.value)
                        }
                        className="w-20 p-1 border rounded"
                        step="10"
                      />
                    ) : (
                      <span className="text-gray-600 font-semibold">₹{item.price}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  {!isEditingMenu && (
                    <Button
                      onClick={() => addToCart(item)}
                      className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      size="sm"
                    >
                      Add to Order
                    </Button>
                  )}
                </motion.div>
              )})}
            </div>
          </section>

          {/* Order Section */}
          <section className="glass-effect rounded-xl p-6 shadow-xl">
            <AnimatePresence mode="wait">
              {currentBill ? (
                <motion.div
                  key="bill"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg p-6 shadow-lg"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Bill Receipt</h2>
                    <p className="text-gray-500">Token: {currentBill.token}</p>
                    <p className="text-sm text-gray-500">{currentBill.timestamp}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {currentBill.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                        </div>
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount:</span>
                      <span>₹{currentBill.total}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setCurrentBill(null);
                      setCart([]);
                    }}
                    className="w-full mt-6"
                  >
                    New Order
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Current Order
                  </h2>
                  {cart.length === 0 ? (
                    <motion.p 
                      className="text-gray-500 text-center py-12 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Your order cart is empty
                    </motion.p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-white/50 shadow-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">
                                ₹{item.price}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                -
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-lg">Total Amount:</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-purple-600 bg-clip-text text-transparent">
                            ₹{calculateTotal()}
                          </span>
                        </div>
                        <Button 
                          onClick={placeOrder} 
                          className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700"
                        >
                          Place Order
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
