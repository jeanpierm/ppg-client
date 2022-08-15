import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { ReportsService } from '../../../core/services/reports.service';
import { incrementDate } from '../../../core/utils/date.util';
import { Log } from '../../interfaces/log.interface';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit, AfterViewInit {
  static readonly PATH = 'logs';

  readonly defaultPageSize = 10;
  readonly displayedColumns: string[] = [
    'logId',
    'level',
    'timestamp',
    'statusCode',
    'httpMethod',
    'path',
    'message',
    'ip',
    'userId',
  ];
  readonly exportColumns = [
    'ID',
    'LEVEL',
    'TIMESTAMP',
    'STATUS CODE',
    'HTTP METHOD',
    'PATH',
    'MESSAGE',
    'IP',
    'USER ID',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') input!: ElementRef;

  loading: boolean = false;
  logs: Log[] = [];
  resultsLength: number = 0;
  methodInputValue: string = '';
  levelInputValue: string = '';
  statusCodeInputValue: string = '';
  startDateInputValue?: Date = this.todayMinus30Days;
  endDateInputValue?: Date = this.today;
  methodOptions = [
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'PATCH', value: 'PATCH' },
    { label: 'DELETE', value: 'DELETE' },
  ];
  levelOptions = [
    { label: 'Log', value: 'log' },
    { label: 'Error', value: 'error' },
    { label: 'Debug', value: 'debug' },
  ];
  statusCodeOptions = [
    { label: 'OK (200)', value: '200' },
    { label: 'Created (201)', value: '201' },
    { label: 'Accepted (202)', value: '202' },
    { label: 'Non-Authoritative Information (203)', value: '203' },
    { label: 'No Content (204)', value: '204' },
    { label: 'Bad Request (400)', value: '400' },
    { label: 'Unauthorized (401)', value: '401' },
    { label: 'Payment Required (402)', value: '402' },
    { label: 'Forbidden (403)', value: '403' },
    { label: 'Not Found (404)', value: '404' },
    { label: 'Method Not Allowed (405)', value: '405' },
    { label: 'Not Acceptable (406)', value: '406' },
    { label: 'Proxy Authentication Required (407)', value: '407' },
    { label: 'Request Timeout (408)', value: '408' },
    { label: 'Conflict (409)', value: '409' },
    { label: 'Gone (410)', value: '410' },
    { label: 'Length Required (411)', value: '411' },
    { label: 'Precondition Required (412)', value: '412' },
    { label: 'Request Entry Too Large (413)', value: '413' },
    { label: 'Request-URI Too Long (414)', value: '414' },
    { label: 'Unsupported Media Type (415)', value: '415' },
    { label: 'Requested Range Not Satisfiable (416)', value: '416' },
    { label: 'Expectation Failed (417)', value: '417' },
    { label: "I'm a teapot (418)", value: '418' },
    { label: 'Too Many Requests (429)', value: '429' },
    { label: 'Internal Server Error (500)', value: '500' },
    { label: 'Not Implemented (501)', value: '501' },
    { label: 'Bad Gateway (502)', value: '502' },
    { label: 'Service Unavailable (503)', value: '503' },
    { label: 'Gateway Timeout (504)', value: '504' },
    { label: 'HTTP Version Not Supported (505)', value: '505' },
  ];

  get todayMinus30Days(): Date {
    return new Date(this.today.setDate(this.today.getDate() - 30));
  }

  get today(): Date {
    return new Date();
  }

  constructor(
    private readonly logsService: LogsService,
    private readonly reportsService: ReportsService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.loadPage();
        this.paginator.firstPage();
      });

    this.paginator.page.subscribe(() => this.loadPage());
  }

  loadPage() {
    this.loading = true;
    this.logsService
      .getLogs({
        size: this.paginator?.pageSize || this.defaultPageSize,
        page: (this.paginator?.pageIndex || 0) + 1,
        search: this.input?.nativeElement.value || '',
        httpMethod: this.methodInputValue,
        level: this.levelInputValue,
        statusCode: this.statusCodeInputValue,
        startDate: this.startDateInputValue?.toISOString(),
        endDate:
          this.endDateInputValue &&
          incrementDate(this.endDateInputValue, 1)?.toISOString(),
      })
      .subscribe({
        next: ({ data, totalItems }) => {
          this.loading = false;
          this.logs = data;
          this.resultsLength = totalItems;
        },
        error: () => {
          this.alertService.error();
        },
      });
  }

  exportXlsx() {
    const data = this.logs.map(
      ({
        logId,
        level,
        timestamp,
        statusCode,
        httpMethod,
        path,
        message,
        ip,
        userId,
      }) => ({
        ID: logId,
        LEVEL: level,
        TIMESTAMP: timestamp,
        STATUS: statusCode,
        METHOD: httpMethod,
        PATH: path,
        MESSAGE: message,
        IP: ip,
        'USER ID': userId,
      })
    );
    const filename = `logs_report_${new Date().getTime()}`;
    this.reportsService.exportXlsx(data, filename);
  }

  exportPdf() {
    const head = [this.exportColumns];
    const body = this.logs.map(
      ({
        logId,
        level,
        timestamp,
        statusCode,
        httpMethod,
        path,
        message,
        ip,
        userId,
      }) => [
        logId,
        level,
        timestamp,
        statusCode,
        httpMethod,
        path,
        message,
        ip,
        userId,
      ]
    );
    const filename = `logs_report_${new Date().getTime()}`;
    this.reportsService.exportPdf(head, body, filename);
  }
}
