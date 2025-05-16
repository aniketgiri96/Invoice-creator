export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  tax?: number;
  discount?: number;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  logo?: string;
  companyName: string;
  companyAddress: string;
  companyEmail?: string;
  companyPhone?: string;
  clientName: string;
  clientAddress: string;
  clientEmail?: string;
  clientPhone?: string;
  notes?: string;
  termsAndConditions?: string;
  currency: string;
  taxRate: number;
  discountRate: number;
}

export interface Invoice {
  details: InvoiceDetails;
  items: InvoiceItem[];
}

export type ThemeMode = 'light' | 'dark';