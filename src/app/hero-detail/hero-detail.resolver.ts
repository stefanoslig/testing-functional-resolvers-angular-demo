import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

export const heroResolver: ResolveFn<Hero> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(HeroService).getHero(route.params['id']!);
};
