import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    public auth : AngularFireAuth,
    private router : Router
  ) { }
  ngOnInit(): void {
    this.signOutClicked();
  }

  signInClicked(): void {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });

    this.auth.signInWithPopup(googleProvider).then((result) =>
      this.router.navigate(['home'])
    );
  }

  signOutClicked(): void {
    this.auth.signOut();
  }
}
