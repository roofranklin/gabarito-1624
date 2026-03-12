import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  // A URL da nossa API Fake do json-server
  private apiUrl = 'http://localhost:3000/transactions';

  // Injeção de Dependência do HttpClient
  constructor(private http: HttpClient) {}

  // O método agora retorna um Observable que emite um Array de Transactions
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, transaction);
  }

  updateTransaction(transaction: Transaction, id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
