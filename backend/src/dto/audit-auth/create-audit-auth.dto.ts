export class CreateAuditAuthDto {
    tableName: string;
    action: string;
    success: boolean;
    recordId: number;
    userId: number;
}
