import React, { useState, useEffect } from 'react';
import './categories.css';
import axios from 'axios';

function Categorias() {
  const [categoria, setCategoria] = useState([]);
  const [libros, setLibros] = useState([]);
  const [inputValue, SetInputValue] = useState('');

  async function getCategories() {
    try {
      const responseCategorias = await axios.get(
        'http://localhost:3001/categoria'
      );
      if (responseCategorias.status === 200) {
        setCategoria(responseCategorias.data.respuesta);
        console.log('asd');
      }
      const responseLibros = await axios.get('http://localhost:3001/libros');

      setLibros(responseLibros.data.respuesta);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    getCategories();
  }, [categoria]);

  async function handleInputChange(e) {
    SetInputValue(e.target.value);
  }
  async function handleSubmit() {
    try {
      if (inputValue.length <= 3) {
        alert('El nombre de la categoria debe tener al menos 4 caracteres.');
      } else {
        const responsePost = await axios.post(
          'http://localhost:3001/categoria',
          {
            id: categoria.length.id + 1,
            nombre: `${inputValue}`,
          }
        );
        setCategoria([
          ...categoria,
          { id: categoria.length.id + 1, nombre: `${inputValue}` },
        ]);
      }
      SetInputValue('');
    } catch (error) {
      console.error(error.message);
    }
  }
  async function handleDelete(id) {
    try {
      const responseDelete = await axios.delete(
        `http://localhost:3001/categoria/${id}`
      );
    } catch (error) {
      console.error(error.message);
      alert('No se pueden borrar categorias con libros asociados');
    }
  }

  return (
    <>
      {categoria.map((cat) => (
        <h3 key={cat.id}>
          <button
            type='button'
            onClick={() => handleDelete(cat.id)}
            key={cat.nombre}>
            x
          </button>
          {cat.nombre}          
        </h3>
      ))}
      Nombre de la categoria
      <input
        type='text'
        name='nuevaCat'
        onChange={handleInputChange}
        value={inputValue}
      />
      <button type='submit' onClick={handleSubmit}>
        agregar categoria
      </button>
    </>
  );
}

export default Categorias;
