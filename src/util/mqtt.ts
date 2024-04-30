import mqtt from 'mqtt'

const mqttClientSingleton = () => {
    return mqtt.connect("wss://io.wibudev.com");
}

declare global {
    var mqttGlobal: mqtt.MqttClient
}

const mqttGlobal = globalThis.mqttGlobal ?? mqttClientSingleton()

export default mqttGlobal

if (process.env.NODE_ENV !== 'production') globalThis.mqttGlobal = mqttGlobal