import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero = {
    id: 0,
    name: 'default',
  };
  heroId: number = 0;
  isEditing: boolean = false;
  @ViewChild('newName') updatedName!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute, 
    private heroService: HeroService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.heroId = +id;
    }
    this.getHero(this.heroId);
  }

  getHero(id: number) {
    this.heroService.getHero(id).subscribe(response => {
      this.hero = response as Hero; 
    })
  }

  goBack() {
    this.location.back();
  }
  
  clickName() {
    this.isEditing = true;
    console.log("hero name clicked");

    // if (this.updatedName.nativeElement.value) {
    //   this.heroService.updatedHero({"newName": this.updatedName.nativeElement.value}).subscribe(response => {
    //     console.log(response);
    //   });
    // }
  }
  
  deleteHero() {
    this.heroService.deleteHero(this.hero).subscribe(
      response => { 
        alert("You deleted " + this.hero.name);
        // this.router.navigateByUrl("/dashboard");
        this.location.back();
      },
      error => {
        alert("error: could not delete hero");
        console.log("error: ", error)
        this.location.back();
      }
    );
  }

  updateHero() {
    let myInputTag: HTMLInputElement = this.updatedName.nativeElement;
    if (this.isEditing && myInputTag.value) {
      let newHeroObj = {
        id: this.hero.id,
        name: myInputTag.value, 
      }
      this.heroService.updateHero(newHeroObj).subscribe(
        response => {
          this.hero = response as Hero;
          this.isEditing = false;
          console.log(response);
        },
        error => {
          alert("error: could not update hero");
          console.log("error: ", error);
          this.location.back();
        }
      )
    }
    // this.updatedName.nativeElement.value='';
  }
}
