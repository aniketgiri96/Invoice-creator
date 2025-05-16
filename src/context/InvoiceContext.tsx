import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Invoice, InvoiceItem, InvoiceDetails } from '../types';

interface InvoiceContextType {
  invoice: Invoice;
  updateInvoiceDetails: (details: Partial<InvoiceDetails>) => void;
  addItem: () => void;
  updateItem: (id: string, item: Partial<InvoiceItem>) => void;
  removeItem: (id: string) => void;
  resetInvoice: () => void;
  calculateSubtotal: () => number;
  calculateTaxAmount: () => number;
  calculateDiscountAmount: () => number;
  calculateTotal: () => number;
}

const defaultInvoiceDetails: InvoiceDetails = {
  invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
  date: new Date().toISOString().substring(0, 10),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
  companyName: 'Your Company',
  companyAddress: '123 Business St, City, Country',
  clientName: 'Client Name',
  clientAddress: 'Client Address',
  currency: 'USD',
  taxRate: 0,
  discountRate: 0,
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoice, setInvoice] = useState<Invoice>({
    details: defaultInvoiceDetails,
    items: [createDefaultItem()],
  });

  function createDefaultItem(): InvoiceItem {
    return {
      id: uuidv4(),
      description: '',
      quantity: 1,
      price: 0,
    };
  }

  const updateInvoiceDetails = (details: Partial<InvoiceDetails>) => {
    setInvoice(prev => ({
      ...prev,
      details: {
        ...prev.details,
        ...details,
      },
    }));
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, createDefaultItem()],
    }));
  };

  const updateItem = (id: string, itemUpdates: Partial<InvoiceItem>) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, ...itemUpdates } : item
      ),
    }));
  };

  const removeItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const resetInvoice = () => {
    setInvoice({
      details: {
        ...defaultInvoiceDetails,
        invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().substring(0, 10),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      },
      items: [createDefaultItem()],
    });
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => {
      return sum + (item.quantity * item.price);
    }, 0);
  };

  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * invoice.details.taxRate) / 100;
  };

  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * invoice.details.discountRate) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxAmount();
    const discountAmount = calculateDiscountAmount();
    
    return subtotal + taxAmount - discountAmount;
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        updateInvoiceDetails,
        addItem,
        updateItem,
        removeItem,
        resetInvoice,
        calculateSubtotal,
        calculateTaxAmount,
        calculateDiscountAmount,
        calculateTotal,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};