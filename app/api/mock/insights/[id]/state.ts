// in-memory mock 상태 (HMR 리로드에도 유지되도록 globalThis 사용)

export interface MockInsightPiece {
	insightPieceId: number;
	content: string;
	createdType: "INIT" | "SELF" | "ANSWER";
	createdDate: string;
}

export interface MockQuestion {
	questionId: number;
	content: string;
	status: "WAITING" | "COMPLETED" | "ARCHIVED";
	createdDate: string;
}

export interface MockAnswerCard {
	answerId: number;
	questionId: number;
	questionContent: string;
	answerContent: string;
	isConverted: boolean;
	createdDate: string;
}

const globalForMock = globalThis as unknown as {
	convertedAnswerIds?: Set<number>;
	insightPieces?: MockInsightPiece[];
	nextPieceId?: number;
	questions?: MockQuestion[];
	answerCards?: MockAnswerCard[];
	nextAnswerId?: number;
};

if (!globalForMock.convertedAnswerIds) {
	globalForMock.convertedAnswerIds = new Set<number>([2]);
}

if (!globalForMock.insightPieces) {
	globalForMock.insightPieces = [
		{
			insightPieceId: 122,
			content: "첫 생각으로 만들어진 인사이트",
			createdType: "INIT",
			createdDate: "2024-02-13T10:30:00Z",
		},
		{
			insightPieceId: 123,
			content: "직접 입력한 인사이트",
			createdType: "SELF",
			createdDate: "2024-02-13T12:00:00Z",
		},
		{
			insightPieceId: 124,
			content: "답변으로부터 추가한 인사이트",
			createdType: "ANSWER",
			createdDate: "2024-02-14T09:15:00Z",
		},
	];
	globalForMock.nextPieceId = 125;
}

if (!globalForMock.questions) {
	globalForMock.questions = [
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
	];
}

if (!globalForMock.answerCards) {
	globalForMock.answerCards = [
		{
			answerId: 1,
			questionId: 11,
			questionContent: "로그가 없어서 겪었던 실제 문제는?",
			answerContent:
				"서버에서 특정 요청이 간헐적으로 실패했는데, 관련 로그가 남아 있지 않아 어떤 조건에서 발생하는지 확인할 수 없었다.\n결국 동일한 상황을 로컬에서 재현하려고 여러 번 테스트했지만, 재현되지 않아 원인 파악에 하루 이상이 소요되었다.",
			isConverted: false,
			createdDate: "2026-01-01T10:00:00Z",
		},
		{
			answerId: 2,
			questionId: 12,
			questionContent: "로그가 없어서 겪었던 실제 문제는?",
			answerContent:
				"서버에서 특정 요청이 간헐적으로 실패했는데, 관련 로그가 남아 있지 않아 어떤 조건에서 발생하는지 확인할 수 없었다.\n결국 동일한 상황을 로컬에서 재현하려고 여러 번 테스트했지만, 재현되지 않아 원인 파악에 하루 이상이 소요되었다.",
			isConverted: true,
			createdDate: "2026-01-01T12:00:00Z",
		},
	];
	globalForMock.nextAnswerId = 3;
}

export const convertedAnswerIds = globalForMock.convertedAnswerIds;
export const insightPieces = globalForMock.insightPieces;
export const questions = globalForMock.questions;
export const answerCards = globalForMock.answerCards;

export function addInsightPieceFromAnswer(answerId: number) {
	const card = globalForMock.answerCards?.find((c) => c.answerId === answerId);
	if (!card) return;

	const id = globalForMock.nextPieceId ?? 125;
	globalForMock.nextPieceId = id + 1;
	globalForMock.insightPieces?.push({
		insightPieceId: id,
		content: card.answerContent,
		createdType: "ANSWER",
		createdDate: new Date().toISOString(),
	});
}

export function answerQuestion(questionId: number, content: string) {
	const question = globalForMock.questions?.find(
		(q) => q.questionId === questionId,
	);
	if (!question) return;

	question.status = "COMPLETED";

	const answerId = globalForMock.nextAnswerId ?? 3;
	globalForMock.nextAnswerId = answerId + 1;
	globalForMock.answerCards?.push({
		answerId,
		questionId,
		questionContent: question.content,
		answerContent: content,
		isConverted: false,
		createdDate: new Date().toISOString(),
	});
}
