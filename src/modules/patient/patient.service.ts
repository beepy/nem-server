import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Patient from './patient.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { NewCreatedPatient, UpdatePatientBody, IPatientDoc } from './patient.interfaces';

/**
 * Create a patient
 * @param {NewCreatedPatient} patientBody
 * @returns {Promise<IPatientDoc>}
 */
export const createPatient = async (patientBody: NewCreatedPatient): Promise<IPatientDoc> => {
  return Patient.create(patientBody);
};

/**
 * Query for patients
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryPatients = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const patients = await Patient.paginate(filter, options);
  return patients;
};

/**
 * Get patient by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IPatientDoc | null>}
 */
export const getPatientById = async (id: mongoose.Types.ObjectId): Promise<IPatientDoc | null> => Patient.findById(id);

/**
 * Update patient by id
 * @param {mongoose.Types.ObjectId} patientId
 * @param {UpdatePatientBody} updateBody
 * @returns {Promise<IPatientDoc | null>}
 */
export const updatePatientById = async (
  patientId: mongoose.Types.ObjectId,
  updateBody: UpdatePatientBody
): Promise<IPatientDoc | null> => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  Object.assign(patient, updateBody);
  await patient.save();
  return patient;
};

/**
 * Delete patient by id
 * @param {mongoose.Types.ObjectId} patientId
 * @returns {Promise<IPatientDoc | null>}
 */
export const deletePatientById = async (patientId: mongoose.Types.ObjectId): Promise<IPatientDoc | null> => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  await patient.deleteOne();
  return patient;
};
