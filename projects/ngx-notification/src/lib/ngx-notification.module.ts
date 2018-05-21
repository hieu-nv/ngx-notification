import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    NotificationContainerComponent,
    NotificationComponent
} from './ngx-notification.component';

const COMPONENTS = [NotificationContainerComponent, NotificationComponent];

@NgModule({
    imports: [CommonModule, BrowserAnimationsModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxNotificationModule {}
