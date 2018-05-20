# ngx-notification

[![Build Status](https://travis-ci.org/tickify/ngx-notification.svg?branch=master)](https://travis-ci.org/tickify/ngx-notification)

## `NgxNotificationModule`
> You need registering this module before you can use this library.
- Import module from `ngx-notification`
```TypeScript
import { NgxNotificationModule } from 'ngx-notification';
```
- Register module to other module which use `ngx-notification`
```TypeScript
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NgxNotificationModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

## `NotificationManager`
> This class manage all push or remove notification actions.
> Inject `NotificationManager` if you want to push notifications.
```TypeScript
    constructor(private notificationManager: NotificationManager) {
```
### Push Notification
> Call push function on `NotificationManager` to show notification.
```TypeScript
            this.notificationManager.push({
                message: new Date().getTime().toString()
            })
```
This function return a object which is used when you want to remove that notification.
### Remove Notification
> Call remove function on `NotificationManager` to hide notification.
```TypeScript
this.notificationManager.remove(this.notification);
```
`this.notification` is object which is return when you call `this.notificationManager.push` function.
