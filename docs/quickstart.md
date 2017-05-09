# Quickstart

This is the quickstart to *development* guide. If you are looking for a quickstart guide for running GeoMoose then you should look at installing one of the GeoMoose demos. This quickstart utilizes the GeoMoose docker image for serving the demo data and MapServer.

## Basic requirements

* Git
* Docker or MapServer 7.0+ or Newer
* [NodeJS with Npm](https://nodejs.org/) v6.10.2 or Newer

## Create your fork

GeoMoose contributions are done using Pull Requests.  You can read more about [pull requests on GitHub.](https://help.github.com/articles/about-pull-requests/)

<a target="_blank" class="github-button" href="https://github.com/geomoose/gm3/fork" aria-label="Fork geomoose/gm3 on GitHub">Click here to create your own Fork</a>

## Cloning the repositories

This will download all the data necessary to get started.

```
cd ~
mkdir geomoose
cd geomoose
git clone git@github.com:[YOUR_USER_NAME]/gm3.git
git clone git@github.com:geomoose/gm3-demo-data.git
git clone git@github.com:geomoose/gm3-demos.git
```

## Starting the docker image 

The Docker image is a quickstart way of setting up MapServer.

```
cd ~/geomoose/gm3-demo-data/docker
./build.sh
./run.sh
```

Next, test that the docker image is running correctly:

```
curl http://localhost:8000/cgi-bin/mapserv
```

If the message below appears then MapServer is running:
```
No query information to decode. QUERY_STRING is set, but empty.
```

## Getting GeoMoose started

This step installs all the dependencies for GeoMoose:
```
cd ~/geomoose/gm3
npm install
```

## Check that GeoMoose tests are passing
```
npm test
```

## Build the GeoMoose package

This will create the combined `geomoose.js` file.
```
grunt build
```

## Starting a GeoMoose Demo

These are the steps necessary to start the GeoMoose desktop demo.

 1. Change to the `~/geomoose/gm3-demos/desktop` directory.
 
    ```
    cd ~/geomoose/gm3-demos/desktop
    ```
 2. Link to your cloned fork of GeoMoose:
 
    ```
    ln -s ~/geomoose/gm3 ./geomoose
    ```
        
 3. Create a `config.js` file.

    To configure the demo application, it needs to know where MapServer and the Mapfiles are on the server.

    Add the following to `~/geomoose/gm3-demos/desktop/config.js`:
    
    ```
    CONFIG = {
        mapserver_url: '/mapserver/cgi-bin/mapserv',
        mapfile_root: '/data/'
    };
    ```

    *Fun fact!* This is the same contents as `config.js.example`, so you could also `cp config.js.example config.js`.

 4. Install the development server.
 
    ```
    npm install
    ```

 5. Serve it!
 
    ```
    npm serve
    ```

Open GeoMoose in a browser: [http://localhost:4000/debug.html](http://localhost:4000/debug.html)


