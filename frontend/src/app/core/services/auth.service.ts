import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signal para a interface saber se está logado
  isAuthenticated = signal<boolean>(this.hasToken());
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(email: string, password: string): boolean {
    // Simulação estúpida para fins didáticos (na vida real chamaríamos a API)
    if (email === 'admin@banco.com' && password === '123456') {
      const fakeJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.falso-payload.falsa-assinatura';
      if (this.isBrowser) {
        localStorage.setItem('token', fakeJwt);
      }
      this.isAuthenticated.set(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private hasToken(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
