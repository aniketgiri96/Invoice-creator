import React, { useRef } from 'react';
import { Download, FileText, RefreshCw } from 'lucide-react';
import { useInvoice } from '../context/InvoiceContext';
import { generatePDF } from '../utils/pdfGenerator';

interface ActionButtonsProps {
  previewRef: React.RefObject<HTMLDivElement>;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  showPreview: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ previewRef, setShowPreview, showPreview }) => {
  const { invoice, resetInvoice } = useInvoice();
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGeneratePDF = async () => {
    if (!previewRef.current) return;
    
    try {
      setIsGenerating(true);
      await generatePDF('invoice-preview', `Invoice-${invoice.details.invoiceNumber}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the invoice? All data will be lost.')) {
      resetInvoice();
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        type="button"
        onClick={() => setShowPreview(!showPreview)}
        className={`btn ${showPreview ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
      >
        <FileText size={18} />
        <span>{showPreview ? 'Edit Invoice' : 'Preview Invoice'}</span>
      </button>
      
      <button
        type="button"
        onClick={handleGeneratePDF}
        disabled={isGenerating}
        className="btn-primary flex items-center gap-2"
      >
        <Download size={18} />
        <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
      </button>
      
      <button
        type="button"
        onClick={handleReset}
        className="btn-secondary flex items-center gap-2 ml-auto"
      >
        <RefreshCw size={18} />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default ActionButtons;