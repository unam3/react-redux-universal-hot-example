module.exports = {
    "root": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "globalReturn": false,
            "impliedStrict": true,
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "amd": true,
        "es6": true
    },
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        //"plugin:react/recommended"
    ],
    "rules": {
        // http://eslint.org/docs/rules/#possible-errors
        //"no-console": [
        //    2,
        //    {
        //        "allow": [
        //            "log"
        //        ]
        //    }
        //],
        "no-debugger": 0,
        "no-prototype-builtins": 1,
        // http://eslint.org/docs/rules/#best-practices
        "default-case": 1,
        "no-case-declarations": 1,
        "no-else-return": 1,
        "no-implicit-globals": 2,
        "no-multi-spaces": 2,
        "no-param-reassign": 2,
        "no-sequences": 1,
        //"no-unmodified-loop-condition": 1,
        "no-unused-expressions": 1,
        "no-unused-vars": [1, {"args": "none"}],
        "no-useless-return": 1,
        "yoda": 2,

        // http://eslint.org/docs/rules/strict
        "strict": [2, "global"],

        // http://eslint.org/docs/rules/#nodejs-and-commonjs
        "handle-callback-err": [2, "e"],
        "array-bracket-spacing": 2,

        //http://eslint.org/docs/rules/#stylistic-issues
        //"quote-props": [2, "as-needed"],

        //http://eslint.org/docs/rules/#ecmascript-6
        "no-const-assign": 2,
        "no-var": 2,
        "prefer-const": 2,
        "object-shorthand": [2, "always"],

        "semi": 2,
        "radix": 2,

        "react/display-name": 0,
        "react/prop-types": 0
    }
}
