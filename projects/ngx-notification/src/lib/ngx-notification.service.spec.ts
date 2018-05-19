import { TestBed, inject } from '@angular/core/testing';

import { NotificationManager } from './ngx-notification.service';

describe('NgxNotificationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationManager]
        });
    });

    it(
        'should be created',
        inject([NotificationManager], (service: NotificationManager) => {
            expect(service).toBeTruthy();
        })
    );
});
