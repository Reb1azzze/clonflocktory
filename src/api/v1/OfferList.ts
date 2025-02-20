import { IOfferListRequest, IOfferListResponse } from "../types/OfferList";
import axios from "axios";
import { ApiPaths } from "../../constants/ApiPaths";


export const getOfferList = async (request: IOfferListRequest):Promise<IOfferListResponse> => {
    try
    {
        const result = await axios.get(ApiPaths.OfferList);
        const data = {
            data: result.data,
        } as IOfferListResponse;
        return data as IOfferListResponse;
    } catch (error)
    {
        throw error;
    }
}