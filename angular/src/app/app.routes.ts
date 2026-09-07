import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetListComponent } from './pages/set-list/set-list.component';
import { PerformancesComponent } from './pages/performances/performances.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { BioComponent } from './pages/bio/bio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'set-list', component: SetListComponent },
  { path: 'performances', component: PerformancesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'bio', component: BioComponent },
  { path: '**', redirectTo: '' }
];
