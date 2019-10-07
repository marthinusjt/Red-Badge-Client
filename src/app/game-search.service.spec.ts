import { TestBed } from '@angular/core/testing';

import { GameSearchService } from './game-search.service';

describe('GameSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameSearchService = TestBed.get(GameSearchService);
    expect(service).toBeTruthy();
  });
});
