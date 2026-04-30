// import {
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   TemplateRef,
//   ViewChild,
//   SimpleChanges,
// } from '@angular/core';

// import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
// import {
//   NgbModal,
//   NgbModalConfig,
//   NgbModalRef,
//   NgbAccordionItem,
// } from '@ng-bootstrap/ng-bootstrap';
// import { environment } from '../../../../environments/environment';
// import { NgIf } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectionStrategy } from '@angular/core';

// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-croper',
  standalone: true,
  imports: [],
  templateUrl: './image-croper.html',
  styleUrl: './image-croper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCroper {
  // imageChangedEvent: any = '';
  // croppedImage: any = '';

  // private modalRef: any = NgbModalRef;

  // @ViewChild('imageView') private imageView!: TemplateRef<any>;

  // @Output() cropImage = new EventEmitter<any>();
  // @Input() label: string = '';
  // @Input() imgLink: string = '';
  // @Input() type: string = '';
  // @Input() aspectRatio: number = 1;
  // @Input() cropSize: string = '';

  // imageLink: string = '';

  // constructor(
  //   config: NgbModalConfig,
  //   private modalService: NgbModal,
  // ) {
  //   config.backdrop = 'static';
  //   config.keyboard = false;
  //   config.centered = true;
  // }

  // fileChangeHandler(event: any): void {
  //   this.imageChangedEvent = event;
  // }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event.base64;
  //   this.cropImage.emit(event.blob);
  //   this.imageChangedEvent = null;
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['imgLink']?.currentValue) {
  //     const image: string[] = changes['imgLink'].currentValue.split('|');
  //     const type = this.type || changes['type']?.currentValue;

  //     const urls = environment.urlObj(image[0]);
  //     this.imageLink = urls[type as keyof typeof urls] + image[1];
  //   }
  // }

  // showFullImg() {
  //   this.modalRef = this.modalService.open(this.imageView, { size: 'md' });
  // }

  // close() {
  //   this.modalRef.close();
  // }

  output?: NgxCroppedEvent;
  private modalRef: NgbModalRef | null = null;
  @ViewChild('imageView') private imageView: TemplateRef<ImageCroper> | undefined;

  @Output() cropImage = new EventEmitter<any>();
  @Input() label: string = '';
  @Input() imgLink: string = '';
  @Input() type: string = '';
  @Input() aspectRatio: string = '';
  @Input() cropSize: string = '';

  imageLink: string = '';

  constructor(
    private service: NgxPhotoEditorService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private zone: NgZone,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

  fileChangeHandler($event: any) {
    const file = $event.target.files[0];

    if (file) {
      let width = 600;
      let height = 600;

      if (this.cropSize?.includes('x')) {
        const [w, h] = this.cropSize.split('x').map(Number);
        if (w && h) {
          width = w;
          height = h;
        }
      }

      const ratio = width / height;

      this.service
        .open(file, {
          // ✅ FIXED HERE
          aspectRatio: ratio,
          autoCropArea: 1,
          resizeToWidth: width,
          resizeToHeight: height,
          cropBoxResizable: false,
          centerIndicator: true,
          modalMaxWidth: '600px',
          applyBtnText: 'Crop',
        })
        .subscribe((data) => {
          setTimeout(() => {
            this.output = data;
            this.cropImage.emit(data.file);
          });
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imgLink'] && changes['imgLink'].currentValue) {
      let image = changes['imgLink'].currentValue.split('|');
      let type = this.type || changes['type']?.currentValue;

      if (image) {
        // this.imageLink = environment.urlObj(image[0])[type] + image[1];
      }
    }
  }

  showFullImg() {
    this.modalRef = this.modalService.open(this.imageView, { size: 'md' });
  }

  close() {
    this.modalRef?.close();
  }
}
