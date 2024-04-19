import { Injectable } from '@angular/core';

import {
  signUp, confirmSignUp, type ConfirmSignUpInput,
  autoSignIn, signIn, type SignInInput,
  signOut,
  getCurrentUser,
  fetchAuthSession,
  JWT,
  confirmSignIn,
  updateMFAPreference,
  SignInOutput
} from 'aws-amplify/auth';
import { SignUpParameters } from './../../interfaces/sign-up-parameters';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private statusLog: string;

  statusLog$: Subject<string>

  constructor() {
    this.statusLog = "Default";
    this.statusLog$ = new Subject();
  };

  getStatusLog(): string {
    return this.statusLog
  };

  setStatusLog(setStatusLog: string) {
    this.statusLog = setStatusLog;
    this.statusLog$.next(this.statusLog);
  };

  getStatusLog$(): Observable<string> {
    return this.statusLog$.asObservable();
  };

  // You can create a new user in your backend by passing a username, password, and other attributes to signUp().
  async handleSignUp({ username, phone_number, password, email }: SignUpParameters) {

    console.log(phone_number);
    try {
      const { nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            // phone_number
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

  // PASO 1
  async handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      this.setStatusLog(nextStep.signInStep)
      console.log("isSignedIn")
      console.log(isSignedIn);
      console.log("******************");
      console.log("nextStep")
      console.log(nextStep)
      this.handleSignInNextSteps({ isSignedIn, nextStep });
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  handleSignInNextSteps(output: SignInOutput) {
    // console.log("EJEMPLOOOOOOOOOOOOOOO", output);
    const { nextStep } = output;
    switch (nextStep.signInStep) {
      // ...
      case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP':
        const totpSetupDetails = nextStep.totpSetupDetails;
        const appName = 'my_app_name';
        console.log("1")
        const setupUri = totpSetupDetails.getSetupUri(appName);
        console.log("2")
        console.log("setupUri href", setupUri.href)
        window.open(setupUri.href, '_blank')
        // Open setupUri with an authenticator APP to retrieve an OTP code
        break;
      // ...
    }
  };

  // PASO 2
  async handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput) {
    console.log("1")
    try {
      const { nextStep } = await confirmSignUp({
        username,
        confirmationCode
      });
      console.log("nextStep ***********", nextStep);
      return nextStep;
    } catch (error) {
      alert(error);
      return error;
    }
  };

  // PASO 3
  async handleSignInConfirmation(otpCode: string) {
    try {
      await confirmSignIn({ challengeResponse: otpCode });
    } catch (error) {
      console.log(error);
    }
  };

  async handleUpdateMFAPreference() {
    try {
      await updateMFAPreference({ sms: 'PREFERRED' });
    } catch (error) {
      console.log(error);
    }
  };

  async handleAutoSignIn() {
    try {
      const { isSignedIn } = await autoSignIn();
      return isSignedIn;
    } catch (error) {
      alert(error);
      return error;
    }
  };

  async handleSignOut() {
    try {
      console.log("IOOOOOOOOO")
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
}
