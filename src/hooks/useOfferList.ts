import { useEffect, useState } from "react";
import { IOfferListResponse } from "../api/types/OfferList";
import { getOfferList } from "../api/v1/OfferList";


const useOfferList = () => {
    const [state, setState] = useState<IOfferListResponse>();

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getOfferList({});
                setState(response);
            } catch (error) {
                throw error;
            }
        }
        void fetch();
    },[]);
    return state;
}

export default useOfferList;