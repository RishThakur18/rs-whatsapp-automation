const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production'
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken: 'EAAC0AAuJQu4BABEhnxzw1pVDj7gZBQM0w8uWQxHYfpoX5oaJWu50wT2WCkLpysvptVGxxlph8bCsD2tecQYZBfOLKLMruw6elbk0bCilFz5sbacBbMoJeIAxQGdznzDtg5vCfZC21wpKU0ZAauxvRfDPs5N9E8Y4wcR625kA8HcmqZCAr4hVvS8Wg2yJqeNCoWv0xZBBgnnxGMNHZCfr3j4HVnhuHqzDDgZD',
    Meta_WA_SenderPhoneNumberId: '111029588633759',
    Meta_WA_wabaId: '108989222173012',
    Meta_WA_VerifyToken: 'IDontKnowWhatAmIDoing'
};

const fallback = {
    ...process.env,
    NODE_ENV: undefined
};

module.exports = (environment) => {
    console.log(`Execution environment selected is: "${environment}"`);
    if (environment === 'production') {
        return production;
    } else if (environment === 'development') {
        return development;
    } else {
        return fallback;
    }
};