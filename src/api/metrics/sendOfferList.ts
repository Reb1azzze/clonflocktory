const sendOfferList = (offerIds: string[], ref: string) => {
    const eventPayload = {
        event: "offers-show",
        data: {
            ids: offerIds,
            ref,
        },
    };

    fetch("https://wheel-metrics.institutmp.io/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventPayload),
    }).catch((err) => console.error("Failed to send event:", err));
};

export default sendOfferList;