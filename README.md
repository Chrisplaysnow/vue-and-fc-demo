# Vue.js and Fullcalendar.io Demo App

## Requirements
You need to have **npm** installed. For macOS Users: You are likely to see this (picture below) npm output when not running npm commands with sudo permission.
![Image of npm update check failed](/images/npm_update_check_failed.png)

In order to run future npm commands without needing sudo permission and without getting 'error' codes you should run the following command:
```
sudo chown -R $USER:$(id -gn $USER) /Users/<Username>/.config
```
Notice that the **only** part of this command you should not write literally is <Username>.

### Installation
```
git clone https://github.com/Chrisplaysnow/vue-and-fc-demo.git
npm install
```

### Build Commands
```
npm run build
npm run watch # continuously build
npm run clean # start fresh
```
After running `build` or `watch`, open up `index.html` in a browser.

### Recreation

#### Package.json

This is a little tutorial in order to recreate this project.
First create and switch into the folder where you want to have your project.
```
mkdir vue-and-fc-demo
cd vue-and-fc-demo
```
Run `npm init -y` in order to create the `package.json` file. Here, add as a first argument of the dictionary `"private": true,`. Your package.json file should now look like this:
```json
{
  "private": true,
  "name": "fc-and-vue-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Now we will have to install quite a few dependencies. **npm** distinguishes between *dependencies* and *devDependencies*. The difference between these two, is that *devDependencies* are modules which are only required during development, while *dependencies* are modules which are also required at runtime. *dependencies* are installed with `npm install <package_name> --save` while *devDependencies* are installed with `npm install <package_name> --save-dev`.

#### Dependencies

First we need to install the **FullCalendar** plugins that we are going to need. Among them is the `@fullcalendar/vue` in order to use the FullCalendar Vue component.
```
npm install --save @fullcalendar/core @fullcalendar/daygrid @fullcalendar/vue
```

#### DevDependencies

We will be using **webpack** as our ES6 Build System.
```
npm install --save-dev webpack
npm install --save-dev webpack-cli
```
Install a CSS-Loader.
```
npm install --save-dev css-loader
```
In order to use Vue.js functionalities we will need to install Vue and some Vue module loaders.
```
npm install --save-dev vue
npm install --save-dev vue-loader
npm install --save-dev vue-style-loader
npm install --save-dev vue-template-loader
```

#### Creating necessary files/folders

Now we're ready to actually add some code! First, we need to create some files and folders that we are going to be needing:
```
mkdir src
mkdir dist
touch index.html
touch src/index.js
```

```
touch src/DemoApp.vue
```

```
touch webpack.config.js
```

#### Adding Code

`webpack.config.js`:
```javascript
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader'],
          },
          {
              test: /\.vue$/,
              use: 'vue-loader'
          }
        ],
      },
      plugins: [
          new VueLoaderPlugin()
      ],
      devtool: 'source-map'
};
```

`index.html`:
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Fullcalendar and Vue.js</title>
</head>
<body>
    <div id='demo-app-placeholder'></div>
    <script src='dist/main.js'></script>
</body>
</html>
```

`DemoApp.vue`:
```javascript
<template>
    <div class='demo-app'>
        <FullCalendar
            class='demo-app-calendar'
            ref='fullCalendar'
            defaultView='dayGridMonth'
            :plugins='calendarPlugins'
            :events='calendarEvents'
            :defaultDate='calendarDefaultDate'
        />
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
    components: {
        FullCalendar
    },
    data: function() {
        return {
            calendarPlugins: [
                dayGridPlugin,
            ],
            calendarEvents: [
                {
                    title: 'Event Now',
                    start: new Date()
                }
            ],
            calendarDefaultDate: '2019-04-27'
        }
    },
}
</script>

</script>

<style>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';


.demo-app-calendar {
    margin: 0 auto;
    max-width: 900px;
}
</style>
```

`index.js`:
```
import Vue from 'vue';
import DemoApp from './DemoApp.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(DemoApp)
}).$mount('#demo-app-placeholder')

add to webpack.config.js:
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader'],
          },
          {
              test: /\.vue$/,
              use: 'vue-loader'
          }
        ],
      },
      plugins: [
          new VueLoaderPlugin()
      ],
      devtool: 'source-map'
};
```

In order to compile now you just have to run:
```
npx webpack
```

In order to build your project with **webpack** we need to modify our `package.json` file by adding a new script we will call "build":
```json
{
  "private": true,
  "name": "fc-and-vue-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

gg ez you made it
