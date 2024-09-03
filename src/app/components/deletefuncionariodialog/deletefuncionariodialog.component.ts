import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-funcionario-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './deletefuncionariodialog.component.html',
  styleUrls: ['./deletefuncionariodialog.component.css'],
})
export class DeleteFuncionarioDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFuncionarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
