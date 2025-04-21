export const ApiBaseRoot = 'https://wheel-api.institutmp.io/'

export const ApiPaths = {
    // API для получения офферов
    OfferList: `${ApiBaseRoot}offers/list`,

    // POST API для заявки с формы
    Submit: `${ApiBaseRoot}leads/create`,

    // METRIC API для отправления офферлиста
    MetricOfferList: `${ApiBaseRoot}events/view`,

    // METRIC API для отправления кликов по офферам
    MetricOfferOnClick: `${ApiBaseRoot}events/click`,

    // METRIC API для отправления on Submit
    MetricOfferOnSubmit: `${ApiBaseRoot}events/lead`,
};