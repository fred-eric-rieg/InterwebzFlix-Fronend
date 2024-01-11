import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';

interface genre {
  id: number,
  name: string
}

@Pipe({
  name: 'genre',
  standalone: true
})
export class GenrePipe implements PipeTransform {

  genres: genre[] | null = null;

  constructor(private dataService: DataService) {
    this.dataService.genres$.subscribe((genres) => {
      this.genres = genres.results;
    });
  }


  transform(genre: number[] | null, ...args: string[]): string[] | null {
    if (genre) {
      console.log('genre', genre);
      console.log('this.genres', this.genres);
      let written = genre.map((item) => {
        // Map an array of genre ids to an array with their corresponding names
        return this.genres?.find((genre) => genre.id === item)?.name || 'Unknown';
      });
      return written;
    }
    return null;
  }

}
