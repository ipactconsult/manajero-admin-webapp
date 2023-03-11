import { Account } from "./account.model";
import {Journal} from "./journal.model";
import {FilesProof} from "./files-proof.model";

export class Journallines {
    id?: string;
    wording: string;
    debit: number;
    credit: number;
    balance?: number;
    account: Account;
    journal: Journal;
    filesProof: FilesProof;
    createdAt?: Date;
}
