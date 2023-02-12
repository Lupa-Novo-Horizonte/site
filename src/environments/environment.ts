// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pagination: 10,
  token:
  {
    login: "",
    login: "",
    password: ""
  },
  defaultLocation:
  {
    latitude:-23.5120687,
    longitude: -46.9170876,
    zoom: 13
  },
  endpoints:
  {
    login: "https://localhost:58365/api/user/authenticate",
    map: "https://localhost:58365/api/site/map",
    report: "https://localhost:58365/api/site/report"
  },
  externalLink:
  {
    instagram:"https://www.instagram.com/projetolupanh",
    facebook:"https://www.facebook.com/projetolupanh",
    linkedin:"https://www.linkedin.com/in/projeto-lupa-nh-70826b240",
    youtube:"https://www.youtube.com/channel/UCsJzR_BzrP6TkmHjVeH0xcA",
    twitter:"https://twitter.com/projetolupanh",
    website:"http://lupa.tecccog.net",
    openapi:"https://localhost:58365/swagger/index.html"
  },
  type:
  {
    Asphalt:{ "key":0 , "value" : "Calçadas e Asfalto", "icon" : "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"},
    Collect:{ "key": 1, "value" : "Coleta de Lixo" , "icon" : "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"},
    Light:{ "key": 2, "value": "Iluminação Pública", "icon" : "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"},
    PublicService: { "key": 3, "value": "Serviços Público", "icon" : "http://maps.google.com/mapfiles/ms/icons/pink-dot.png"},
    Sewer: { "key": 4, "value": "Tratamento de Esgoto", "icon" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"},
    Trash:{ "key": 5, "value" : "Limpeza Urbana", "icon" : "http://maps.google.com/mapfiles/ms/icons/green-dot.png"},
    Water:{"key": 6, "value": "Água Potável", "icon" : "http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png"}
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
