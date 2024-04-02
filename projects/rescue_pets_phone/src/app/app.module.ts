import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shaders/header/header.component';
import { FooterComponent } from './shaders/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from  '@angular/common/http';
import { CatComponent } from './pages/cat/cat.component';
import { DogComponent } from './pages/dog/dog.component';
import { PetComponent } from './pages/pet/pet.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AddPetComponent } from './pages/add-pet/add-pet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from 'libRescue';
import { AdminGuard } from 'libRescue';
import { TimetableComponentComponent } from './pages/timetable-component/timetable-component.component';
import { IonicModule } from '@ionic/angular';
import { environment } from '../environments/environment.development';

const routes: Routes = [
  {path : 'home',  component: HomeComponent},
  {path : 'cats',  component: CatComponent},
  {path : 'dogs', component: DogComponent},
  {path: 'animal/:id', component: PetComponent},
  {path: 'addPet', component: AddPetComponent, canActivate: [AdminGuard]},
  {path: 'modifyPet/:id', component: AddPetComponent, canActivate: [AdminGuard]},
  {path: 'signUp', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'signIn', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'timetable/:id', component: TimetableComponentComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CatComponent,
    DogComponent,
    PetComponent,
    AddPetComponent,
    RegisterComponent,
    RegisterComponent,
    LoginComponent,
    TimetableComponentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    IonicModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
