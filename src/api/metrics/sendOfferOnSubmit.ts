const sendOfferLead = (offerId: number, ref: string) => {
    fetch("https://wheel-metrics.institutmp.io/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            event: "offer-lead",
            data: {
                offer_id: offerId,
                ref,
            },
        }),
    }).catch((err) => console.error("Failed to send offer lead event:", err));
};

export default sendOfferLead;