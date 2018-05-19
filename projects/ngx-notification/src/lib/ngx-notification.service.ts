import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface Notification {
    message: string;
}

export interface NotificationEventArgs {
    action: NotificationAction;
    notification: Notification;
}

export enum NotificationAction {
    PUSH_NOTIFICATION = 'push',
    REMOVE_NOTIFICATION = 'remove'
}

@Injectable({
    providedIn: 'root'
})
export class NotificationManager {
    private _emitter: EventEmitter<NotificationEventArgs> = new EventEmitter(true);

    constructor() {}

    public subscribe(next?: any, error?: any, complete?: any): any {
        return this._emitter.subscribe(next, error, complete);
    }


    public push(notification: Notification): Notification {
        const args = {
            action: NotificationAction.PUSH_NOTIFICATION,
            notification: notification
        };
        this._emitter.emit(args);
        return notification;
    }

    public remove(notification: Notification): Notification {
        const args = {
            action: NotificationAction.REMOVE_NOTIFICATION,
            notification: notification
        };

        this._emitter.emit(args);
        return notification;
    }
}
