import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];

  public selectedHero?: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  public ngOnInit(): void {
    this.getHeroes();
  }

  public onSelect(hero: Hero): void {
    if(this.selectedHero === hero){
      this.selectedHero = undefined;
    }
    else {
    this.selectedHero = hero;
    }
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  public getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
