import { Injectable } from '@angular/core';
import { ReportConfig } from '../interfaces/report-config.interface';
import { ReportType } from '../types/report-type.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  readonly FONT_SIZE_TITLE = 16;
  readonly FONT_SIZE_ISSUE_DATE = 10;

  constructor(private readonly authService: AuthService) {}

  exportXlsx(data: unknown[], type: ReportType) {
    const issueDate = new Date();
    const filename = `${type}_report_${issueDate.getTime()}`;
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Technologies');
      xlsx.writeFile(workbook, `${filename}.xlsx`);
    });
  }

  exportPdf({ head, body, type, options }: ReportConfig) {
    const issueDate = new Date();
    const filename = `${type}_report_${issueDate.getTime()}`;
    const title = `REPORTE DE ${resolveReportTitle(type)}`;
    const issueDateString = `Fecha de emisión: ${issueDate.toLocaleDateString()}`;
    const userString = `ID Usuario: ${this.authService.authAccount.userId}`;
    const platformName =
      'PLATAFORMA WEB PPG (GENERADOR DE PERFILES PROFESIONALES)';

    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((autoTable) => {
        const doc = new jsPDF.default(options);
        doc.setFontSize(this.FONT_SIZE_TITLE);
        doc.text(title, 14, 20);
        doc.setFontSize(this.FONT_SIZE_ISSUE_DATE);
        doc.text(issueDateString, 14, 9);
        doc.text(platformName, 75, 9);
        autoTable.default(doc, {
          head,
          body,
          margin: { top: 25 },
        });

        doc.text(userString, 14, doc.internal.pageSize.height - 10);

        const pageCount = doc.getNumberOfPages(); //Total Page Number
        for (let i = 0; i < pageCount; i++) {
          doc.setPage(i);
          const pageCurrent = doc.getCurrentPageInfo().pageNumber; //Current Page
          doc.setFontSize(12);
          doc.text(
            `${pageCurrent}/${pageCount}`,
            doc.internal.pageSize.width - 20,
            doc.internal.pageSize.height - 10
          );
        }

        doc.save(`${filename}.pdf`);
      });
    });
  }
}

const reportTitleResolver: Record<ReportType, string> = {
  technology: 'TECNOLOGÍAS',
  technology_type: 'TIPOS DE TECNOLOGÍA',
  user: 'USUARIOS',
  log: 'LOGS',
};

function resolveReportTitle(type: string) {
  return reportTitleResolver[type] || '';
}
