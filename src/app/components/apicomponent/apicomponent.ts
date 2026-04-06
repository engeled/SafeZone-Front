import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIScannerService } from '../../services/apiscanner-service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
type ScanSummary = {
  fileName: string;
  fileSizeKB: number;
  status: string;
  malicious: number;
  suspicious: number;
  harmless: number;
  undetected: number;
  total: number;
  scanDate?: string;
  sha256?: string;
  permalink?: string;
};

type VendorRow = { engine: string; category: string; result: string | null };
@Component({
  selector: 'app-apicomponent',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatChipsModule, MatTableModule, MatProgressBarModule],
  templateUrl: './apicomponent.html',
  styleUrl: './apicomponent.css',
})
export class APIcomponent {
  selectedFile: File | null = null;
  loading = false;
  error?: string;

  summary?: ScanSummary;
  vendorRows: VendorRow[] = [];
  displayedColumns = ['engine', 'category', 'result'];

  constructor(private scanner: APIScannerService) {}

  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
    this.error = undefined;
    this.summary = undefined;
    this.vendorRows = [];
  }

  analyze() {
    if (!this.selectedFile) {
      this.error = 'Seleccione un archivo primero.';
      return;
    }
    this.loading = true;
    this.error = undefined;

    this.scanner.analyzeFile(this.selectedFile).subscribe({
      next: (resp) => {
        const mapped = this.mapResponse(resp, this.selectedFile!);
        this.summary = mapped.summary;
        this.vendorRows = mapped.vendorRows;
      },
      error: (err) => {
        this.error = err?.error?.error?.message || 'Error al analizar el archivo.';
      },
      complete: () => (this.loading = false),
    });
  }

   private mapResponse(response: any, file: File): { summary: ScanSummary; vendorRows: VendorRow[] } {
    const attrs = response?.data?.attributes ?? {};
    const stats = attrs?.stats ?? { malicious: 0, suspicious: 0, harmless: 0, undetected: 0 };

    const sha256: string | undefined = response?.data?.id;
    const permalink: string | undefined =
      response?.data?.links?.item ?? (sha256 ? `https://www.virustotal.com/gui/file/${sha256}` : undefined);

    const summary: ScanSummary = {
      fileName: file.name,
      fileSizeKB: Math.round(file.size / 1024),
      status: attrs?.status ?? 'unknown',
      malicious: stats?.malicious ?? 0,
      suspicious: stats?.suspicious ?? 0,
      harmless: stats?.harmless ?? 0,
      undetected: stats?.undetected ?? 0,
      total: (stats?.malicious ?? 0) + (stats?.suspicious ?? 0) + (stats?.harmless ?? 0) + (stats?.undetected ?? 0),
      scanDate: attrs?.date ? new Date(attrs.date * 1000).toLocaleString() : undefined,
      sha256,
      permalink,
    };

    const resultsObj = attrs?.results ?? {};
    const vendorRows: VendorRow[] = Object.values(resultsObj).map((r: any) => ({
      engine: r?.engine_name ?? r?.engine ?? 'Unknown',
      category: r?.category ?? 'undetected',
      result: r?.result ?? null,
    }))
    .sort((a, b) => {
      const rank = (c: string) => (c === 'malicious' ? 3 : c === 'suspicious' ? 2 : c === 'harmless' ? 1 : 0);
      return rank(b.category) - rank(a.category);
    });

    return { summary, vendorRows };
  }
}
