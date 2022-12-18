// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pagination: 10,
  defaultLocation:
  {
    latitude:-23.5120687,
    longitude: -46.9170876,
    zoom: 13
  },
  endpoints:
  {
    map: "https://localhost:58365/api/map",
    login: "https://localhost:58365/api/user/authenticate",
    report: "https://localhost:58365/api/report"
  },
  externalLink:
  {
    instagram:"https://www.instagram.com/projetolupanh",
    facebook:"https://www.facebook.com/projetolupanh",
    linkedin:"https://www.linkedin.com/in/projeto-lupa-nh-70826b240",
    youtube:"https://www.youtube.com/channel/UCsJzR_BzrP6TkmHjVeH0xcA",
    twitter:"https://twitter.com/projetolupanh",
    website:"http://lupa.tecccog.net"
  },
  issues:
  {
    Asphalt:{ "key":0 , "value" : "Calçadas e Asfalto"},
    Collect:{ "key": 1, "value" : "Coleta de Lixo"},
    Light:{ "key": 2, "value": "Iluminação Pública"},
    PublicService: { "key": 3, "value": "Serviços Público"},
    Sewer: { "key": 4, "value": "Tratamento de Esgoto"},
    Trash:{ "key": 5, "value" : "Limpeza Urbana"},
    Water:{"key": 6, "value": "Água Potável"}
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
