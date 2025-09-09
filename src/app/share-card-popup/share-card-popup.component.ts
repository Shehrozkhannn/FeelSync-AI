import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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
  @ViewChild('shareCard', { read: ElementRef }) shareCard!: ElementRef;
   isImageLoaded = false;
  constructor(public dialogRef: MatDialogRef<ShareCardPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }

  ngAfterViewInit() {
    // Debug check
    console.log('Share card element:', this.shareCard?.nativeElement);
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

  shareCardNow() {
     if (!this.shareCard?.nativeElement) {
      console.error('Share card element not found');
      return;
    }

    import('html2canvas').then(html2canvas => {
      html2canvas.default(this.shareCard.nativeElement).then(canvas => {
        canvas.toBlob(blob => {
          if (!blob) return;

          const file = new File([blob], 'ayah-card.png', { type: 'image/png' });

          if (navigator.share) {
            navigator.share({
              title: 'Daily Ayah',
              text: 'Check out this beautiful ayah!',
              files: [file]
            });
          } else {
            this.downloadCard(); // fallback
          }
        });
      });
    });
  }

  downloadCard() {
    if (!this.shareCard) return;

    import('html2canvas').then(html2canvas => {
      html2canvas.default(this.shareCard.nativeElement,{}).then(canvas => {
        const link = document.createElement('a');
        link.download = 'ayah-card.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  }

  onImageLoad() {
    this.isImageLoaded = true;
    console.log('Image loaded successfully');
  }

}
