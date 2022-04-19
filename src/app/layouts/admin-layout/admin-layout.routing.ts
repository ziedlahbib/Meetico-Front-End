import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { EventManagementComponent } from 'src/app/pages/event-management/event-management.component';
import { FeedbackManagementComponent } from 'src/app/pages/feedback-management/feedback-management.component';
import { PublicationManagementComponent } from 'src/app/pages/publication-management/publication-management.component';
import { ReclamationManagementComponent } from 'src/app/pages/reclamation-management/reclamation-management.component';
import { TripManagementComponent } from 'src/app/pages/trip-management/trip-management.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';
import { AjouterComponent } from 'src/app/pages/trip-management/ajouter/ajouter.component';
import { ModifierComponent } from 'src/app/pages/trip-management/modifier/modifier.component';
import { AlgorithmedematchingComponent } from 'src/app/pages/trip-management/algorithmedematching/algorithmedematching.component';
import { ImageComponent } from 'src/app/pages/trip-management/image/image.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'user-management',           component: UserManagementComponent },
    { path: 'event-management',           component: EventManagementComponent },
    { path: 'feedback-management',           component: FeedbackManagementComponent },
    { path: 'publication-management',           component: PublicationManagementComponent },
    { path: 'reclamation-management',           component: ReclamationManagementComponent },
    { path: 'trip-management',           component: TripManagementComponent },
    { path: 'trip-management/add',           component: AjouterComponent },
    { path: 'trip-management/modifier/:id',           component: ModifierComponent },
    { path: 'trip-management/search',           component: AlgorithmedematchingComponent },
    { path: 'trip-management/image/:id',           component: ImageComponent },,
   
];
