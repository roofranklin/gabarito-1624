import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AccountStateService } from '../../../../../core/services/account-state.service';

interface ConfirmDeleteDialogData {
  description: string;
  id: string;
  amount: number;
}

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.css',
})
export class ConfirmDeleteDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<ConfirmDeleteDialogComponent, boolean>
  );
  private readonly accountState = inject(AccountStateService);
  readonly data = inject<ConfirmDeleteDialogData>(MAT_DIALOG_DATA);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  confirmDelete(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.accountState.deleteTransactionWithBalance(this.data.id, this.data.amount).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set(
          'Falha ao conectar com o servidor. Tente novamente.'
        );
        this.isLoading.set(false);
      },
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
