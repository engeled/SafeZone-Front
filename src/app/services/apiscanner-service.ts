import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, interval, Observable, of, switchMap, takeWhile, throwError } from 'rxjs';
interface AnalysisResponse {
  data: {
    id: string;
    attributes?: {
      status: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
}
@Injectable({
  providedIn: 'root',
})
export class APIScannerService {
 private apiKey: string = 'b850359f8137a7872cbe422fd2e96f9e33a613557d845ebcb7eb09cad519061a';
  private baseUrl: string = 'https://www.virustotal.com/api/v3';

  
  constructor(private http: HttpClient) {}

  analyzeFile(file: File): Observable<AnalysisResponse> {
    const headers = new HttpHeaders({ 'x-apikey': this.apiKey });
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<AnalysisResponse>(`${this.baseUrl}/files`, formData, { headers }).pipe(
      catchError((err: any) => {
        if (err?.status === 409) {
          
          const id =
            err.error?.data?.id ||
            err.error?.resource?.id ||

            (typeof err.error?.error?.message === 'string'
              ? (err.error.error.message.match(/([A-Za-z0-9=:_-]{10,})/) || [])[1]
              : undefined);

          if (id) {
            return of({ data: { id } } as AnalysisResponse);
          }
        }
        return throwError(() => err);
      }),
      switchMap((response: AnalysisResponse) => this.getAnalysisResult(response.data.id))
    );
  }

  getAnalysisResult(analysisId: string): Observable<AnalysisResponse> {
    const headers = new HttpHeaders({ 'x-apikey': this.apiKey });
    return interval(2000).pipe(
      switchMap(() => this.http.get<AnalysisResponse>(`${this.baseUrl}/analyses/${analysisId}`, { headers })),
      takeWhile((resp: AnalysisResponse) =>
        resp.data.attributes?.status === 'queued' || resp.data.attributes?.status === 'in-progress',
        true
      )
    );
  }
}