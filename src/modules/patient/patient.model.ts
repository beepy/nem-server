import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IPatientDoc, IPatientModel } from './patient.interfaces';

const patientSchema = new mongoose.Schema<IPatientDoc, IPatientModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
patientSchema.plugin(toJSON);
patientSchema.plugin(paginate);

const Patient = mongoose.model<IPatientDoc, IPatientModel>('Patient', patientSchema);

export default Patient;
