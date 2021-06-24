export interface PermisionsI {
  readonly email: string;
  readonly modifyUsers: boolean;
  readonly modifyMyUser: boolean;
  readonly modifyProducts: boolean;
  readonly modifySchedulesTimes: boolean;
  readonly readProducts: boolean;
  readonly readSchedulesTimes: boolean;
  readonly readMyUser: boolean;
  readonly readUsers: boolean;
  readonly writeProducts: boolean;
  readonly writeSchedulesTimes: boolean;
  readonly writeUsers: boolean;
}
