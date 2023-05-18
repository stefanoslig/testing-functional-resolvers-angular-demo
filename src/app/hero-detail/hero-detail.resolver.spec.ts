import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { cold } from 'jasmine-marbles';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { heroResolver } from './hero-detail.resolver';

const mockRoute = { params: { id: 100 } } as unknown as ActivatedRouteSnapshot;
const mockHero: Hero = { name: 'Stef lig', id: 100 };

describe('heroResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useValue: { getHero: () => of(mockHero) } },
      ],
    });
  });

  it('should return the requested hero', () => {
    const result = runInInjectionContext(
      TestBed.inject(EnvironmentInjector),
      () => heroResolver(mockRoute, {} as RouterStateSnapshot)
    );
    expect(result).toBeObservable(cold('(a|)', { a: mockHero }));
  });
});
