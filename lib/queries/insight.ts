import type { MutationOptions } from "@tanstack/react-query";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/core/api";

interface CreateInsightRequest {
	memo: string;
}

interface CreateInsightResponse {
	insightId: number;
}

const createInsight = (data: CreateInsightRequest) =>
	api.post<CreateInsightResponse>("/api/mock/insights", data);

export const insightCreationMutationOptions = () => mutationOptions({
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

export interface InsightQuestion {
	questionId: number;
	content: string;
	status: "WAITING" | "COMPLETED";
	createdDate: string;
}

export interface InsightAnswerCard {
	answerId: number;
	questionId: number;
	questionContent: string;
	answerContent: string;
	createdDate: string;
	isSaved?: boolean;
}

export interface GetInsightQuestionsResponse {
	questions: InsightQuestion[];
	answerCards: InsightAnswerCard[];
}

const getInsightQuestions = (id: number) =>
	api.get<GetInsightQuestionsResponse>(`/api/mock/insights/${id}/questions`);

export const insightQuestionsQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ["insight-questions", id],
		queryFn: () => getInsightQuestions(id),
	});

interface AnswerQuestionRequest {
	content: string;
}

const answerQuestion = (questionId: number, data: AnswerQuestionRequest) =>
	api.post<void>(`/api/mock/questions/${questionId}/answer`, data);

export const answerQuestionMutationOptions = (
	_insightId: number,
): MutationOptions<
	void,
	unknown,
	{ questionId: number; content: string }
> => ({
	mutationFn: ({ questionId, content }) =>
		answerQuestion(questionId, { content }),
});
