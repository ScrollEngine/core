# Scroll Engine Core
This is a quick start guide to using and understanding Scroll. It is encouraged that you check out the full documentation, especially if you are looking to customize your applicaiton more than the average install. You should also always read any documentation for your chosen view layer (explained below), as each one offers different features, styles, and mechanisms beyond the core.

## Installing

`npm install scroll-core`

## Usage

```javascript
var scroll = require('scroll-core'),
    app = scroll();

app.start(8181);
```

## Layers
Scroll follows an MVC design, which provides the benefit of separating data from buisness logic from the interface used to interact with each. Scroll Core can be thought of as the controller layer, but also provides a base server and glues the model and view layers together.

Both the model and view layer are representated as NPM modules that you can swith out as you see fit. Scroll is designed to allow you to simply NPM install a new view layer to give your site whatever interface you like or to fit whatever data storage you have. Jsut don't forget to update your configuration after you install one.

### Model Layer
Model layers strictly deal with data access and storage, but Scroll enforces a strict interface so in theory you can switch the model layer our for a module that connects to your preferred data storage medium. Check out the list of offical modules to find one you can use.

### View Layer
While the model layer is fair strait forward, the view layer is literally the entire interface for your Scroll site. It provides the theme, views, a base of public files, and maybe event some cool features you can utilize. View modules have the same access to the Scroll application as your files, so a view can do everything from adding new routes to completely reworking controllers and server settings.

Just like the model layer, the view layer is designed to be interchangable. You can find a module with the look and features you like then just NPM install it and update your configuration.

### Your Application
Put simply, you have the final say in how your application works, IE your application is the top layer. Your application can override any views available, any routes that are used, and add new models and controllers as you need them. Scroll tries to provide what you need, but the philosophy is you can change or ehance as much or as little as you want.

## Basic API
Scroll uses Express(v4) internally and provides proxies for some of its functionality so its easy to add new routes and middleware into your site. Those proxies, as well as the basic API for a Scroll app are listed here.

### scroll([config])
Creates a new Scroll app.

* **config** - An object of various configuration options and overrides. A lot of customization can be accomplished through this configuration. Check out the full documentation for the properties available.

### app.start(port, callback)
Starts the application on the given port.

* **port** - The port to listen on.
* **callback** - Runs when the application has been started.

### app.controllers
The collection of controllers that have been loaded. Useful for getting data inside your own routes. You can check out the controller documentation and even learn how to add your own controllers.

### app.use
Proxy for Express' app.use.

### app.Router
Proxy for Express 4's Router object.

### app.get
Proxy for Express' app.get.

### app.post
Proxy for Express's app.post.

### app.put
Proxy for Express' app.put.

### app.delete
Proxy for Express' app.delete.

### app.locals
Direct access to app.locals, which are values and functions passed to all views.

### app.app
Direct access to the underlining Express app, if you really want to mess around with it.
