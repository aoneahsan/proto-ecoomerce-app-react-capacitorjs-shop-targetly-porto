import { type ZRSelectOptions } from '@/types/elements/Select.type';

export enum ZClientSearchKeyE {
  name = 'name',
  company = 'company',
  email = 'email'
}

export interface ZClientI {
  id?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  company?: string;
  country?: string;
  notes?: string;
  company_registration_number?: string;
  city?: string;
  zipcode?: string;
  vat_number?: string;
  default_currency?: ZRSelectOptions;
  bank_details?: string;
  invoices_count?: number;
}
