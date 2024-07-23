import { sha512 } from 'crypto-hash';

export default async function hashValue(value) {
  try {
    return await sha512(value);
    
  } catch (error) {
    console.error('Error hashing value:', error);
    throw error; 
  }
}
