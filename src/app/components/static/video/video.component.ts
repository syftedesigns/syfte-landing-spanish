import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
   public anchor: number = 0;
   public height: number = 0;
  constructor(public dialogRef: MatDialogRef<VideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
    this.anchor = this.data.width;
    this.height = this.data.height;
  }
  closeVideo(): void {
    this.dialogRef.close();
  }
}
