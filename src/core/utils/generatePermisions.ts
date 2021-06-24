import { PermisionsI } from '../entity/permisions.entity';

export function generatePermisions(admin: boolean, email: string): PermisionsI {
  return {
    email,
    modifyMyUser: true,
    modifySchedulesTimes: admin,
    modifyProducts: admin,
    modifyUsers: admin,
    readMyUser: true,
    readProducts: true,
    readSchedulesTimes: true,
    readUsers: admin,
    writeProducts: admin,
    writeSchedulesTimes: admin,
    writeUsers: admin,
  };
}
