import { Injectable } from '@angular/core';
import { RowInput } from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  exportXlsx(data: unknown[], fileName: string) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Technologies');
      xlsx.writeFile(workbook, `${fileName}.xlsx`);
    });
  }

  exportPdf(head: RowInput[], body: RowInput[], filename: string) {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((autoTable) => {
        const doc = new jsPDF.default();
        autoTable.default(doc, {
          head,
          body,
        });
        doc.save(`${filename}.pdf`);
      });
    });
  }
}
