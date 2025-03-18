const sendOfferOnClick = (offerId: number, ref: string) => {
    fetch("https://wheel-metrics.institutmp.io/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            event: "offer-click",
            data: {
                offer_id: offerId,
                ref,
            },
        }),
    }).catch((err) => console.error("Failed to send offer event:", err));
};

export default sendOfferOnClick;