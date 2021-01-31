import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }

  public getHeroes() {
    this.messageService.add('HeroService: fetched heroes');
    return this.httpClient.get('https://hero-server-andre.herokuapp.com/api/heroes');
  }

  public getHero(id: number) {
    this.messageService.add("HeroService: fetched hero id = " + id);
    return this.httpClient.get('https://hero-server-andre.herokuapp.com/api/heroes/' + id);
  }

  public getPaginatedHeroes(lastHeroId: number) {
    this.messageService.add('HeroService: fetched heroes');
    return this.httpClient.get('https://hero-server-andre.herokuapp.com/api/heroes?lastHeroId=' + lastHeroId);
  }

  public addHero(hero: any) {
    console.log('added new hero: ', hero);
    // send post request to server to add new hero?
    this.messageService.add("HeroService: ADDED NEW HERO: " + hero.heroName);
    return this.httpClient.post('https://hero-server-andre.herokuapp.com/api/heroes', hero);
  }

  public deleteHero(hero: any) {
    console.log("DELETED HERO: " + hero.name);
    this.messageService.add("HeroService: DELETED HERO: " + hero.name);
    return this.httpClient.delete("https://hero-server-andre.herokuapp.com/api/heroes/" + hero.id);
  }

  // when save button clicked 
  public updateHero(hero: Hero) {
    // const body = {
    //   headers: new HttpHeaders()
    //   .set("Content-Type", "application/json") 
    // }

    console.log("UPDATED HERO: " + hero.name);
    this.messageService.add("HeroService: UPDATED HERO: " + hero.name);
    return this.httpClient.put("https://hero-server-andre.herokuapp.com/api/heroes/" + hero.id, hero);
  }
}

