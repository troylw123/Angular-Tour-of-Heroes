import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { tap, catchError, map, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ListResponse {
  heroes: Hero[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})

export class HeroService {
  private readonly heroesUrl = 'https://bootcamp.unclezach.org/api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ClientID: 'zachary',
    }),
  };

  
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<ListResponse>(this.heroesUrl, {...this.httpOptions})
    .pipe(
      tap(_ => this.log('fetched heroes')),
      map((response) => response.heroes),
      catchError(this.handleError<Hero[]>('getHeroes', []))
  );
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  }
