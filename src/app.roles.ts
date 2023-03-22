/* eslint-disable prettier/prettier */
import { RolesBuilder } from 'nest-access-control';

export enum AppRoles{
    AUTHOR = 'AUTHOR',
    ADMIN = 'ADMIN'
}

export enum AppResources{
    REQUEST = 'REQUEST',
    ORDER = 'ORDER',
    DEPARTMENT = 'DEPARTMENT',
    OPERATOR = 'OPERATOR',
    MACHINE = 'MACHINE',
    PROCESS = 'PROCESS',
    OPERATOR_DEPARTMENT = 'OPERATOR_DEPARTMENT',
    AUTH = 'AUTH',
    USER = 'USER'
}

export const roles: RolesBuilder = new RolesBuilder();

roles

    //Author
    .grant(AppRoles.AUTHOR)
    .readOwn([AppResources.REQUEST])
    .createOwn([AppResources.REQUEST])
    .updateOwn([AppResources.REQUEST])
    .deleteOwn([AppResources.REQUEST])
    .readOwn([AppResources.ORDER])
    .createOwn([AppResources.ORDER])
    .updateOwn([AppResources.ORDER])
    .deleteOwn([AppResources.ORDER])
    .readOwn([AppResources.DEPARTMENT])
    .createOwn([AppResources.DEPARTMENT])
    .updateOwn([AppResources.DEPARTMENT])
    .deleteOwn([AppResources.DEPARTMENT])
    .readOwn([AppResources.OPERATOR])
    .createOwn([AppResources.OPERATOR])
    .updateOwn([AppResources.OPERATOR])
    .deleteOwn([AppResources.OPERATOR])
    .readOwn([AppResources.MACHINE])
    .createOwn([AppResources.MACHINE])
    .updateOwn([AppResources.MACHINE])
    .deleteOwn([AppResources.MACHINE])
    .readOwn([AppResources.PROCESS])
    .createOwn([AppResources.PROCESS])
    .updateOwn([AppResources.PROCESS])
    .deleteOwn([AppResources.PROCESS])
    .readOwn([AppResources.OPERATOR_DEPARTMENT])
    .createOwn([AppResources.OPERATOR_DEPARTMENT])
    .updateOwn([AppResources.OPERATOR_DEPARTMENT])
    .deleteOwn([AppResources.OPERATOR_DEPARTMENT])
    .readOwn([AppResources.AUTH])
    .updateOwn([AppResources.AUTH])
    .deleteOwn([AppResources.AUTH])
    .readOwn([AppResources.USER])
    .createOwn([AppResources.USER])
    .updateOwn([AppResources.USER])
    .deleteOwn([AppResources.USER])

    //Admin
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.AUTHOR)
    .readAny([AppResources.REQUEST])
    .createAny([AppResources.REQUEST])
    .updateAny([AppResources.REQUEST])
    .deleteAny([AppResources.REQUEST])
    .readAny([AppResources.ORDER])
    .createAny([AppResources.ORDER])
    .updateAny([AppResources.ORDER])
    .deleteAny([AppResources.ORDER])
    .readAny([AppResources.DEPARTMENT])
    .createAny([AppResources.DEPARTMENT])
    .updateAny([AppResources.DEPARTMENT])
    .deleteAny([AppResources.DEPARTMENT])
    .readAny([AppResources.OPERATOR])
    .createAny([AppResources.OPERATOR])
    .updateAny([AppResources.OPERATOR])
    .deleteAny([AppResources.OPERATOR])
    .readAny([AppResources.MACHINE])
    .createAny([AppResources.MACHINE])
    .updateAny([AppResources.MACHINE])
    .deleteAny([AppResources.MACHINE])
    .readAny([AppResources.PROCESS])
    .createAny([AppResources.PROCESS])
    .updateAny([AppResources.PROCESS])
    .deleteAny([AppResources.PROCESS])
    .readAny([AppResources.OPERATOR_DEPARTMENT])
    .createAny([AppResources.OPERATOR_DEPARTMENT])
    .updateAny([AppResources.OPERATOR_DEPARTMENT])
    .deleteAny([AppResources.OPERATOR_DEPARTMENT])
    .readAny([AppResources.AUTH])
    .updateAny([AppResources.AUTH])
    .deleteAny([AppResources.AUTH])
    .readAny([AppResources.USER])
    .createAny([AppResources.USER])
    .updateAny([AppResources.USER])
    .deleteAny([AppResources.USER])



    


    