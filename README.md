# Test Identityserver4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4203/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Static code analysis

Angular projects use TSLint in order to ensure the code quality and consistency. The applications also use Google's *Codelyzer* for that purpose. Before every commit, it is advised to run `ng lint` and resolve all linter warnings. The list of active linter rules are inside *tslint.json* file.

## Deployment

Use `npm build -prod` to prepare the files for deployment. Note that this procedure produces AoT (Ahead-of-Time compilation) version of the Angular files in order to use Angular's bundles. The command copies the resulting files into a `dist` folder, from where it may be copied, e.g. on an Azure service remote location.
