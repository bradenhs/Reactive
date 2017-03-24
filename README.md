# Getting Started

**First** Ensure you have [yarn installed](https://yarnpkg.com/en/docs/install).

**Second** Ensure you have imagemagick installed. *(Mac: `brew install imagemagick`, Debian/Ubuntu: `sudo apt-get install imagemagick`, Windows: [See here](http://www.imagemagick.org/script/binary-releases.php#windows))*

**Third** Clone the repository: `git clone git@github.com:bradenhs/Reactive.git`

**Four** Inside of the project directory run these commands:

```
yarn install
yarn run prepare
yarn start
```

If everything went properly [http://localhost:8080](http://localhost:8080) should be serving the
website version of the app.

**Five** Open the project in VSCode and install the recommended extensions.

# Development

With `yarn start` running the app is in live reload mode. Any changes you make to the `src` directory
will automatically be reflected in the browser.

*\*Note: when adding or removing files you may have to restart the development server by running
`yarn start` again.*

Make sure to branch off of develop when making changes. Create a PR from github when you want to
integrate your changes into the master branch. This way we can both be aware of what code is being
added to the project and can make sure we aren't breaking each other's stuff.
