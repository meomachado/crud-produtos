import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import api from '../services/api'; 

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  const navigate = useNavigate(); 
  
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);  
    try {
      const response = await api.get('/products'); 
      setProducts(response.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Falha ao carregar produtos. Tente novamente."); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
        alert('Produto excluído com sucesso!');
      } catch (err) {
        console.error('Erro ao excluir produto:', err);
        setError('Falha ao excluir produto. Tente novamente.');
      }
    }
  };
  
  const handleEdit = (id) => {
    navigate(`/editar/${id}`);
  };
  
  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>Erro: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <Link to="/cadastrar" style={{ textDecoration: 'none' }}>
        <button style={{ marginBottom: '20px' }}>Cadastrar Novo Produto</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>R$ {parseFloat(product.price).toFixed(2).replace('.', ',')}</td>
              <td>
                <button
                  onClick={() => handleEdit(product.id)}
                  className="btn-edit" 
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn-delete" 
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;