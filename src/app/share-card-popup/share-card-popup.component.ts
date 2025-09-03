import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-card-popup',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './share-card-popup.component.html',
  styleUrl: './share-card-popup.component.css'
})
export class ShareCardPopupComponent {
  constructor(public dialogRef: MatDialogRef<ShareCardPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
