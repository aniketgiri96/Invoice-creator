import React from 'react';
import { useInvoice } from '../context/InvoiceContext';

const InvoiceDetailsForm: React.FC = () => {
  const { invoice, updateInvoiceDetails } = useInvoice();
  const { details } = invoice;

  return (
    <div className="card mb-6 transition-all">
      <h2 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-gray-100">Invoice Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Invoice Number
          </label>
          <input
            id="invoiceNumber"
            type="text"
            value={details.invoiceNumber}
            onChange={(e) => updateInvoiceDetails({ invoiceNumber: e.target.value })}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Issue Date
            </label>
            <input
              id="date"
              type="date"
              value={details.date}
              onChange={(e) => updateInvoiceDetails({ date: e.target.value })}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={details.dueDate}
              onChange={(e) => updateInvoiceDetails({ dueDate: e.target.value })}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="animate-fade-in">
          <h3 className="text-md font-medium mb-2 text-secondary-800 dark:text-gray-200">From</h3>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                value={details.companyName}
                onChange={(e) => updateInvoiceDetails({ companyName: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Address
              </label>
              <textarea
                id="companyAddress"
                value={details.companyAddress}
                onChange={(e) => updateInvoiceDetails({ companyAddress: e.target.value })}
                rows={2}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="companyEmail"
                  type="email"
                  value={details.companyEmail || ''}
                  onChange={(e) => updateInvoiceDetails({ companyEmail: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  id="companyPhone"
                  type="text"
                  value={details.companyPhone || ''}
                  onChange={(e) => updateInvoiceDetails({ companyPhone: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="animate-fade-in">
          <h3 className="text-md font-medium mb-2 text-secondary-800 dark:text-gray-200">Bill To</h3>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Name
              </label>
              <input
                id="clientName"
                type="text"
                value={details.clientName}
                onChange={(e) => updateInvoiceDetails({ clientName: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="clientAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Address
              </label>
              <textarea
                id="clientAddress"
                value={details.clientAddress}
                onChange={(e) => updateInvoiceDetails({ clientAddress: e.target.value })}
                rows={2}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  id="clientEmail"
                  type="email"
                  value={details.clientEmail || ''}
                  onChange={(e) => updateInvoiceDetails({ clientEmail: e.target.value })}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  id="clientPhone"
                  type="text"
                  value={details.clientPhone || ''}
                  onChange={(e) => updateInvoiceDetails({ clientPhone: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Currency
          </label>
          <select
            id="currency"
            value={details.currency}
            onChange={(e) => updateInvoiceDetails({ currency: e.target.value })}
            className="w-full"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
            <option value="CAD">CAD (C$)</option>
            <option value="AUD">AUD (A$)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tax Rate (%)
          </label>
          <input
            id="taxRate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={details.taxRate}
            onChange={(e) => updateInvoiceDetails({ taxRate: parseFloat(e.target.value) || 0 })}
            className="w-full"
          />
        </div>
        
        <div>
          <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Discount Rate (%)
          </label>
          <input
            id="discountRate"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={details.discountRate}
            onChange={(e) => updateInvoiceDetails({ discountRate: parseFloat(e.target.value) || 0 })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsForm;