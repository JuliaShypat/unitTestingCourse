import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('Hero Service', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
               HeroService,
               {provide: MessageService, useValue: mockMessageService}
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
    });

    describe('getHero()', () => {
        it('should call get with correct url', 
        inject([HeroService, HttpTestingController], 
            (service: HeroService, controller: HttpTestingController) => {
            
            service.getHero(4).subscribe();
        }));
    })
})