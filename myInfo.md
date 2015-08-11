# ionic starter
```
ionic
ionic starter
ionic start <NAME> blank
ionic setup sass
```

move angular to www/lib from www/lib/ionic/angular
```
rm www/lib
bower install
```

install ngCordova and some plugin
```
bower install ngCordova
cordova plugin add cordova-plugin-camera
```

```
ioonic build android
ionic prepare android
ionic run android
```


## git
```
git init
git add README.md
git commit -m "first commit"
git remote add github https://github.com/amortka/ionic_starter.git
git push -u github master
```
## gulp config

install new gulp plugins
```
npm install --save-dev gulp-ng-html2js gulp-load-plugins gulp-sass gulp-angular-htmlify
```
