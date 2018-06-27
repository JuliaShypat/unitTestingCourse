import { HeroesComponent } from "./heroes.component";
import { of } from 'rxjs/observable/of';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'Test 1', strength: 8},
            {id: 2, name: 'Test 2', strength: 24},
            {id: 3, name: 'Test 3', strength: 55},
        ];
        mockHeroService = jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero'
        ]);
        component = new HeroesComponent(mockHeroService);
    })

    describe('delete', () => {
        it('should remove an indicated hero from the heroes list', () => {
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;
            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        })

        it('should call deleteHero with correct hero value', () => {
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROES;
            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })
    })
})