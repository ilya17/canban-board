import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@core/app.routing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { CardsContainerComponent } from './components/cards-container/cards-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TruncatePipe } from '@core/pipes/truncate.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTaskModalComponent } from './modals/create-task-modal/create-task-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardComponent,
    NotFoundComponent,
    LayoutComponent,
    CardsContainerComponent,
    TruncatePipe,
    CreateTaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
