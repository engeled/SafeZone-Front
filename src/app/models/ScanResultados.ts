export interface ScanResult {
  fileName: string;
  status: string;
  malicious: number;
  suspicious: number;
  harmless: number;
  undetected: number;
  total: number;
  scanDate?: string;
  sha256?: string;
  permalink?: string;
}