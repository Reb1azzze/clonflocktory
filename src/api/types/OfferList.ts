export interface IOfferListItem {
    id: number;
    created_at: string;
    title: string;
    description: string;
    description_short: string;
    is_published: boolean;
    logo_short: string;
    logo_full: string;
    privacy: string;
    terms: string;
}

export interface IOfferListResponse {
    data: IOfferListItem[];
}

export interface IOfferListRequest {

}