import { Injectable, SecurityContext } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { not } from '@angular/compiler/src/output/output_ast';
import { DomSanitizer } from '@angular/platform-browser';

export class Notification {
    private _type: string;
    private _title: string;
    private _body: string;

    public constructor() {}

    public get type(): string {
        return this._type;
    }

    public set type(type: string) {
        this._type = type;
    }

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get body(): string {
        return this._body;
    }

    public set body(body: string) {
        this._body = body;
    }
}

export interface EventArgs<T> {
    source: any;
    args: T;
}

export interface NotificationEventArgs {
    action: NotificationAction;
    notification: Notification;
}

export enum NotificationAction {
    PUSH_NOTIFICATION = 'push',
    HIDE_NOTIFICATION = 'hide'
}

export enum NotificationType {
    GENERIC = 'aui-message-generic',
    ERROR = 'aui-message-error',
    WARNING = 'aui-message-warning',
    SUCCESS = 'aui-message-success',
    INFO = 'aui-message-info',
    HINT = 'aui-message-hint'
}

@Injectable({
    providedIn: 'root'
})
export class NotificationManager {
    private _emitter: EventEmitter<
        EventArgs<NotificationEventArgs>
    > = new EventEmitter(true);

    constructor(private domSanitizer: DomSanitizer) {}

    public subscribe(next?: any, error?: any, complete?: any): any {
        return this._emitter.subscribe(next, error, complete);
    }

    public notify(notification: Notification): void {
        notification.body = this.domSanitizer.sanitize(
            SecurityContext.HTML,
            notification.body
        );
        const args = {
            action: NotificationAction.PUSH_NOTIFICATION,
            notification: notification
        };
        this._emitter.emit({
            source: this,
            args: args
        });
    }

    public generic(notification: Notification): void {
        notification.type = notification.type || NotificationType.GENERIC;
        notification.title = notification.title || 'Generic!';
        this.notify(notification);
    }

    public error(notification: Notification): void {
        notification.type = notification.type || NotificationType.ERROR;
        notification.title = notification.title || 'Error!';
        this.notify(notification);
    }

    public warning(notification: Notification): void {
        notification.type = notification.type || NotificationType.WARNING;
        notification.title = notification.title || 'Warning!';
        this.notify(notification);
    }

    public success(notification: Notification): void {
        notification.type = notification.type || NotificationType.SUCCESS;
        notification.title = notification.title || 'Success!';
        this.notify(notification);
    }

    public info(notification: Notification): void {
        notification.type = notification.type || NotificationType.INFO;
        notification.title = notification.title || 'Info!';
        this.notify(notification);
    }

    public hint(notification: Notification): void {
        notification.type = notification.type || NotificationType.HINT;
        notification.title = notification.title || 'Hint!';
        this.notify(notification);
    }


    public hide(notification: Notification): Notification {
        const args = {
            action: NotificationAction.HIDE_NOTIFICATION,
            notification: notification
        };

        this._emitter.emit({
            source: this,
            args: args
        });
        return notification;
    }
}
