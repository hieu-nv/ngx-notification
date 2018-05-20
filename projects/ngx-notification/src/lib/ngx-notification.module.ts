import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NotificationContainerComponent,
    NotificationComponent
} from './ngx-notification.component';

const COMPONENTS = [NotificationContainerComponent, NotificationComponent];

@NgModule({
    imports: [CommonModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxNotificationModule {}
