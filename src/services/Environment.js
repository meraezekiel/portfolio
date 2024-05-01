const version = "v1.0.0";

const ENV = {
    dev: {
        env: 'development',
        appVersion: `${version} [Dev]`,
        apiUrl: 'https://directus.giglink.asia',
        serviceAccountApi:'XJ5_-KQJEmuL9uqi83bUVfUV2-bPswMa'
    },
    devlocal: {
        env: 'local',
        appVersion: `${version} [Dev Local]`,
        apiUrl: 'https://directus.giglink.asia',
        serviceAccountApi:'XJ5_-KQJEmuL9uqi83bUVfUV2-bPswMa'
    },
    prod: {
        env: 'production',
        appVersion: version,
        apiUrl: 'https://directus.giglink.asia',
        serviceAccountApi:'XJ5_-KQJEmuL9uqi83bUVfUV2-bPswMa'
    },
}

export const getEnvVars = () => {
    let apiEndpoint = ENV.dev
    if(window.location.href.includes("ezshift") || window.location.href.includes("localhost") || window.location.href.includes("ngrok")){
        apiEndpoint = ENV.dev
    }else{
        apiEndpoint = ENV.prod
    }
    // if (window.location.href.includes("localhost")) {
    //   apiEndpoint = ENV.devlocal
    // }else{
    //     if(window.location.href.includes("ezoda")){
    //         apiEndpoint = ENV.dev
    //     }else{
    //         apiEndpoint = ENV.prod
    //     }
    // }
    return apiEndpoint;
};