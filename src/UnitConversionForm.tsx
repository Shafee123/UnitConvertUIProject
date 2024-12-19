import React, { useState, useEffect } from 'react';
import { getUnitCategories, getUnitsByCategory, getConversionRate, saveConversionHistory } from './services/api';
import { UnitCategory, Unit, ConversionHistory } from './types';

const UnitConversionForm: React.FC = () => {
  const [categories, setCategories] = useState<UnitCategory[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [fromUnit, setFromUnit] = useState<Unit | null>(null);
  const [toUnit, setToUnit] = useState<Unit | null>(null);
  const [value, setValue] = useState<number>(0);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getUnitCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId: number) => {
    const unitsData = await getUnitsByCategory(categoryId);
    setUnits(unitsData);
  };

  const handleConversion = async () => {
    if (!fromUnit || !toUnit) return;
    
    const conversion = await getConversionRate(fromUnit.id, toUnit.id);
    const result = value * conversion.rate;
    setConvertedValue(result);

    const history: ConversionHistory = {
      id:0,
      fromValue: value,
      fromUnitId: fromUnit.id,
      toUnitId: toUnit.id,
      toValue: result,
      conversionDate: new Date().toISOString(),
    };
    saveConversionHistory(history);
  };

  return (
    <div>
      <h1>Unit Conversion</h1>
      <select onChange={(e) => handleCategoryChange(Number(e.target.value))}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>

      <select onChange={(e) => setFromUnit(units.find(unit => unit.id === Number(e.target.value)) || null)}>
        <option value="">Select From Unit</option>
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>{unit.name}</option>
        ))}
      </select>

      <select onChange={(e) => setToUnit(units.find(unit => unit.id === Number(e.target.value)) || null)}>
        <option value="">Select To Unit</option>
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>{unit.name}</option>
        ))}
      </select>

      <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />

      <button onClick={handleConversion}>Convert</button>

      {convertedValue !== null && <div>Converted Value: {convertedValue}</div>}
    </div>
  );
};

export default UnitConversionForm;