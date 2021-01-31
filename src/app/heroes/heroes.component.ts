import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService} from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: "Andre",
  }

  heroes: Hero[] = [];
  temp: any = {
    age: 2,
    temp2: {
      id: 4,
    }
  }


  constructor(private heroService: HeroService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(response => {
      this.heroes = response as Hero[];
    })
  }

  deleteHero(hero: Hero) :  void {
    this.heroService.deleteHero(hero).subscribe(response => {
      // this.heroes = this.heroes.filter((h, index, heroes) => {
      //   return h != hero;
      // });
      const index: number = this.heroes.indexOf(hero);
      if (index !== -1) {
        this.heroes.splice(index, 1);
      }
    });
    
    //filtered => [6,  =>7, 8, 9]
    //array => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    // this.heroes = this.heroes.filter(h => h !== hero);
  }
  myFunc() {
    this.temp.age = 3;
    this.temp.temp2.id = 9;
  }
}
