import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationManager, Notification } from 'ngx-notification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    private notifications: Array<Notification>;
    constructor(private notificationManager: NotificationManager) {
        this.notifications = new Array();
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {}

    public push($event) {
        this.notifications.push(
            this.notificationManager.push({
                message: new Date().getTime().toString()
            })
        );
    }

    public remove($event) {
        if (this.notifications.length > 0) {
            this.notificationManager.remove(this.notifications[0]);
            this.notifications.splice(0, 1);
        }
    }
}
