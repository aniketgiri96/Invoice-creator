import React, { forwardRef } from 'react';
import { useInvoice } from '../context/InvoiceContext';

interface InvoicePreviewProps {
  className?: string;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ className = '' }, ref) => {
    const {
      invoice,
      calculateSubtotal,
      calculateTaxAmount,
      calculateDiscountAmount,
      calculateTotal,
    } = useInvoice();
    const { details, items } = invoice;

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

    const currency = getCurrencySymbol(details.currency);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    return (
      <div
        ref={ref}
        className={`bg-white text-black p-8 shadow-lg mx-auto max-w-4xl ${className}`}
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">INVOICE</h1>
            <p className="text-sm text-gray-600">#{details.invoiceNumber}</p>
          </div>
          
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-800">{details.companyName}</h2>
            <p className="text-sm text-gray-600 whitespace-pre-line">{details.companyAddress}</p>
            {details.companyEmail && <p className="text-sm text-gray-600">{details.companyEmail}</p>}
            {details.companyPhone && <p className="text-sm text-gray-600">{details.companyPhone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-gray-500 font-medium mb-2">Bill To:</h3>
            <p className="font-semibold text-gray-800">{details.clientName}</p>
            <p className="text-sm text-gray-600 whitespace-pre-line">{details.clientAddress}</p>
            {details.clientEmail && <p className="text-sm text-gray-600">{details.clientEmail}</p>}
            {details.clientPhone && <p className="text-sm text-gray-600">{details.clientPhone}</p>}
          </div>
          
          <div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <div className="text-gray-500">Issue Date:</div>
              <div className="text-right font-medium">{formatDate(details.date)}</div>
              
              <div className="text-gray-500">Due Date:</div>
              <div className="text-right font-medium">{formatDate(details.dueDate)}</div>
            </div>
          </div>
        </div>

        <table className="w-full mb-8 text-sm">
          <thead>
            <tr className="border-y border-gray-300">
              <th className="py-2 text-left font-semibold text-gray-700 w-2/5">Description</th>
              <th className="py-2 text-center font-semibold text-gray-700">Qty</th>
              <th className="py-2 text-right font-semibold text-gray-700">Price</th>
              <th className="py-2 text-right font-semibold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 text-gray-800">{item.description || 'Item description'}</td>
                <td className="py-3 text-center text-gray-800">{item.quantity}</td>
                <td className="py-3 text-right text-gray-800">{currency}{item.price.toFixed(2)}</td>
                <td className="py-3 text-right font-medium text-gray-800">
                  {currency}{(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{currency}{calculateSubtotal().toFixed(2)}</span>
            </div>
            
            {details.taxRate > 0 && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Tax ({details.taxRate}%):</span>
                <span>{currency}{calculateTaxAmount().toFixed(2)}</span>
              </div>
            )}
            
            {details.discountRate > 0 && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Discount ({details.discountRate}%):</span>
                <span>-{currency}{calculateDiscountAmount().toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-300 mt-2">
              <span>Total:</span>
              <span>{currency}{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {(details.notes || details.termsAndConditions) && (
          <div className="mt-12 border-t border-gray-300 pt-4">
            {details.notes && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-1">Notes</h4>
                <p className="text-sm text-gray-600">{details.notes}</p>
              </div>
            )}
            
            {details.termsAndConditions && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Terms & Conditions</h4>
                <p className="text-sm text-gray-600">{details.termsAndConditions}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';

export default InvoicePreview;