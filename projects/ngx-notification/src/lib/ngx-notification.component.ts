import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import {
    NotificationManager,
    NotificationAction,
    Notification
} from './ngx-notification.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ngx-notification',
    template: `
    <div class="{{ theme }}">
        <div>{{ notification.message }}</div>
    </div>
    `,
    styleUrls: ['./notification.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
    @Input() theme = 'default';
    @Input() public notification: Notification;

    private _timeout: any;

    constructor(private notificationManager: NotificationManager) {}

    ngOnInit(): void {
        this._timeout = setTimeout(() => {
            if (this.notification) {
                this.notificationManager.remove(this.notification);
            }
        }, 5000);
    }

    ngOnDestroy(): void {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }
}
import {
    state,
    style,
    animate,
    trigger,
    transition
} from '@angular/animations';

@Component({
    selector: 'ngx-notification-container',
    template: `
        <ngx-notification *ngFor="let notification of notifications" [@flyInOut]="'in'" [notification]="notification"></ngx-notification>'
    `,
    styleUrls: ['./notification-container.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-50%)'
                }),
                animate('0.75s 0.1s ease-in')
            ]),
            transition('* => void', [
                animate(
                    '0.75s 0.1s ease-out',
                    style({
                        opacity: 0,
                        transform: 'translateX(100%)'
                    })
                )
            ])
        ])
    ]
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
    notifications: Array<Notification>;

    private subscriptions: Array<any>;

    constructor(private notificationManager: NotificationManager) {
        this.notifications = new Array();
        this.subscriptions = new Array();
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.notificationManager.subscribe(x => {
                switch (x.action) {
                    case NotificationAction.PUSH_NOTIFICATION:
                        this.push(x.notification);
                        break;
                    case NotificationAction.REMOVE_NOTIFICATION:
                        this.remove(x.notification);
                        break;
                    default:
                        break;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    public push(notification: Notification) {
        this.notifications.push(notification);
    }

    public remove(notification: Notification) {
        const idx = this.notifications.indexOf(notification);
        if (idx >= 0) {
            this.notifications.splice(idx, 1);
        }
    }
}
