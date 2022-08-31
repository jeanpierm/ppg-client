import { jsPDFOptions } from 'jspdf';
import { RowInput } from 'jspdf-autotable';
import { ReportType } from '../types/report-type.type';

export interface ReportConfig {
  head: RowInput[];
  body: RowInput[];
  type: ReportType;
  options?: jsPDFOptions;
}
