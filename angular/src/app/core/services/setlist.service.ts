import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SetlistEntry } from '../models/setlist';
import { environment } from '../../environment';
@Injectable({ providedIn: 'root' })
export class SetlistService {
  http = inject(HttpClient);
  getAll(): Observable<SetlistEntry[]> {
    return this.http.get<SetlistEntry[]>(environment.setlistApiUrl)
      .pipe(
        map(items => items.map(item => ({
          section: item.section || '',
          artist: item.artist,
          song: item.song
        })))
      );
  }
}
