import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-cliente-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './delete-cliente-dialog.component.html',
  styleUrls: ['./delete-cliente-dialog.component.css'],
})
export class DeleteClienteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
