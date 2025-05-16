import React from 'react';
import { Trash2 } from 'lucide-react';
import { useInvoice } from '../context/InvoiceContext';

const InvoiceItemsForm: React.FC = () => {
  const { invoice, addItem, updateItem, removeItem } = useInvoice();
  const { items } = invoice;

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      case 'CAD': return 'C$';
      case 'AUD': return 'A$';
      default: return '$';
    }
  };

  const calculateItemTotal = (quantity: number, price: number) => {
    return (quantity * price).toFixed(2);
  };

  return (
    <div className="card mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-secondary-900 dark:text-gray-100">Items</h2>
        <button 
          type="button" 
          onClick={addItem}
          className="btn-primary text-sm flex items-center gap-1"
        >
          <span>+ Add Item</span>
        </button>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-secondary-700">
              <th className="text-left p-2 text-sm font-medium text-gray-500 dark:text-gray-400 w-2/5">Description</th>
              <th className="text-left p-2 text-sm font-medium text-gray-500 dark:text-gray-400">Qty</th>
              <th className="text-left p-2 text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
              <th className="text-right p-2 text-sm font-medium text-gray-500 dark:text-gray-400">Total</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="table-row animate-fade-in">
                <td className="p-2">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Item description"
                    className="w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 0 })}
                    className="w-full"
                  />
                </td>
                <td className="p-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400">
                        {getCurrencySymbol(invoice.details.currency)}
                      </span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7"
                    />
                  </div>
                </td>
                <td className="p-2 text-right font-medium">
                  {getCurrencySymbol(invoice.details.currency)}{calculateItemTotal(item.quantity, item.price)}
                </td>
                <td className="p-2 text-center">
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceItemsForm;