import {ApiPaths} from "../../constants/ApiPaths";

const sendOfferLead = (offerId: number, ref: string, uuid: string) => {
    const payload = { oid: offerId };

    fetch(ApiPaths.MetricOfferOnSubmit, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Ref': ref,
            'X-Visitor-Id': uuid,
        },
        body: JSON.stringify(payload),
    }).catch((err) => console.error("Failed to send event:", err));
};

export default sendOfferLead;