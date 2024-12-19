import axios from 'axios';
import { UnitCategory, Unit, ConversionHistory } from '../types';

const API_URL = 'http://localhost:7250/api';

export const getUnitCategories = async () => {
  const response = await axios.get<UnitCategory[]>(`${API_URL}/unit/categories`);
  return response.data;
};

export const getUnitsByCategory = async (categoryId: number) => {
  const response = await axios.get<Unit[]>(`${API_URL}/unit/units/${categoryId}`);
  return response.data;
};

export const getConversionRate = async (fromUnitId: number, toUnitId: number) => {
  const response = await axios.get(`${API_URL}/unit/conversion/${fromUnitId}/${toUnitId}`);
  return response.data;
};

export const getConversionHistory = async () => {
  const response = await axios.get<ConversionHistory[]>(`${API_URL}/conversionhistory`);
  return response.data;
};

export const saveConversionHistory = async (history: ConversionHistory) => {
  const response = await axios.post(`${API_URL}/conversionhistory`, history);
  return response.data;
};