import { Injectable } from '@angular/core';

import {
  signUp, confirmSignUp, type ConfirmSignUpInput,
  autoSignIn, signIn, type SignInInput,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  JWT
} from 'aws-amplify/auth';
import { SignUpParameters } from './../../interfaces/sign-up-parameters';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  // You can create a new user in your backend by passing a username, password, and other attributes to signUp().
  async handleSignUp({username, phone_number, password, email}: SignUpParameters){

    try {
      const {nextStep} = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number
          },
          autoSignIn: true
        }
      });
      return nextStep;
    } catch (error) {
      alert(error);
      console.log("error", error)
      return error;
    }
  };

  async handleSignUpConfirmation({username, confirmationCode}: ConfirmSignUpInput) {
    try {
      const { nextStep} = await confirmSignUp({
        username,
        confirmationCode
      });
      return nextStep;
    } catch (error) {
      alert(error);
      return error;
    }
  };

  async handleAutoSignIn(){
    try {
      const { isSignedIn } = await autoSignIn();
      return isSignedIn;
    } catch (error) {
      alert(error);
      return error;
    }
  };

  async handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  async handleSignOut() {
    try {
      await signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
}
