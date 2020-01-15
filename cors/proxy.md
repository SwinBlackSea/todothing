//webpack.dev.js or package.json or config.js(react...)
proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true
            },
            "/globalizationidmpservice": {
                target: "http://localhost:8080",
                changeOrigin: true,
                pathRewrite: {
                    "^/globalizationidmpservice": ""
                }
            }
        }
