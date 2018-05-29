import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { NotificationManager, NotificationAction, Notification } from './ngx-notification.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ngx-notification',
    template: `
    <div class="aui-message closeable {{ notification.type }}">
        <p *ngIf="!!notification.title" class="title">
            <strong>{{ notification.title }}</strong>
        </p>
        <div [innerHtml]="notification.body"></div>
        <span *ngIf="!!notification.closable" class="aui-icon icon-close" role="button" tabindex="0" (click)="onClose($event)"></span>
        <div class="backdrop"></div>
    </div>
    `,
    styleUrls: ['./notification.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
    @Input() theme = 'default';
    @Input() timeout = -1;

    @Input() public notification: Notification;

    private _timeout: any;

    constructor(private notificationManager: NotificationManager) {}

    ngOnInit(): void {
        if (this.timeout < 0) {
            return;
        }
        this._timeout = setTimeout(() => {
            this.notificationManager.hide(this.notification);
        }, this.timeout);
    }

    ngOnDestroy(): void {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }

    public onClose($event): void {
        this.notificationManager.hide(this.notification);
    }
}
import { state, style, animate, trigger, transition } from '@angular/animations';
import { timeout } from 'q';

@Component({
    selector: 'ngx-notification-container',
    template: `
        <ngx-notification *ngFor="let notification of notifications" [@flyInOut]="'in'" [notification]="notification" timeout="{{ timeout }}"></ngx-notification>
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
    @Input() timeout = -1;

    notifications: Array<Notification>;

    private subscriptions: Array<any>;

    constructor(private notificationManager: NotificationManager) {
        this.notifications = new Array();
        this.subscriptions = new Array();
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.notificationManager.subscribe(x => {
                switch (x.args.action) {
                    case NotificationAction.PUSH_NOTIFICATION:
                        this.push(x.args.notification);
                        break;
                    case NotificationAction.HIDE_NOTIFICATION:
                        this.hide(x.args.notification);
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

    public hide(notification: Notification) {
        const idx = this.notifications.indexOf(notification);
        if (idx >= 0) {
            this.notifications.splice(idx, 1);
        }
    }
}
