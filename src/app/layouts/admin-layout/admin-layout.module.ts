
import { DetailFeedbackComponent } from './../../pages/detail-feedback/detail-feedback.component';
import { TestComponent } from './../../pages/test/test.component';
import { UploadImageComponent } from './../../pages/upload-image/upload-image.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackManagementComponent } from 'src/app/pages/feedback-management/feedback-management.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateReclamationComponent } from 'src/app/pages/update-reclamation/update-reclamation.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";
import {PublicationManagementComponent} from "../../pages/publication-management/publication-management.component";
import {
  UpdatePublicationBackComponent
} from "../../pages/publication-management/update-publication-back/update-publication-back.component";
import {
  ListCommentsBackComponent
} from "../../pages/publication-management/list-comments-back/list-comments-back.component";
import {
  PublicationAjoutComponent
} from "../../pages/publication-management/publication-ajout/publication-ajout.component";
import {
  AlertsManagementComponent
} from "../../pages/publication-management/alerts-management/alerts-management.component";
=======
import { AnswerAdminComponent } from 'src/app/pages/answer-admin/answer-admin.component';
import { DetailReclamationComponent } from 'src/app/pages/detail-reclamation/detail-reclamation.component';
import { ReclamationManagementAdminComponent } from 'src/app/pages/reclamation-management-admin/reclamation-management-admin.component';






// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,

    NgxSpinnerModule,
    MatPaginatorModule,

    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,

    ReactiveFormsModule,
    


  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    FeedbackManagementComponent,
    ReclamationManagementAdminComponent,
    DetailReclamationComponent,
    UpdateReclamationComponent,
    AnswerAdminComponent,
    UploadImageComponent,
    TestComponent,

    PublicationManagementComponent,
    UpdatePublicationBackComponent,
    ListCommentsBackComponent,
    PublicationAjoutComponent,
    AlertsManagementComponent,

    DetailFeedbackComponent,
    
  

  ],
  exports: [
    RouterModule

  ]
})

export class AdminLayoutModule {}
