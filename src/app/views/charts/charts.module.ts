import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';

import { FilePondModule, registerPlugin } from "ngx-filepond";
import {HttpClientModule} from "@angular/common/http";

import * as FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilePondPluginFileValidateType);

// import { DocsComponentsModule } from '@docs-components/docs-components.module';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    FilePondModule,
    HttpClientModule
    // DocsComponentsModule
  ]
})
export class ChartsModule {
}
