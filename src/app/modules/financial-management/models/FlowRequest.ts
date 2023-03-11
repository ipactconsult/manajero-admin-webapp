
export class FlowRequest {
    id: string;
    name: string;
    amount: number;
    description: string;
    types: string;
    date: Date;
    employee :string;
    caseVerification: Boolean = false;
    state: string= "pending";
    direction :string;
    
}