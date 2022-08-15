import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaginatedApiResponse } from '../../core/models/api-response.model';
import { PaginatedApiQuery } from '../../core/models/paginated-api-query.interface';
import { GetLogsQuery } from '../interfaces/get-logs-query.interface';
import { Log } from '../interfaces/log.interface';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  static readonly LOGS_URL = environment.ppgApi.logs;

  constructor(private readonly http: HttpClient) {}

  getLogs({
    size,
    page,
    search,
    startDate,
    endDate,
    httpMethod,
    level,
    statusCode,
  }: PaginatedApiQuery & GetLogsQuery = {}) {
    const url = new URL(LogsService.LOGS_URL);
    if (size) url.searchParams.set('size', size.toString());
    if (page) url.searchParams.set('page', page.toString());
    if (search) url.searchParams.set('search', search);
    if (startDate) url.searchParams.set('startDate', startDate);
    if (endDate) url.searchParams.set('endDate', endDate);
    if (httpMethod) url.searchParams.set('httpMethod', httpMethod);
    if (level) url.searchParams.set('level', level);
    if (statusCode) url.searchParams.set('statusCode', statusCode);

    return this.http.get<PaginatedApiResponse<Log>>(url.toString());
  }
}
