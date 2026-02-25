import { Component } from '@angular/core';
import {  MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  imports: [MatDialogModule],
  templateUrl: './modal-confirm.html',
  styleUrl: './modal-confirm.css',
})
export class ModalConfirm {
  constructor(public dialogRef: MatDialogRef<ModalConfirm>) {
    
  }
}
