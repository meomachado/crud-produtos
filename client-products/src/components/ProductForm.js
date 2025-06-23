// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await api.get(`/products/${id}`);
          setName(response.data.name);
          setPrice(parseFloat(response.data.price).toString());
        } catch (err) {
          console.error('Erro ao carregar produto para edição:', err);
          setError('Falha ao carregar produto para edição. Tente novamente.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setIsEditing(false);
      setName('');
      setPrice('');
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError('O preço não pode ser negativo ou um valor inválido.');
      setLoading(false);
      return;
    }

    const formattedPrice = parsedPrice.toFixed(2);

    const productData = { name, price: formattedPrice };

    try {
      let response;
      if (isEditing) {
        response = await api.put(`/products/${id}`, { id, ...productData });
        alert('Produto atualizado com sucesso!');
      } else {
        response = await api.post('/products', productData);
        alert('Produto cadastrado com sucesso!');
      }
      navigate('/');
    } catch (err) {
      console.error(`Erro ao ${isEditing ? 'atualizar' : 'cadastrar'} produto:`, err);
      setError(`Falha ao ${isEditing ? 'atualizar' : 'cadastrar'} produto. Tente novamente.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) return <p>Carregando dados do produto para edição...</p>;
  if (loading && !isEditing) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
      {error && <p className="message-error">{error}</p>}

      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Preço:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar')}
      </button>
      <button
        type="button"
        onClick={() => navigate('/')}
        style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}
      >
        Voltar
      </button>
    </form>
  );
}

export default ProductForm;
