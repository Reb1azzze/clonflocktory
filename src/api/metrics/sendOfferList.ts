const sendOfferList = (offerIds: string[], ref: string, uuid: string) => {
    const eventPayload = offerIds.map((oid) => ({
        oid,
        ts: Date.now(),
    }));

    fetch("https://wheel-api.institutmp.io/events/view", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-Ref': ref,
            'X-Visitor-Id': uuid,
        },
        body: JSON.stringify(eventPayload),
    }).catch((err) => console.error("Failed to send event:", err));
};

export default sendOfferList;