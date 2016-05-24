SystemJS.config({
  transpiler: "plugin-typescript",
  typescriptOptions: {
    "target": "es5",
    "jsx": "react",
    "module": "system",
    "noImplicitAny": false,
    "typeCheck": false,
    "tsconfig": false
  },
  packages: {
    "app": {
      "main": "app.tsx",
      "defaultExtension": "tsx",
      "meta": {
        "*.tsx": {
          "loader": "plugin-typescript"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "clean-css": "npm:clean-css@3.4.12",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "core-js": "npm:core-js@1.2.6",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "css": "github:systemjs/plugin-css@0.1.21",
    "domain": "github:jspm/nodelibs-domain@0.2.0-alpha",
    "dropzone": "npm:dropzone@4.3.0",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fileapi": "npm:fileapi@2.0.20",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "mobx": "npm:mobx@2.1.7",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "node-uuid": "npm:node-uuid@1.4.7",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.16",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "react": "npm:react@15.1.0",
    "react-dom": "npm:react-dom@15.1.0",
    "react-dragula": "npm:react-dragula@1.1.16",
    "readline": "github:jspm/nodelibs-readline@0.2.0-alpha",
    "sortablejs": "npm:sortablejs@1.4.2",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.5.8",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
    "whatwg-fetch": "npm:whatwg-fetch@0.11.1",
    "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
  },
  packages: {
    "github:capaj/systemjs-hot-reloader@0.5.8": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "socket.io-client": "github:socketio/socket.io-client@1.4.6",
        "weakee": "npm:weakee@1.0.0"
      }
    },
    "github:frankwallis/plugin-typescript@4.0.16": {
      "map": {
        "typescript": "npm:typescript@1.8.10"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.6.0"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "github:jspm/nodelibs-domain@0.2.0-alpha": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.3.0"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "github:jspm/nodelibs-zlib@0.2.0-alpha": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:asn1.js@4.6.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.2",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "elliptic": "npm:elliptic@6.2.5",
        "inherits": "npm:inherits@2.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.8",
        "readable-stream": "npm:readable-stream@2.1.4"
      }
    },
    "npm:buffer@4.6.0": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:clean-css@3.4.12": {
      "map": {
        "commander": "npm:commander@2.8.1",
        "source-map": "npm:source-map@0.4.4"
      }
    },
    "npm:commander@2.8.1": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:contra@1.9.4": {
      "map": {
        "atoa": "npm:atoa@1.0.0",
        "ticky": "npm:ticky@1.0.1"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "elliptic": "npm:elliptic@6.2.5"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.5"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:crossvent@1.5.4": {
      "map": {
        "custom-event": "npm:custom-event@1.0.0"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.1",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:dragula@3.7.1": {
      "map": {
        "contra": "npm:contra@1.9.4",
        "crossvent": "npm:crossvent@1.5.4"
      }
    },
    "npm:elliptic@6.2.5": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.13"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:fbjs@0.8.2": {
      "map": {
        "core-js": "npm:core-js@1.2.6",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "loose-envify": "npm:loose-envify@1.2.0",
        "promise": "npm:promise@7.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.10"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.5.2",
        "whatwg-fetch": "npm:whatwg-fetch@0.11.1"
      }
    },
    "npm:loose-envify@1.2.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:node-fetch@1.5.2": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.6.0",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.4"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.3",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:react-dragula@1.1.16": {
      "map": {
        "atoa": "npm:atoa@1.0.0",
        "dragula": "npm:dragula@3.7.1"
      }
    },
    "npm:react@15.1.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.2",
        "loose-envify": "npm:loose-envify@1.2.0",
        "object-assign": "npm:object-assign@4.1.0"
      }
    },
    "npm:readable-stream@2.1.4": {
      "map": {
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.4"
      }
    },
    "npm:stream-http@2.3.0": {
      "map": {
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.1.4",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    }
  }
});
