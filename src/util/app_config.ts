import os from "os"

const app_config = {
    platform: os.platform(),
    arch: os.arch(),
    version: process.env.npm_package_version,
    host: os.platform() === "darwin" ? "http://localhost:3005" : "https://wibu-server.wibudev.com",
    name: process.env.npm_package_name,
}

export default app_config