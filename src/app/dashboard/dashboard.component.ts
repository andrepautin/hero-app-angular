import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [{id: 1, name: 'andre'}]; 
  slicedHeroes: Hero[] = [];
  lastHeroId: number = -1;
  @ViewChild('heroName') myHeroName!: ElementRef<HTMLInputElement>;

  constructor(private heroService: HeroService, private router: Router) { 
    // this.myHeroName = new ElementRef<HTMLInputElement>();
  }

  ngOnInit(){
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getPaginatedHeroes(this.lastHeroId).subscribe(response => {
      if (response) {
        this.slicedHeroes = response as Hero[];
        this.lastHeroId = this.slicedHeroes[this.slicedHeroes.length - 1].id;
      }
    });
  }

  loadMore() {
    this.heroService.getPaginatedHeroes(this.lastHeroId).subscribe(response => {
      if (response) {
        this.slicedHeroes.push.apply(this.slicedHeroes, response as Hero[]);
        this.lastHeroId = this.slicedHeroes[this.slicedHeroes.length - 1].id;
      }
    })
  }

  addHero() {
    console.log(this.myHeroName);
    if (this.myHeroName.nativeElement.value) {
      this.heroService.addHero({"name": this.myHeroName.nativeElement.value}).subscribe(
        response => {
        alert("added new hero!");
        console.log(response);
        },
        error => {
          alert("error: could not add hero");
          console.log("error: ", error);
        })
    }
    this.myHeroName.nativeElement.value = " ";  
  } 
}
