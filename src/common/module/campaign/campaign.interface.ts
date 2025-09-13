export interface SendCampaignEmailResponse {
    campaignId: number;
    campaignEmailId: number;
    email: string;
    taskId: string;
    status: "SUCCESS" | "FAILED" | "PENDING";
}