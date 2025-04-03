const sendOfferOnClick = (offerId: number, ref: string, uuid: string) => {
    const payload = { oid: offerId };

    fetch("https://wheel-api.institutmp.io/events/click", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Ref': ref,
            'X-Visitor-Id': uuid,
        },
        body: JSON.stringify(payload),
    });
};

export default sendOfferOnClick;