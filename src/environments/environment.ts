/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  //crmUrl: 'http://localhost:8083/api/',
  
  financeUrl: 'https://manazelo-finance-back.herokuapp.com/',
  //crmUrl: 'https://crm-backend-manazello.herokuapp.com/api/',
 //  crmUrl: 'http://localhost:8083/api/',
  crmUrl: 'https://manazello-crm.herokuapp.com/api/',
  employees_hcm: 'https://employees-hcm-manazello.herokuapp.com/',
  mailing:'http://localhost:8088/api/mailing/',
 // employees_hcm:'http://localhost:8060/',
  recruitment_hcm:'http://localhost:8071/',
  stockUrl: 'https://pim-manazello-backend.herokuapp.com',
  //pmo_action: 'https://action-plan-service.herokuapp.com/api/v1/',
  //auth: 'https://authentication-manazello.herokuapp.com/api/auth/',

  auth: 'http://localhost:8070/api/auth/',
 authRoles: 'https://auth-manazello.herokuapp.com/api/role/',
  recoverydispute: 'https://recovery-manazello.herokuapp.com/',
  comMarketing: 'https://cm-manazello.herokuapp.com' ,

//  auth: 'https://auth-manazello.herokuapp.com/api/auth/',



  //employees_hcm:'http://localhost:8060/',

  firebase: {
    apiKey: 'AIzaSyCnMzEm_iWTMLf5XwYcano8HmWFITABkpY',
    authDomain: 'crm-manazello.firebaseapp.com',
    projectId: 'crm-manazello',
    storageBucket: 'crm-manazello.appspot.com',
    messagingSenderId: '1066035546132',
    appId: '1:1066035546132:web:6ccc99fbd1e72aec2fbf01',
    measurementId: 'G-33EX9R4734'
  },
   //auth:'https://gatewayserver-api.herokuapp.com/eliyrunnihbhim/api/auth/',


  pmo: 'https://project-charter-management.herokuapp.com/api/v1/',
  psUrl:'https://project-management-services.herokuapp.com/api/v1/',

  riskUrl:'https://risk-management-service.herokuapp.com/api/v1/',
  actionPlanUrl:'https://action-plan-service.herokuapp.com/api/v1/',
 // auth:'http://localhost:8888/auth-service-omar/api/auth/',
    

  rentalRequestUrl: "https://manazello-administration.herokuapp.com/api/v1/",
  //rentalRequestUrl:  "http://localhost:8092/api/v1/",


  firebaseConfig :{
  apiKey: "AIzaSyBgfOkDREq2rscHF9xhbqDBYzRWtrmEcX4",
  authDomain: "upload-file-manazello.firebaseapp.com",
  projectId: "upload-file-manazello",
  storageBucket: "upload-file-manazello.appspot.com",
  messagingSenderId: "195673429010",
  appId: "1:195673429010:web:edfa7bf33d58573febb4cb",
  measurementId: "G-22S8RBEZSV",
},
  accountingUrl: 'https://accounting-manazello.herokuapp.com/'
};
