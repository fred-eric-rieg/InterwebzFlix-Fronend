import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';

interface actor {
  id: number,
  name: string
}

@Pipe({
  name: 'actor',
  standalone: true
})
export class ActorPipe implements PipeTransform {

  actors: actor[] | null = null;

  constructor(private dataService: DataService) {
    this.dataService.actors$.subscribe((actor) => {
      this.actors = actor.results;
    });
  }


  transform(actor: number[] | null, ...args: string[]): string[] | null {
    if (actor) {
      let written = actor.map((item) => {
        // Map an array of genre ids to an array with their corresponding names
        return this.actors?.find((actor) => actor.id === item)?.name || 'Unknown';
      });
      return written;
    }
    return null;
  }

}
