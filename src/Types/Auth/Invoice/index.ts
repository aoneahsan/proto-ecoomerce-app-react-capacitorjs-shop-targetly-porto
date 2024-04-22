import { type ZRSelectOptions } from '@/Types/Elements/Select.type';
import { type ZClientI } from '../Clients/index.type';

export enum ZInvoiceTypeE {
  inv = 'inv',
  exp = 'exp'
}

export enum ZInvoiceSearchKeyE {
  invoice_no = 'invoice_no',
  client_name = 'client_name'
}

export interface ZInvoiceItemI {
  description?: string;
  quantity?: number;
  rate?: number;
  amount?: number;
}

export interface ZInvoiceI {
  id?: string;
  invoice_no?: string;
  user?: {
    company: string;
    address: string;
    company_number: string;
    vat_number: string;
    zipcode: number;
    country: string;
    city: string;
  };
  client?: ZClientI | null;
  date?: string;
  due_date?: string;
  items?: ZInvoiceItemI[] | null;
  is_invoice_vat_applied?: boolean;
  vat_value?: number;
  invoice_notes?: string;
  invoice_bank_details?: string;
  invoice_logo?: {
    url?: string;
    path?: string;
    fileBase64?: string;
  };
  invoice_logo_file?: File | null;
  sub_total?: string;
  total?: string;
  selected_currency?: ZRSelectOptions | null;
  created_at?: string;

  //
  invoice_no_edit_mode?: boolean;
}
