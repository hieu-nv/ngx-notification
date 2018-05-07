import { TestBed, inject } from '@angular/core/testing';

import { NgxNotificationService } from './ngx-notification.service';

describe('NgxNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxNotificationService]
    });
  });

  it('should be created', inject([NgxNotificationService], (service: NgxNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
