import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IPatient {
  name: string;
}

export interface IPatientDoc extends IPatient, Document {
}

export interface IPatientModel extends Model<IPatientDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewCreatedPatient = IPatient;

export type UpdatePatientBody = Partial<IPatient>;

