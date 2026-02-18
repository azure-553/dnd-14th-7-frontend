import { type MutationOptions } from "@tanstack/react-query";
import { api } from "@/lib/core/api";

interface CreateInsightRequest {
	memo: string;
}

interface CreateInsightResponse {
	insightId: number;
}

const createInsight = (data: CreateInsightRequest) =>
	api.post<CreateInsightResponse>("/api/mock/insights", data);

export const insightCreationMutationOptions = (): MutationOptions<
	CreateInsightResponse,
	unknown,
	CreateInsightRequest
> => ({
	mutationFn: createInsight,
});
