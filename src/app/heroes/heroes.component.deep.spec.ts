import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Output } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("HeroesCmponent (deep)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "Test 1", strength: 8 },
      { id: 2, name: "Test 2", strength: 24 },
      { id: 3, name: "Test 3", strength: 55 }
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();
  });

  it("should render each hero as s hero component", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // run ngOninit
    fixture.detectChanges();

    const heroComponens = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponens.length).toEqual(3);
    for (let i = 0; i < heroComponens.length; i++) {
      expect(heroComponens[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
  it(`should call heroService.deleteHero when Hero Component's
        detete button is clicked`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponens = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    (<HeroComponent>heroComponens[0].componentInstance).delete.emit(undefined);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should call heroService.deleteHero when Hero Component's
    detete button is clicked - second version`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponens = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    //(<HeroComponent>heroComponens[0].componentInstance).delete.emit(undefined);
    heroComponens[0].triggerEventHandler("delete", null);
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button clicked', () => {
    spyOn(fixture.componentInstance, "delete");
    fixture.detectChanges();
    const name = "Mr. Ice";
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });
});
