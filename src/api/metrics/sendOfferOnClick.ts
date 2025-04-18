import {ApiPaths} from "../../constants/ApiPaths";

const sendOfferOnClick = (offerId: number, ref: string, uuid: string) => {
    const payload = { oid: offerId };

    fetch(ApiPaths.MetricOfferOnClick, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Ref': ref,
            'X-Visitor-Id': uuid,
        },
        body: JSON.stringify(payload),
    }).catch((err) => console.error("Failed to send event:", err));
};

export default sendOfferOnClick;