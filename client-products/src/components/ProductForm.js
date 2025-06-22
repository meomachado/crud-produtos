import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newProduct = {
      name,
      price,
    };

    try {
      await api.post('/products', newProduct);
      alert('Produto cadastrado com sucesso!');
      navigate('/'); 
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert('Falha no cadastro do produto.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit}>
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
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ProductForm;