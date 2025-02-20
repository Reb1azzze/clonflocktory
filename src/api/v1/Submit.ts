import { ISubmitData } from "../types/Submit";
import { ApiPaths } from "../../constants/ApiPaths";
import axios from "axios";

export const PostSubmit = async (data: ISubmitData): Promise<void> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("offer_id", String(data.offer_id));

    try {
        await axios.post(ApiPaths.Submit, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    } catch (error) {
        console.error("Error submitting form:", error);
        throw error;
    }
};
