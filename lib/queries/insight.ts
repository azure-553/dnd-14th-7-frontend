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

const getInsightQuestions = (id: number) => {
	// Mock implementation
	return Promise.resolve({
		questions: [
			{
				questionId: 12,
				content: "서버 로그를 분석할 때 가장 중요하게 보는 지표는 무엇인가요?",
				status: "WAITING",
				createdDate: "2024-02-13T10:35:00Z",
			},
			{
				questionId: 13,
				content: "로그 관리 시스템을 도입한 계기가 있나요?",
				status: "WAITING",
				createdDate: "2024-02-13T10:35:00Z",
			},
		],
		answerCards: [
			{
				answerId: 1,
				questionId: 11,
				questionContent: "로그가 없어서 겪었던 실제 문제는?",
				answerContent:
					"서버에서 특정 요청이 간헐적으로 실패했는데, 관련 로그가 남아 있지 않아 어떤 조건에서 발생하는지 확인할 수 없었다.\n결국 동일한 상황을 로컬에서 재현하려고 여러 번 테스트했지만, 재현되지 않아 원인 파악에 하루 이상이 소요되었다.",
				createdDate: "2026-01-01T10:00:00Z",
				isSaved: false,
			},
			{
				answerId: 2,
				questionId: 12,
				questionContent: "로그가 없어서 겪었던 실제 문제는?",
				answerContent:
					"서버에서 특정 요청이 간헐적으로 실패했는데, 관련 로그가 남아 있지 않아 어떤 조건에서 발생하는지 확인할 수 없었다.\n결국 동일한 상황을 로컬에서 재현하려고 여러 번 테스트했지만, 재현되지 않아 원인 파악에 하루 이상이 소요되었다.",
				createdDate: "2026-01-01T12:00:00Z",
				isSaved: true,
			},
		],
	} as GetInsightQuestionsResponse);
};

export const insightQuestionsQueryOptions = (id: number) =>
	queryOptions({
		queryKey: ["insight-questions", id],
		queryFn: () => getInsightQuestions(id),
	});
