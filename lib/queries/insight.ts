import type { MutationOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
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

export interface Tag {
	tagId: number;
	tagName: string;
}

export interface GetInsightResponse {
	insightId: number;
	initialThought: string;
	title: string;
	tags: Tag[];
	createdDate: string;
	updatedDate: string;
}

export interface InsightPiece {
	insightPieceId: number;
	content: string;
	createdType: "INIT" | "SELF" | "ANSWER";
	createdDate: string;
}

export interface GetInsightPiecesResponse {
	insightPieces: InsightPiece[];
}

const getInsight = (id: number) =>
	api.get<GetInsightResponse>(`/api/mock/insights/${id}`);

export const insightDetailQueryOptions = (id: number) => ({
	queryKey: ["insight", id],
	queryFn: () => getInsight(id),
});

const getInsightPieces = (id: number) =>
	api.get<GetInsightPiecesResponse>(`/api/mock/insights/${id}/list`);

export const insightPiecesQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ["insight-pieces", id],
		queryFn: () => getInsightPieces(id),
	});
