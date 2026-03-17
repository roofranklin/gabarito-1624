import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  createTransaction(
    transaction: Omit<Transaction, 'id'>
  ): Observable<Transaction> {
    // Criando Headers
    const headers = new HttpHeaders({
      Authorization: 'Bearer token-secreto-banco-123',
      'Content-Type': 'application/json',
    });

    // POST precisa da URL, do Corpo (transaction) e das Opções (headers)
    return this.http.post<Transaction>(this.apiUrl, transaction, { headers });
  }

  updateTransaction(transaction: Transaction, id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<void> {
    // Exemplo de como enviar um param (mesmo que a URL já tenha o ID)
    const params = new HttpParams().set('motivo', 'cancelamento');

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { params });
  }
}
