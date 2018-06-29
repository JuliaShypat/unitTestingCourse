import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Output } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from 'rxjs/observable/of';
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";


describe('HeroesCmponent (deep)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;
    
    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'Test 1', strength: 8},
            {id: 2, name: 'Test 2', strength: 24},
            {id: 3, name: 'Test 3', strength: 55},
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();
    })

    it('should render each hero as s hero component', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        // run ngOninit
        fixture.detectChanges();

        const heroComponens = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponens.length).toEqual(3);
        for (let i = 0; i < heroComponens.length; i++) {
            expect(heroComponens[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })
});