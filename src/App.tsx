import React, { useState, useRef } from 'react';
import Header from './components/Header';
import InvoiceDetailsForm from './components/InvoiceDetailsForm';
import InvoiceItemsForm from './components/InvoiceItemsForm';
import InvoiceSummary from './components/InvoiceSummary';
import InvoicePreview from './components/InvoicePreview';
import ActionButtons from './components/ActionButtons';
import { ThemeProvider } from './context/ThemeContext';
import { InvoiceProvider } from './context/InvoiceContext';

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider>
      <InvoiceProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-secondary-900 transition-colors duration-200">
          <Header />
          
          <main className="container mx-auto px-4 py-8 max-w-5xl">
            <ActionButtons 
              previewRef={previewRef}
              setShowPreview={setShowPreview}
              showPreview={showPreview}
            />
            
            {showPreview ? (
              <div className="flex justify-center bg-gray-100 p-4 rounded-lg shadow overflow-auto">
                <InvoicePreview ref={previewRef} id="invoice-preview" className="scale-90 origin-top" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <InvoiceDetailsForm />
                  <InvoiceItemsForm />
                </div>
                <div>
                  <InvoiceSummary />
                </div>
              </div>
            )}
          </main>
        </div>
      </InvoiceProvider>
    </ThemeProvider>
  );
}

export default App;