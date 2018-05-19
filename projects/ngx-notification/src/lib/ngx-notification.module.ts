import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NotificationContainerComponent,
    NotificationComponent
} from './ngx-notification.component';

const COMPONENTS = [NotificationContainerComponent, NotificationComponent];

@NgModule({
    imports: [CommonModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class NgxNotificationModule {}
