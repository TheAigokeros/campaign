import { ResponseApi } from "common/interface/global.interface";
import { SendCampaignEmailDTO } from "common/module/campaign/campaign.dto";
import { SendCampaignEmailResponse } from "common/module/campaign/campaign.interface";
import { fetcher } from "../fetcher";

export async function sendCampaignEmail(payload: SendCampaignEmailDTO): 
    Promise<ResponseApi<SendCampaignEmailResponse>> {
        
    const res = await fetcher("/api/campaign/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    console.log('send data')
    if (res.statusCode != 201) {
      throw new Error("Failed to send campaign");
    }

    return res;
  }