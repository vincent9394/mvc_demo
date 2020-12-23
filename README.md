# Dummy Express Notes

## Create TS project (WSP001)

-   [x] init yarn project with

```Bash
yarn init -y
```

-   [x] install related packages

```Bash
yarn add --dev ts-node typescript @types/node
```

-   [x] create basic files

```Bash
touch main.ts index.js tsconfig.json
```

-   [x] config `tsconfig.json`

```Json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop":true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true
    },
    "exclude": [
        "node_modules",
        "build",
        "scripts",
        "index.js"
    ]
}

```

-   [x] config `index.js`

```Javascript
require('ts-node/register');
require('./main');

```

-   [x] config `main.ts` for testing

```Typescript
console.log("hello, world");

```

-   [x] test if we can run the `main.ts`

```Bash
node .

```

&nbsp;

## Create Express Dummy project (WSP006)

-   [x] install related packages

```Bash
yarn add express @types/express
```

-   [x] express template in `main.ts`

```Typescript
import express from "express";
import { Request, Response } from "express";

const app = express();
// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req: Request, res: Response) {
    res.json({ message: "Hello World" });
});

app.post("/", function (req: Request, res: Response) {
    console.log("test", req.body);
    res.json({ message: "Hello World", body: req.body });
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});

```

-   [x] create `public` folder and create `index.html` inside

```Bash
mkdir public
touch public/index.html

```

-   [x] init `index.html`

```Html
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title></title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="" />
    </head>
    <body>
        Hello, World
        <script src="" async defer></script>
    </body>
</html>

```

&nbsp;

## Init knex project (BAD003)

-   [x] install related packages and

```Bash
yarn add knex @types/knex pg @types/pg
yarn add dotenv

```

-   [x] init knex project

```Bash
yarn knex init -x ts
```

-   [x] config `knexfile.ts` and `.env.sample`, `.env`

```Typescript
// Update with your config settings.
import dotenv from "dotenv";
dotenv.config();

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PW,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    ...
    production: {
        client: "postgresql",
        connection: {
            database: process.env.PROD_DB_NAME,
            user: process.env.PROD_DB_USER,
            password: process.env.PROD_DB_PW,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};

```

`.env`:

```Text
DB_NAME=c12_grp_3_dev
DB_USER=jason
DB_PW=jason
```

`.env.sample`:

```Text
DB_NAME=c12_grp_3_dev
DB_USER=
DB_PW=
```

-   [x] create database

```Bash
createdb c12_grp_3_dev
```

&nbsp;

## Migration (BAD003)

-   [x] create migration for users

```Bash
yarn knex migrate:make create-users
```

-   [x] config migration file

-   [x] run migration file

```Bash
yarn knex migrate:latest
```

**Result:**

```Bash
Requiring external module ts-node/register
Using environment: development
Batch 1 run: 1 migrations
✨  Done in 3.08s.
```

-   [x] check database
