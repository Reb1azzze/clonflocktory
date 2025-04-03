const sendOfferLead = (offerId: number, ref: string, uuid: string) => {
    const payload = { oid: offerId };

    fetch("https://wheel-api.institutmp.io/events/lead", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Ref': ref,
            'X-Visitor-Id': uuid,
        },
        body: JSON.stringify(payload),
    });
};

export default sendOfferLead;