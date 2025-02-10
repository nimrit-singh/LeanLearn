import { CommonQty } from "@/types/utilsInteface";

const BASE_URL = 'https://lean-learn-backend-ai-ex3e.onrender.com';
export const quantitiesApi = {
  getAll: async (): Promise<CommonQty[]> => {
    try {
      const response = await fetch(`${BASE_URL}/qty/`);
      if (!response.ok) throw new Error('Failed to fetch qty');
      return response.json();
    } catch (error) {
      console.error('Error fetching Qty:', error);
      throw error;
    }
  },
  create: async (quantity: {
    qty_name:string;
    qty_symbol:string;
  }) => {
    try {
      const response = await fetch(`${BASE_URL}/qty/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(quantity)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create Quantity: ${errorText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error details:', error);
      throw error;
    }
  }
 
}