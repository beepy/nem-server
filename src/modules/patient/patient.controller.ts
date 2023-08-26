import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as patientService from './patient.service';

export const createPatient = catchAsync(async (req: Request, res: Response) => {
  const patient = await patientService.createPatient(req.body);
  res.status(httpStatus.CREATED).send(patient);
});

export const getPatients = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await patientService.queryPatients(filter, options);
  res.send(result);
});

export const getPatient = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['patientId'] === 'string') {
    const patient = await patientService.getPatientById(new mongoose.Types.ObjectId(req.params['patientId']));
    if (!patient) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
    }
    res.send(patient);
  }
});

export const updatePatient = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['patientId'] === 'string') {
    const patient = await patientService.updatePatientById(new mongoose.Types.ObjectId(req.params['patientId']), req.body);
    res.send(patient);
  }
});

export const deletePatient = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['patientId'] === 'string') {
    await patientService.deletePatientById(new mongoose.Types.ObjectId(req.params['patientId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
