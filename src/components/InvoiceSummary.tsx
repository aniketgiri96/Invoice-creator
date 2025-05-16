import React from 'react';
import { useInvoice } from '../context/InvoiceContext';

const InvoiceSummary: React.FC = () => {
  const {
    invoice,
    calculateSubtotal,
    calculateTaxAmount,
    calculateDiscountAmount,
    calculateTotal,
  } = useInvoice();

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

  const currency = getCurrencySymbol(invoice.details.currency);

  return (
    <div className="card animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-gray-100">Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center pb-2">
          <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
          <span className="font-medium">
            {currency}{calculateSubtotal().toFixed(2)}
          </span>
        </div>
        
        {invoice.details.taxRate > 0 && (
          <div className="flex justify-between items-center pb-2 text-gray-600 dark:text-gray-400">
            <span>Tax ({invoice.details.taxRate}%):</span>
            <span>{currency}{calculateTaxAmount().toFixed(2)}</span>
          </div>
        )}
        
        {invoice.details.discountRate > 0 && (
          <div className="flex justify-between items-center pb-2 text-gray-600 dark:text-gray-400">
            <span>Discount ({invoice.details.discountRate}%):</span>
            <span>-{currency}{calculateDiscountAmount().toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-secondary-700">
          <span className="text-lg font-semibold text-secondary-900 dark:text-white">Total:</span>
          <span className="text-lg font-bold text-primary-600 dark:text-primary-500">
            {currency}{calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={invoice.details.notes || ''}
            onChange={(e) => invoice.details.notes = e.target.value}
            placeholder="Payment terms, delivery notes, etc."
            rows={3}
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Terms and Conditions
          </label>
          <textarea
            id="termsAndConditions"
            value={invoice.details.termsAndConditions || ''}
            onChange={(e) => invoice.details.termsAndConditions = e.target.value}
            placeholder="Standard terms and conditions"
            rows={3}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummary;