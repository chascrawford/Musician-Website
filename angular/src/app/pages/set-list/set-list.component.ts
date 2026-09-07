import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SetlistService } from '../../core/services/setlist.service';
import { SetlistEntry } from '../../core/models/setlist';
@Component({
  selector: 'app-set-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent {
  private svc = inject(SetlistService);
  all: SetlistEntry[] = [];
  q = '';
  by: 'all' | 'section' | 'artist' | 'song' | 'originals' = 'all';
  section = '';
  constructor() {
    this.svc.getAll().subscribe(list => {
      console.log('Setlist loaded', list);
      this.all = list
    });
  }
  sections() {
    return Array.from(new Set(this.all.map(x => x.section)));
  }
  filtered() {
    const q = this.q.toLowerCase().trim();
    return this.all.filter(item => {
      if (this.section && item.section !== this.section) return false;
      if (this.by === 'originals') return item.section.toLowerCase() === 'originals';
      if (!q) return true;
      const hay = (this.by === 'artist' ? item.artist : this.by === 'song' ? item.song : this.by === 'section' ? item.section : `${item.artist} ${item.song} ${item.section}`).toLowerCase();
      return hay.includes(q);
    });
  }
}
