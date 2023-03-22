/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { AppRoles } from 'src/app.roles';

export const HasRoles = (...roles: AppRoles[]) => SetMetadata('roles', roles);