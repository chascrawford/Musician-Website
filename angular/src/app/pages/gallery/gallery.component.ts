import { Component, signal } from '@angular/core';
@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  images = signal<string[]>([
    'assets/images/gallery/1.jpg',
    'assets/images/gallery/2.jpg',
    'assets/images/gallery/3.jpg'
  ]);
}
