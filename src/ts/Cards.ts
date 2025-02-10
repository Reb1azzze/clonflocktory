interface CardInfo {
    id: number;
    title: string;
    description: string;
}

export const cardData: CardInfo[] = [
    { id: 1, title: "Сертификат на 3000р!", description: "круто" },
    { id: 2, title: "Скидка 15%!", description: "еще круче" },
    { id: 3, title: "Клубная карта!", description: "максимально круто" },
    { id: 4, title: "Сертификат на 1000р!", description: "максимально круто" },
    { id: 5, title: "Скидка 10%!", description: "максимально круто" },
];

// Function to get card details by ID
export const getCardById = (id: number): CardInfo | undefined => {
    return cardData.find(card => card.id === id);
};