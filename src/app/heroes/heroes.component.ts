import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes = HEROES;

  public selectedHero?: Hero;

  constructor() {}

  public ngOnInit(): void {}

  public onSelect(hero: Hero): void {
    if(this.selectedHero === hero){
      this.selectedHero = undefined;
    }
    else {
    this.selectedHero = hero;
    }
  }
}
