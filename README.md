# Comandos Instalación
 
- npx -p @angular/cli ng new amplify-app

### BACKEND

#### Comandos Instalación

- amplify configure
- amplify init

Help improve Amplify CLI by sharing non-sensitive project configurations on failures / yes

*************************************************************************
{
  ...
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    ...
  }
}

tsconfig.json
***************************************************************************
[mas info inicio](https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/#configure-the-amplify-cli)

- amplify add auth | amplify import auth

### FRONTEND

#### Comandos Instalación

- npm install aws-amplify

ng generate component components/auth/login --skip-tests
ng generate component components/auth/register --skip-tests

[info projecto full-stack](https://docs.amplify.aws/angular/start/getting-started/setup/)


# GIHUB DESPLIEGUE

Aplicación -> Hosting environments -> Alojar una aplicación Web

  - Github
  - Configuración de compilación y pruebas -> dist
  - Configuración avanzada ->  Variables de entorno.
  - 

[instrucciones](https://docs.amplify.aws/angular/deploy-and-host/deployment/deploy-static-site-github/)
amplify push
amplify publish

version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd amplify-app/
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: amplify-app/dist/amplify-app/browser/
    files:
      - '**/*'
  cache:
    paths:
      - .npm/**/*


amplify-cognito helps
[MFA STEP](https://docs.amplify.aws/gen2/build-a-backend/auth/manage-mfa/)


# Comandos instalacion storage
- amplify add storage