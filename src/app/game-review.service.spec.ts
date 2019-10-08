import { TestBed } from '@angular/core/testing';

import { GameReviewService } from './game-review.service';

describe('GameReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameReviewService = TestBed.get(GameReviewService);
    expect(service).toBeTruthy();
  });
});
