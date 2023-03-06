import Select from 'components/Select/Select';
import React, { useEffect, useState } from 'react';

const defaultVegetables = ['Помідори', 'Огірки', 'Капуста', 'Буряк', 'Редиска'];
const vegetablesWithExpired = [...defaultVegetables, 'Картопля', 'Морква'];
const defaultFruits = ['Апельсини', 'Мандарини', 'Яблука', 'Груші', 'Хурма'];
const fruitsWithExpired = [...defaultFruits, 'Авокадо', 'Виноград'];
const Goods = () => {
  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewGoodsWithExpiredDate, setViewGoodsWithExpiredDate] =
    useState(false);

  const [selectedVegetables, setSelectedVegetables] = useState('');
  const [selectedFruit, setSelectedFruit] = useState('');

  useEffect(() => {
    if (viewGoodsWithExpiredDate) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFruits(fruitsWithExpired);
        setVegetables(vegetablesWithExpired);
      }, 2000);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFruits(defaultFruits);
      setVegetables(defaultVegetables);
    }, 2000);
  }, [viewGoodsWithExpiredDate]);

  const selectFruit = fruit => setSelectedFruit(fruit);
  return (
    <div>
      {loading && <div>Завантажуємо дані</div>}
      <Select
        title="овоч"
        options={vegetables}
        selected={selectedVegetables}
        onSelect={setSelectedVegetables}
      />
      <Select
        title="фрукт"
        options={fruits}
        selected={selectedFruit}
        onSelect={selectFruit}
      />
      <label>
        <input
          type="checkbox"
          value={viewGoodsWithExpiredDate}
          onChange={({ target: { checked } }) =>
            setViewGoodsWithExpiredDate(checked)
          }
        />
        Показати просрочені товари
      </label>
    </div>
  );
};

export default Goods;
