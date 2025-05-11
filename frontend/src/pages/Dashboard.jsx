import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const navigate = useNavigate();
  const productsPerPage = 5; // Number of products per page

  // Expanded product data structure with more products for each category
  const productData = [
    // Electrical Instruments
    {
      id: 1,
      category: "Electrical Instruments",
      name: "Digital Multimeter (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 20.00,
      current_price: 18.00,
      inventory_status: "In Stock"
    },
    {
      id: 2,
      category: "Electrical Instruments",
      name: "Clamp Meter (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 35.00,
      current_price: 32.50,
      inventory_status: "In Stock"
    },
    {
      id: 3,
      category: "Electrical Instruments",
      name: "Oscilloscope (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 250.00,
      current_price: 239.99,
      inventory_status: "Low Stock"
    },
    {
      id: 4,
      category: "Electrical Instruments",
      name: "Function Generator (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 180.00,
      current_price: 175.00,
      inventory_status: "In Stock"
    },
    
    // Clothing
    {
      id: 5,
      category: "Clothing",
      name: "T-Shirt (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 10.00,
      current_price: 10.00,
      inventory_status: "In Stock"
    },
    {
      id: 6,
      category: "Clothing",
      name: "Hoodie (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 30.00,
      current_price: 29.99,
      inventory_status: "In Stock"
    },
    {
      id: 7,
      category: "Clothing",
      name: "Denim Jeans (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 35.00,
      current_price: 32.00,
      inventory_status: "Low Stock"
    },
    {
      id: 8,
      category: "Clothing",
      name: "Cap (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 15.00,
      current_price: 12.99,
      inventory_status: "In Stock"
    },
    
    // Accessories
    {
      id: 9,
      category: "Accessories",
      name: "Leather Backpack (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 50.00,
      current_price: 45.00,
      inventory_status: "Low Stock"
    },
    {
      id: 10,
      category: "Accessories",
      name: "Watch (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 75.00,
      current_price: 69.99,
      inventory_status: "In Stock"
    },
    {
      id: 11,
      category: "Accessories",
      name: "Sunglasses (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 25.00,
      current_price: 24.50,
      inventory_status: "Out of Stock"
    },
    {
      id: 12,
      category: "Accessories",
      name: "Belt (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 18.00,
      current_price: 15.99,
      inventory_status: "In Stock"
    },
    
    // Home & Living
    {
      id: 13,
      category: "Home & Living",
      name: "Table Lamp (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 30.00,
      current_price: 32.00,
      inventory_status: "Out of Stock"
    },
    {
      id: 14,
      category: "Home & Living",
      name: "Cushion Cover (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 12.00,
      current_price: 10.99,
      inventory_status: "In Stock"
    },
    {
      id: 15,
      category: "Home & Living",
      name: "Desk Organizer (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 22.00,
      current_price: 19.99,
      inventory_status: "Low Stock"
    },
    {
      id: 16,
      category: "Home & Living",
      name: "Wall Clock (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 25.00,
      current_price: 23.99,
      inventory_status: "In Stock"
    },
    
    // Kitchen
    {
      id: 17,
      category: "Kitchen",
      name: "Saucepan (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 22.00,
      current_price: 23.00,
      inventory_status: "In Stock"
    },
    {
      id: 18,
      category: "Kitchen",
      name: "Knife Set (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 45.00,
      current_price: 42.99,
      inventory_status: "In Stock"
    },
    {
      id: 19,
      category: "Kitchen",
      name: "Coffee Maker (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 60.00,
      current_price: 55.00,
      inventory_status: "Low Stock"
    },
    {
      id: 20,
      category: "Kitchen",
      name: "Blender (T-BMC)",
      img: '/api/placeholder/100/100',
      base_price: 40.00,
      current_price: 38.99,
      inventory_status: "In Stock"
    }
  ];

  const categories = [
    "All Products",
    "Electrical Instruments",
    "Clothing",
    "Accessories",
    "Home & Living",
    "Kitchen"
  ];

  // Fetch predicted prices from backend
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const productsWithPredictions = await Promise.all(
          productData.map(async (product) => {
            const response = await axios.post('http://localhost:5000/predict_price', {
              base_price: product.base_price,
              competitor_price: product.current_price,
              demand_level: product.inventory_status === "In Stock" ? 1.2 : 
                          product.inventory_status === "Low Stock" ? 0.9 : 0.5,
              inventory_level: product.inventory_status === "In Stock" ? 1.0 : 
                            product.inventory_status === "Low Stock" ? 0.5 : 0.1
            });
            
            return {
              ...product,
              suggested_price: response.data.prediction
            };
          })
        );
        
        setProducts(productsWithPredictions);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        // Fallback to mock data if API fails
        const mockPredictions = productData.map(p => ({
          ...p,
          suggested_price: p.base_price * (p.inventory_status === "In Stock" ? 0.95 : 
                          p.inventory_status === "Low Stock" ? 1.05 : 1.1)
        }));
        setProducts(mockPredictions);
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  // Filter products by category and sort alphabetically for "All Products"
  const filteredProducts = selectedCategory === "All Products" 
    ? [...products].sort((a, b) => a.name.localeCompare(b.name)) 
    : products.filter(p => p.category === selectedCategory);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleMLDashboardClick = () => {
    navigate("/ml-dashboard");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the product list
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Sidebar - Categories */}
      <div style={{
        width: '250px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px 0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <h2 style={{
          padding: '0 20px 20px',
          borderBottom: '1px solid #34495e',
          marginBottom: '20px'
        }}>Categories</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.map(category => (
            <li 
              key={category}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                backgroundColor: category === selectedCategory ? '#3498db' : 'transparent',
                transition: 'background-color 0.3s'
              }}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1); // Reset to first page when changing category
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '20px',
        marginLeft: '250px', // Account for sidebar width
        width: 'calc(100% - 250px)',
        minHeight: '100vh'
      }}>
        <h1 style={{
          color: '#2c3e50',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: '600'
        }}>DASHBOARD</h1>

        {/* Category Filter Display */}
        <div style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '4px',
          marginBottom: '20px',
          display: 'inline-block'
        }}>
          Currently showing: {selectedCategory}
        </div>

        {/* Products Table */}
        {currentProducts.length > 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            overflow: 'auto'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '800px'
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#f1f5f9',
                  textAlign: 'left'
                }}>
                  <th style={{ padding: '15px', width: '15%' }}>Product Inventory Status</th>
                  <th style={{ padding: '15px', width: '25%' }}>Product Name</th>
                  <th style={{ padding: '15px', width: '15%' }}>Base Price ($)</th>
                  <th style={{ padding: '15px', width: '15%' }}>Current Price ($)</th>
                  <th style={{ padding: '15px', width: '15%' }}>Suggested Price ($)</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map(product => (
                  <tr key={product.id} style={{
                    borderBottom: '1px solid #eee'
                  }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: 
                            product.inventory_status === "In Stock" ? '#2ecc71' :
                            product.inventory_status === "Low Stock" ? '#f39c12' : '#e74c3c',
                          color: 'white',
                          marginRight: '10px'
                        }}>
                          {product.inventory_status}
                        </span>
                        {product.category}
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <img 
                          src={product.img} 
                          alt={product.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain',
                            marginRight: '10px',
                            borderRadius: '4px'
                          }} 
                        />
                        {product.name}
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>${product.base_price.toFixed(2)}</td>
                    <td style={{ padding: '15px' }}>${product.current_price.toFixed(2)}</td>
                    <td style={{ 
                      padding: '15px',
                      color: product.suggested_price < product.current_price ? '#2ecc71' : 
                            product.suggested_price > product.current_price ? '#e74c3c' : '#3498db',
                      fontWeight: 'bold'
                    }}>
                      ${product.suggested_price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#7f8c8d'
          }}>
            No products found in this category
          </div>
        )}

        {/* Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <div style={{ color: '#7f8c8d' }}>
            Showing {currentProducts.length} of {filteredProducts.length} products (page {currentPage} of {totalPages || 1})
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: '8px 12px',
                backgroundColor: currentPage === 1 ? '#ecf0f1' : '#3498db',
                color: currentPage === 1 ? '#95a5a6' : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.7 : 1
              }}
            >
              Prev
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Calculate which page numbers to show
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: currentPage === pageNum ? '#3498db' : '#ecf0f1',
                    color: currentPage === pageNum ? 'white' : '#2c3e50',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {/* Next button */}
            <button 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 12px',
                backgroundColor: currentPage === totalPages ? '#ecf0f1' : '#3498db',
                color: currentPage === totalPages ? '#95a5a6' : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.7 : 1
              }}
            >
              Next
            </button>
          </div>
        </div>

        <button 
          onClick={handleMLDashboardClick}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Go to ML Dashboard
        </button>
      </div>
    </div>
  );
}

export default Dashboard;