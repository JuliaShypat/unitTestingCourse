import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('HeroComponent', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {id: 1, name: 'Test name', strength: 3};

        expect(fixture.componentInstance.hero.name).toEqual('Test name');
    });

    it('should render heroname inside an anchor tag', () => {
        fixture.componentInstance.hero = {id: 1, name: 'Test name', strength: 3};
        fixture.detectChanges();
        
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Test name');
    })
})