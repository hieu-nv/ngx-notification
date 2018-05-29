import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationManager, Notification } from 'ngx-notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    bing = 'https://www.bing.com/az/hprichbg/rb/WineDay_EN-US9984225481_1920x1080.jpg';
    private notifications: Array<Notification>;
    constructor(private notificationManager: NotificationManager, private http: HttpClient) {
        this.notifications = new Array();
    }

    ngOnInit(): void {
        this.http.get('https://hieunv.herokuapp.com/api/bing/images').subscribe((obj: any) => {
            this.bing = 'https://bing.com' + obj.images[0].url;
        });
    }

    ngOnDestroy(): void {}

    public push($event) {
        const notification = new Notification();
        notification.body = new Date().getTime().toString() + ' This is a test message!';
        const i = Math.floor(Math.random() * 6);
        switch (i) {
            case 0:
                this.notificationManager.generic(notification);
                break;
            case 1:
                this.notificationManager.error(notification);
                break;
            case 2:
                this.notificationManager.warning(notification);
                break;
            case 3:
                this.notificationManager.info(notification);
                break;
            case 4:
                this.notificationManager.hint(notification);
                break;
            default:
                notification.closable = true;
                this.notificationManager.notify(notification);
                break;
        }

        this.notifications.push(notification);
    }

    public remove($event) {
        if (this.notifications.length > 0) {
            this.notificationManager.hide(this.notifications[0]);
            this.notifications.splice(0, 1);
        }
    }
}
