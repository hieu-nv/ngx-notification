# ngx-notification

[![Build Status](https://travis-ci.org/tickify/ngx-notification.svg?branch=master)](https://travis-ci.org/tickify/ngx-notification)

```bash
npm install @tickify/ngx-notification
yarn add @tickify/ngx-notification
```

## `NgxNotificationModule`
> You need registering this module before you can use this library.
- Import module from `@tickify/ngx-notification`
```TypeScript
import { NgxNotificationModule } from '@tickify/ngx-notification';
```
- Register module to other module which use `@tickify/ngx-notification`
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
this.notificationManager.hide(this.notification);
```
`this.notification` is object which is return when you call `this.notificationManager.push` function.

### AUI
```html
    <link rel="preload" href="https://unpkg.com/@atlassian/aui@7.8.1/dist/aui/css/fonts/adgs-icons.woff" as="font">
    <link rel="preload" href="https://unpkg.com/@atlassian/aui@7.8.1/dist/aui/css/fonts/adgs-icons.ttf" as="font">
    <link rel="preload" href="https://unpkg.com/@atlassian/aui@7.8.1/dist/aui/css/fonts/adgs-icons.eot" as="font">
    ...
    <link href="https://unpkg.com/@atlassian/aui@7.8.1/dist/aui/css/aui.min.css" rel="stylesheet" />
```

## Contribution

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, HieuNV
